# OpenRedact

Semi-automatical data anonymization for German documents

---

<!---[!Tests](https://github.com/openredact/openredact-app/workflows/Tests/badge.svg?branch=master)-->

[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg?style=flat-square)](https://github.com/ambv/black)
[![Code style: prettier]](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Description

...

_**:warning: Disclaimer :warning::**_ This is a prototype. Do not use in production.

## Backend Requirements

- Python 3.7+

## Frontend Requirements

- Node.js 12+ (with `npm`).

## Usage

## Development

For development follow these instructions and then the instructions in the development documentation in the respective
module [backend](backend/README.md) or [frontend](frontend/README.md).

After backend (and frontend) are set up make sure to install the pre-commit hooks as explained below.

### Install the pre-commit hooks

`pre-commit` is a Python tool to manage our pre-commit hooks. It is installed with the Python dev dependencies.

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
# Set your SSH keys
export SSH_PRV_KEY="$(cat ~/.ssh/id_rsa)"
export SSH_PUB_KEY="$(cat ~/.ssh/id_rsa.pub)"

docker-compose up --build

# Dev
docker-compose up -f docker-compose.dev.yml
```

The option `--build` rebuilds containers on change.

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
