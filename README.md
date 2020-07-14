# OpenRedact

_**:warning: Disclaimer :warning::**_ This is a prototype. Do not use for anything critical.

_**:warning: Note :warning::**_ This tool focuses on the text content. Metadata will not be anonymized.

Semi-automatic data anonymization for German documents

---

<!---[!Tests](https://github.com/openredact/openredact-app/workflows/Tests/badge.svg?branch=master)-->

[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Code style: Black](https://img.shields.io/badge/code%20style-black-000000.svg?style=flat-square)](https://github.com/ambv/black)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Frontend Tests](https://github.com/openredact/openredact-app/workflows/Frontend%20Tests/badge.svg?branch=master)
![Backend Tests](https://github.com/openredact/openredact-app/workflows/Backend%20Tests/badge.svg?branch=master)
![Black & Flake8](https://github.com/openredact/openredact-app/workflows/Black%20&%20Flake8/badge.svg?branch=master)

## Description

This repository contains all materials (frontend and backend) to run the Open Redact app.

## Backend Requirements

- Python 3.7+

## Frontend Requirements

- Node.js 12+ (with `npm`).

## Usage

You can use the CLI script `backend/cli/redact.py` to anonymize an entire directory of documents in an unsupervised manor.

```shell script
./redact.py --input_dir "path/to/documents/" --output_dir "out/directory/"
```

Please have a look in `./redact.py --help` for usage instructions and important notes.

## Development

For development follow these instructions and then the instructions in the development documentation in the respective
module [backend](backend/README.md) or [frontend](frontend/README.md).

After backend (and frontend) are set up make sure to install the pre-commit hooks as explained below.

### Install the pre-commit hooks

`pre-commit` is a Python tool to manage git pre-commit hooks. It is installed with the Python dev dependencies.
Run the following code to install pre-commit hooks for formatting and linting Python and JavaScript code
(black, flake8, prettier and eslint). The tests being slower than formatters and linters are run by CI, so don't
forget to run them manually before committing.

```
pre-commit install
git config --bool flake8.strict true  # Makes the commit fail if flake8 reports an error
```

To run the hooks:

```
pre-commit run --all-files
```

## Deployment

**Note:** Docker is currently not working because our own dependencies will not be installed yet by the backend image.

### Run the full stack using Docker-Compose

You can simply make the backend available at port 8000 and the frontend at port 80 by running:

```
docker-compose up
```

Add the option `--build` to incorporate changes by rebuilding containers.

To use our docker setup for development run:

```
docker-compose up -f docker-compose.dev.yml
```

### Run the frontend using Docker

```
cd frontend
docker build -t openredact-frontend .
docker run -p 80:80 openredact-frontend

# Dev build
docker build -t openredact-frontend-dev -f Dockerfile.dev .
```

This will build the frontend inside a node Docker container and deploy the result in an nginx container.
For more details about this procedure see [React in Docker with Nginx, built with multi-stage Docker builds
, including testing](https://medium.com/@tiangolo/react-in-docker-with-nginx-built-with-multi-stage-docker-builds-including-testing-8cc49d6ec305).

### Run the backend using Docker

To build the backend Docker image, you need to add SSH keys for installing dependencies from private GitHub repos.

```
cd backend
docker build -t openredact-backend \
    --build-arg ssh_prv_key="$(cat ~/.ssh/id_rsa)" \
    --build-arg ssh_pub_key="$(cat ~/.ssh/id_rsa.pub)" .
docker run -p 8000:8000 openredact-backend
```

## API Documentation

Documentation of the API is available at the endpoints `/docs` ([Swagger UI](https://swagger.io/tools/swagger-ui/))
and `/redocs` ([ReDoc](https://redocly.github.io/redoc/)), e.g. http://127.0.0.1:8000/redoc.

The OpenAPI specification can be found here: http://127.0.0.1:8000/openapi.json

## License

[MIT License](https://github.com/openredact/openredact-app/blob/master/LICENSE)
