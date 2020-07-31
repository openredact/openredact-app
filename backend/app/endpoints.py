from dataclasses import asdict
from typing import List
import base64
from pathlib import Path

from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from starlette.responses import StreamingResponse, JSONResponse
import io
import json
import os
from expose_text import BinaryWrapper, UnsupportedFormat
import nerwhal
from anonymizer import AnonymizerConfig, Anonymizer, Pii

from app.schemas import (
    Annotation,
    AnnotationsForEvaluation,
    EvaluationResponse,
    FindPiisResponse,
    ErrorMessage,
    AnonymizedPiisResponse,
    AnonymizedPii,
)

router = APIRouter()

recognizer_name_to_path_lookup = {Path(path).stem: path for path in nerwhal.list_integrated_recognizers()}


@router.post(
    "/anonymize",
    summary="Anonymize PIIs",
    description="Anonymize the given PIIs by replacing their text content according to the provided config.",
    response_model=AnonymizedPiisResponse,
    responses={400: {"model": ErrorMessage}},
)
async def anonymize(piis: List[Pii], config: AnonymizerConfig):
    anonymizer = Anonymizer(config)
    anonymized_piis = [AnonymizedPii(text=pii.text, id=pii.id) for pii in anonymizer.anonymize(piis) if pii.modified]

    if len(anonymized_piis) != len(piis):
        # one or more piis were not flagged as `modified`
        raise HTTPException(status_code=400, detail="Invalid Config")

    return AnonymizedPiisResponse(anonymized_piis=anonymized_piis)


@router.post(
    "/anonymize-file",
    summary="Anonymize file",
    description="Anonymize the given file by replacing the text passages specified in anonymizations. The character indices "
    "in anonymizations refer to the file's plain text representation.",
    responses={200: {"content": {"application/octet-stream": {}}}, 400: {"model": ErrorMessage}},
)
async def anonymize_file(
    file: UploadFile = File(...),
    anonymizations: str = Form(
        ...,
        description="A json array of objects with fields startChar, endChar and text. E.g. "
        '[{"startChar":0,"endChar":10,"text":"XXX"}].',
    ),
    return_base64: bool = False,
):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()

    try:
        wrapper = BinaryWrapper(content, extension)
    except UnsupportedFormat:
        raise HTTPException(status_code=400, detail="Unsupported File Format")

    for alteration in json.loads(anonymizations):
        wrapper.add_alter(alteration["startChar"], alteration["endChar"], alteration["text"])
    wrapper.apply_alters()

    if return_base64:
        # Send anonymized file as base64 encoding
        base64_bytes = base64.b64encode(wrapper.bytes)

        return JSONResponse({"base64": base64_bytes.decode()})

    else:
        # Regular download
        return StreamingResponse(
            io.BytesIO(wrapper.bytes),
            media_type="application/octet-stream",
            headers={"Content-Disposition": f"attachment;{file.filename}"},
        )


@router.post(
    "/find-piis",
    summary="Find PIIs",
    description="Find personally identifiable information in the given file. The character and token indices refer to the "
    "file's plain text representation.",
    response_model=FindPiisResponse,
    responses={400: {"model": ErrorMessage}},
)
async def find_piis(recognizers: str = Form(...), file: UploadFile = File(...)):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()

    try:
        wrapper = BinaryWrapper(content, extension)
    except UnsupportedFormat:
        raise HTTPException(status_code=400, detail="Unsupported File Format")
    except Exception:
        raise HTTPException(status_code=400, detail="File Handling Error")

    recognizers = json.loads(recognizers)
    use_statistical_ner = False
    if "statistical_recognizer" in recognizers:
        use_statistical_ner = True
        recognizers.remove("statistical_recognizer")
    recognizer_paths = [recognizer_name_to_path_lookup[name] for name in recognizers]

    nerwhal_config = nerwhal.Config(language="de", recognizer_paths=recognizer_paths, use_statistical_ner=use_statistical_ner)
    res = nerwhal.recognize(wrapper.text, config=nerwhal_config, combination_strategy="smart-fusion")

    return FindPiisResponse(
        piis=[asdict(pii) for pii in res["ents"]],
        tokens=[asdict(token) for token in res["tokens"]],
        format=str(wrapper.file.__class__.__name__).lower().replace("format", ""),
    )


@router.post(
    "/score",
    summary="Compute scores",
    description="Compute common scoring metrics for the provided annotations data.",
    response_model=EvaluationResponse,
)
async def score(data: AnnotationsForEvaluation):
    def _create_entity(annot: Annotation):
        # annotation start and end are token based indices; in the context of scoring the actual value is not
        # important though, so we can pretend they are character based
        return nerwhal.NamedEntity(start_char=annot.start, end_char=annot.end, tag=annot.tag)

    gold = [_create_entity(annot) for annot in data.gold_annotations]
    piis = [_create_entity(annot) for annot in data.computed_annotations]
    return nerwhal.evaluate(piis, gold)


@router.get(
    "/tags",
    summary="PII Tags",
    description="Fetch the types of personally identifiable information that the backend is looking for. The result is a "
    "string of tags, e.g. PER or LOC.",
    response_model=List[str],
)
async def tags():
    return sorted(["PER", "LOC", "ORG", "MISC", "MONEY", "EMAIL", "PHONE", "CARDINAL", "COUNTRY", "DATE"])


@router.get(
    "/recognizers",
    summary="PII Recognizers",
    description="Fetch the list of recognizers that are supported by the backend.",
    response_model=List[str],
)
async def supported_recognizers():
    return list(recognizer_name_to_path_lookup.keys()) + ["statistical_recognizer"]
