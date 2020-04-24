## Development

### Install dev requirements

```
pip install -r requirements-dev.txt
```

### Running the server

```
cd backend/app
uvicorn main:app --reload
```

### Testing

The tests can be executed with:
```
pytest --cov-report term --cov=app
```
