FROM python:3.7

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY ./app /app/

WORKDIR /app
CMD ["gunicorn", "-b", "0.0.0.0:8000", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "main:app"]

EXPOSE 8000
