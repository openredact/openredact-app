from typing import List, Dict
from pydantic import BaseModel


def to_camel_case(snake_case):
    pascal_case = snake_case.title().replace("_", "")
    return pascal_case[0].lower() + pascal_case[1:]


class CamelBaseModel(BaseModel):
    # This base model automatically defines a camelCase public representation that is used by API clients.
    # Note: docstrings are automatically used as description for JSON schemas (and they are inherited)

    class Config:
        alias_generator = to_camel_case
        allow_population_by_field_name = True


class Annotation(CamelBaseModel):
    start: int
    end: int
    tag: str


class AnnotationsForEvaluation(CamelBaseModel):
    computed_annotations: List[Annotation]
    gold_annotations: List[Annotation]


class Scores(CamelBaseModel):
    f1: float
    f2: float
    precision: float
    recall: float
    true_positives: float
    false_positives: float
    false_negatives: float


class EvaluationResponse(CamelBaseModel):
    total: Scores
    tags: Dict[str, Scores]


class Pii(CamelBaseModel):
    start_char: int
    end_char: int
    tag: str
    text: str
    score: float
    model: str
    start_tok: int
    end_tok: int


class Token(CamelBaseModel):
    text: str
    has_ws: bool
    start_char: int
    end_char: int


class FindPiisResponse(CamelBaseModel):
    piis: List[Pii]
    tokens: List[Token]


class AnonymizedPii(CamelBaseModel):
    text: str
    id: str


class AnonymizedPiisResponse(CamelBaseModel):
    anonymized_piis: List[AnonymizedPii]


class ErrorMessage(BaseModel):
    detail: str
