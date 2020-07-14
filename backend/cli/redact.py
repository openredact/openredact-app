#!python
import os
import json
from pathlib import Path

import click
import pii_identifier
from anonymizer import Anonymizer, AnonymizerConfig, Pii
from click import UsageError, progressbar
from expose_text import FileWrapper, UnsupportedFormat

from pii_identifier.recognizers import __all__ as all_recognizers

all_recognizers_arg = ",".join(all_recognizers)


@click.command()
@click.option("--input_dir", type=Path, help="Path to the directory that contains the files to redact.")
@click.option("--output_dir", type=Path, help="Path to the directory that the redacted files will be stored in.")
@click.option("--config_dir", type=Path, default="config.json", help="Path to the anonymizer config.")
@click.option("--recognizers", type=str, default=all_recognizers_arg, help="Comma separated list of recognizers to use.")
def redact(input_dir, output_dir, config_dir, recognizers):
    """Redact the documents in a directory.

    This script tries to redact all documents in the given directory and its subdirectories.

    Note: The redaction is done in an unsupervised manor. You have to ensure, that the chosen recognizers and
    configuration provide results of a sufficient quality on the given data. Do not use for anything critical."""

    if input_dir is None or output_dir is None:
        raise UsageError("Please provide an input_dir and output_dir.")

    input_dir = Path(input_dir)
    output_dir = Path(output_dir)
    config_dir = Path(config_dir)
    recognizers = recognizers.split(",")

    with open(config_dir, "r") as f:
        config = AnonymizerConfig(**json.load(f))
        anonymizer = Anonymizer(config)

    click.echo(f'Start redacting files in "{input_dir}" ...')

    items_to_redact = []
    for root, dirs, files in os.walk(input_dir):
        for file in files:
            items_to_redact += [(root, file)]

    with progressbar(items_to_redact) as items:
        for root, file in items:
            relative_path = Path(os.path.relpath(root, start=input_dir)) / Path(file)
            in_path = input_dir / relative_path

            try:
                wrapper = FileWrapper(in_path)
            except UnsupportedFormat:
                click.echo(f"Warning: Unsupported format for file {relative_path}! This file was skipped!")
                continue
            except Exception:
                click.echo(f"Error while processing file {relative_path}! This file was skipped!", err=True)
                continue

            result = pii_identifier.find_piis(wrapper.text, recognizers=recognizers, aggregation_strategy="merge")
            id_to_piis = {str(idx): pii for idx, pii in enumerate(result["piis"])}
            piis_for_anonymizer = [Pii(tag=pii.tag, text=pii.text, id=idx) for idx, pii in id_to_piis.items()]

            anonymized_piis = [
                anonymized_pii for anonymized_pii in anonymizer.anonymize(piis_for_anonymizer) if anonymized_pii.modified
            ]

            for anonymized_pii in anonymized_piis:
                unanonymized_pii = id_to_piis[anonymized_pii.id]
                wrapper.add_alter(unanonymized_pii.start_char, unanonymized_pii.end_char, anonymized_pii.text)
            wrapper.apply_alters()

            out_path = output_dir / relative_path
            out_path.parent.mkdir(parents=True, exist_ok=True)
            wrapper.save(out_path)

    click.echo(f'The redacted files have been written to "{output_dir}".')


if __name__ == "__main__":
    redact()
