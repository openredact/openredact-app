from typing import List
from pydantic import BaseModel


class Annotation(BaseModel):
    start: int
    end: int
    tag: str


class Data(BaseModel):
    computedAnnotations: List[Annotation]
    goldAnnotations: List[Annotation]
