from typing import List

from fastapi import APIRouter, File, UploadFile, Form
from starlette.responses import StreamingResponse
import io
import json
import os
from expose_text import BinaryWrapper
import pii_identifier
from pydantic import BaseModel

router = APIRouter()


@router.post("/anonymize")
async def extract_text(file: UploadFile = File(...), anonymizations: str = Form(...)):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()

    wrapper = BinaryWrapper(content, extension)
    for alteration in json.loads(anonymizations):
        wrapper.add_alter(alteration["startChar"], alteration["endChar"], alteration["text"])
    wrapper.apply_alters()

    return StreamingResponse(io.BytesIO(wrapper.bytes))


@router.post("/find-piis")
async def find_piis(file: UploadFile = File(...)):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()
    wrapper = BinaryWrapper(content, extension)

    recognizers = pii_identifier.core.all_recognizers[0:3]
    res = pii_identifier.find_piis(wrapper.text, recognizers=recognizers, aggregation_strategy="merge")
    return {"piis": res["piis"], "tokens": res["tokens"]}


class Annotation(BaseModel):
    start: int
    end: int
    tag: str


class Data(BaseModel):
    computedAnnotations: List[Annotation]
    goldAnnotations: List[Annotation]


def _create_pii(annot: Annotation):
    """Only to be used for scoring."""
    # annotation start and end are token based indices; in the context of scoring the actual value is not
    # important though, so we can pretend they are character based
    return pii_identifier.Pii(start_char=annot.start, end_char=annot.end, tag=annot.tag)


@router.post("/score")
async def score(data: Data):
    gold = [_create_pii(annot) for annot in data.goldAnnotations]
    piis = [_create_pii(annot) for annot in data.computedAnnotations]
    return pii_identifier.evaluate(piis, gold)


@router.get("/tags")
async def tags():
    return ["PER", "ORG", "LOC", "MISC", "STATE"]  # TODO compute from loaded recognizers
