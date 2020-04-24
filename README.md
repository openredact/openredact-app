# OpenRedact

Semi-automatical data anonymization for German documents

---

<!---[!Tests](https://github.com/openredact/openredact-app/workflows/Tests/badge.svg?branch=master)-->
[![MIT license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg?style=flat-square)](https://github.com/ambv/black)

## Description

...

_**:warning: Disclaimer :warning::**_ This is a prototype. Do not use in production.

## Backend Requirements


## Frontend Requirements

* Node.js (with `npm`).


## Usage


## Development

To setup development follow the instructions in [backend](backend/README.md) and [frontend](frontend/README.md).


### Install the pre-commit hooks

```
pre-commit install
git config --bool flake8.strict true  # Makes the commit fail if flake8 reports an error
```

To run the hooks:
```
pre-commit run --all-files
```


