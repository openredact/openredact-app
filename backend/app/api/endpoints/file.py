from fastapi import APIRouter, File, UploadFile, Form
from starlette.responses import StreamingResponse
import os
import io
import json
from expose_text import BinaryWrapper

router = APIRouter()


@router.post("/anonymize/")
async def extract_text(file: UploadFile = File(...), anonymizations: str = Form(...)):
    _, extension = os.path.splitext(file.filename)
    content = await file.read()
    await file.close()

    wrapper = BinaryWrapper(content, extension)
    for alteration in json.loads(anonymizations):
        wrapper.add_alter(alteration["startChar"], alteration["endChar"], alteration["text"])
    wrapper.apply_alters()

    return StreamingResponse(io.BytesIO(wrapper.bytes))
