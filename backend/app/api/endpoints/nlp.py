from fastapi import APIRouter, File, UploadFile
import os
from expose_text import BinaryWrapper
import pii_identifier

router = APIRouter()


@router.post("/find-piis/")
async def find_piis(file: UploadFile = File(...)):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()
    wrapper = BinaryWrapper(content, extension)

    recognizers = pii_identifier.core.all_recognizers[0:3]
    tokenization, piis = pii_identifier.find_piis(
        wrapper.text, recognizers=recognizers, aggregation_strategy="merge", as_tokens=True
    )
    tokens_and_whitespace_lists = list(zip(*tokenization))
    return {"piis": piis, "tokens": tokens_and_whitespace_lists[0], "whitespace": tokens_and_whitespace_lists[1]}


@router.get("/tags/")
async def tags():
    return ["PER", "ORG", "LOC", "MISC", "STATE"]  # TODO compute from loaded recognizers
