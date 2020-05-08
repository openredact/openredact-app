from fastapi import APIRouter, File, UploadFile
import os
import expose_text
import pii_identifier

router = APIRouter()


@router.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    filename = file.filename
    _, extension = os.path.splitext(filename)
    content = await file.read()
    await file.close()
    fw = expose_text.FileWrapper("", raw=content, extension=extension)
    return {"text": fw.text}


@router.post("/find-piis/")
async def find_piis(file: UploadFile = File(...)):
    filename = file.filename
    _, extension = os.path.splitext(filename)
    content = await file.read()
    await file.close()
    fw = expose_text.FileWrapper("", raw=content, extension=extension)

    recognizers = pii_identifier.core.all_recognizers[0:3]
    tokenization, piis = pii_identifier.find_piis(
        fw.text, recognizers=recognizers, aggregation_strategy="merge", as_tokens=True
    )
    tokens_and_whitespace_lists = list(zip(*tokenization))
    return {"piis": piis, "tokens": tokens_and_whitespace_lists[0], "whitespace": tokens_and_whitespace_lists[1]}


@router.get("/tags/")
async def tags():
    return ["PER", "ORG", "LOC", "MISC", "STATE"]  # TODO compute from loaded recognizers
