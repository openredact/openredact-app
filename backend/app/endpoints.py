from typing import List

from fastapi import APIRouter, File, UploadFile, Form
from starlette.responses import StreamingResponse
import io
import json
import os
from expose_text import BinaryWrapper
import pii_identifier

from app.schemas import Annotation, AnnotationsForEvaluation, EvaluationResponse, FindPiisResponse

router = APIRouter()


class AnonimizationResponse(StreamingResponse):
    # workaround to show media type in docs
    media_type = "application/octet-stream"


@router.post(
    "/anonymize",
    summary="Anonymize file",
    description="Anonymize the given file by replacing the text passages specified in anonymizations. The character indices "
    "in anonymizations refer to the file's plain text representation.",
    response_class=AnonimizationResponse,
)
async def anonymize(
    file: UploadFile = File(...),
    anonymizations: str = Form(
        ...,
        description="A json array of objects with fields startChar, endChar and text. E.g. "
        '[{"startChar":0,"endChar":10,"text":"XXX"}].',
    ),
):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()

    wrapper = BinaryWrapper(content, extension)
    for alteration in json.loads(anonymizations):
        wrapper.add_alter(alteration["startChar"], alteration["endChar"], alteration["text"])
    wrapper.apply_alters()

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
)
async def find_piis(file: UploadFile = File(...)):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()
    wrapper = BinaryWrapper(content, extension)

    recognizers = pii_identifier.core.all_recognizers[0:3]
    res = pii_identifier.find_piis(wrapper.text, recognizers=recognizers, aggregation_strategy="merge")
    return {"piis": res["piis"], "tokens": res["tokens"]}


def _create_pii(annot: Annotation):
    """Only to be used for scoring."""
    # annotation start and end are token based indices; in the context of scoring the actual value is not
    # important though, so we can pretend they are character based
    return pii_identifier.Pii(start_char=annot.start, end_char=annot.end, tag=annot.tag)


@router.post(
    "/score",
    summary="Compute scores",
    description="Compute common scoring metrics for the provided annotations data.",
    response_model=EvaluationResponse,
)
async def score(data: AnnotationsForEvaluation):
    gold = [_create_pii(annot) for annot in data.gold_annotations]
    piis = [_create_pii(annot) for annot in data.computed_annotations]
    return pii_identifier.evaluate(piis, gold)


@router.get(
    "/tags",
    summary="PII Tags",
    description="Fetch the types of personally identifiable information that the backend is looking for. The result is a "
    "string of tags, e.g. PER or LOC.",
    response_model=List[str],
)
async def tags():
    return [
        "PER",
        "ORG",
        "LOC",
        "MISC",
        "STATE",
    ]  # TODO compute from loaded recognizers