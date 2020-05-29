from typing import List
from pydantic import BaseModel, Field
from pydantic.dataclasses import dataclass


class Annotation(BaseModel):
    start: int
    end: int
    tag: str


class Data(BaseModel):
    computed_annotations: List[Annotation] = Field(..., alias="computedAnnotations")
    gold_annotations: List[Annotation] = Field(..., alias="goldAnnotations")


class Scores(BaseModel):
    f1: float
    f2: float
    precision: float
    recall: float
    true_positives: float  # = Field(..., alias='truePositives')
    false_positives: float  # = Field(..., alias='falsePositives')
    false_negatives: float  # = Field(..., alias='falseNegatives')


class EvaluationResponse(BaseModel):
    total: Scores
    PER: Scores = None
    LOC: Scores = None
    ORG: Scores = None
    MISC: Scores = None
    STATE: Scores = None
    # TODO continue list


class ORMConfig:
    orm_mode = True


@dataclass(config=ORMConfig)  # Pii is a dataclass (not a dict)
class Pii(BaseModel):
    start_char: int
    end_char: int
    tag: str
    text: str
    score: float
    model: str
    start_tok: int
    end_tok: int


class Token(BaseModel):
    text: str
    has_ws: bool
    start_char: int
    end_char: int


class FindPiisResponse(BaseModel):
    piis: List[Pii]
    tokens: List[Token]
