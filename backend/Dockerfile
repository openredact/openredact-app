FROM python:3.7

# Install PDF depdencies (expose-text)
RUN apt-get update
RUN apt-get install -y poppler-utils
RUN wget --quiet https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
    tar vxf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
    cp wkhtmltox/bin/wk* /usr/local/bin/ && \
    rm -rf wkhtmltox

# Install packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY ./app /app/

CMD ["gunicorn", "-b", "0.0.0.0:8000", "-t", "600", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "app.main:app"]

EXPOSE 8000
