from fastapi import APIRouter, File, UploadFile
import os
import expose_text

router = APIRouter()


@router.post("/extract-text/")
async def extract_text(file: UploadFile = File(...)):
    filename = file.filename
    _, extension = os.path.splitext(filename)
    content = await file.read()
    await file.close()
    fw = expose_text.FileWrapper("", raw=content, extension=extension)
    return {"text": fw.text}


@router.get("/tags/")
async def tags():
    return ["PER", "ORG", "LOC", "MISC"]  # TODO compute from loaded recognizers
