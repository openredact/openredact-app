# OpenRedact Backend

## Development

Before you begin, make sure you are in the backend directory.

### Install dev requirements

```
pip install -r requirements-dev.txt
```

### PyCharm Setup

To have imports resolve correctly mark the backend folder as a Sources Root.

### Running the server

```
uvicorn app.main:app --reload
```

### Testing

The tests can be executed with

```
pytest --cov-report term --cov=app
```

or by simply running `pytest`.
