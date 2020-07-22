# OpenRedact Backend

## Usage

Before you begin, make sure you are in the backend directory.

### Install the backend dependencies

Install the dependencies for production using:

```
pip install -r requirements.txt
```

### Running the server

```
uvicorn app.main:app --reload
```

## Development

### Install dev requirements

```
pip install -r requirements-dev.txt
```

To install our own dependencies in editable more (aka setuptools develop mode) use the `-e` flag.
This adopts any changes in the local checked out projects immediately.

```
pip install -e path/to/nerwhal
pip install -e path/to/expose-text
pip install -e path/to/anonymizer
```

### PyCharm Setup

To have imports resolve correctly mark the backend folder as a Sources Root.

### Testing

The tests can be executed with

```
pytest --cov-report term --cov=app
```

or by simply running `pytest`.
