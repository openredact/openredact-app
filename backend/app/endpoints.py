from typing import List

from fastapi import APIRouter, File, UploadFile, Form
from starlette.responses import StreamingResponse
import io
import json
import os
from expose_text import BinaryWrapper
import pii_identifier

from app.schemas import Annotation, Data, EvaluationResponse, FindPiisResponse

router = APIRouter()


class AnonimizationResponse(StreamingResponse):
    # workaround to show media type in docs
    media_type = "application/octet-stream"


@router.post(
    "/anonymize", summary="short", description="long desc", response_class=AnonimizationResponse,
)  # TODO document
# endpoints
async def anonymize(
    file: UploadFile = File(...),
    anonymizations: str = Form(..., description="A json array of objects with " "fields startChar, endChar and text",),
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


@router.post("/find-piis", response_model=FindPiisResponse)
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


@router.post("/score", response_model=EvaluationResponse)
async def score(data: Data):
    gold = [_create_pii(annot) for annot in data.gold_annotations]
    piis = [_create_pii(annot) for annot in data.computed_annotations]
    return pii_identifier.evaluate(piis, gold)


@router.get("/tags", response_model=List[str])
async def tags():
    return [
        "PER",
        "ORG",
        "LOC",
        "MISC",
        "STATE",
    ]  # TODO compute from loaded recognizers
