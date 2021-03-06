import filecmp

from click.testing import CliRunner

from cli.redact import redact


def test_redact_cli(tmp_path):
    runner = CliRunner()
    result = runner.invoke(
        redact,
        [
            "--input_dir",
            "tests/data/cli/input",
            "--output_dir",
            tmp_path,
            "--anonymizer_config",
            "tests/data/cli/anonymizer_config.json",
            "--recognizer_config",
            "tests/data/cli/recognizer_config.json",
        ],
    )
    assert result.exit_code == 0
    assert filecmp.cmp("tests/data/cli/expected/test.html", tmp_path / "test.html", shallow=False)
    assert filecmp.cmp("tests/data/cli/expected/nested/test.txt", tmp_path / "nested/test.txt", shallow=False)
