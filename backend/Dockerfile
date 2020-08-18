FROM python:3.7

WORKDIR /app

# Install PDF depdencies (expose-text)
RUN apt-get update
RUN apt-get install -y cmake autoconf

# wkhtmltopdf
RUN wget --quiet https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.3/wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
    tar vxf wkhtmltox-0.12.3_linux-generic-amd64.tar.xz && \
    cp wkhtmltox/bin/wk* /usr/local/bin/ && \
    rm -rf wkhtmltox

# Uninstall old version (latest version is not available over apt)
RUN apt-get purge -y poppler-utils

# Install new poppler-utils manually
RUN wget poppler.freedesktop.org/poppler-0.90.1.tar.xz
RUN tar -xvf poppler-0.90.1.tar.xz
RUN cd poppler-0.90.1 && mkdir build && cd build && cmake .. && make install && ldconfig
RUN ln -s /usr/local/bin/pdftohtml /usr/bin/pdftohtml
RUN pdftohtml -v

# Disable pip cache
ENV PIP_DISABLE_PIP_VERSION_CHECK=1
ENV PIP_NO_CACHE_DIR=1

# Dev dependencies (for testing)
COPY requirements-dev.txt .
RUN pip install --no-cache-dir -r requirements-dev.txt

# Install packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install optional packages
RUN pip install chardet

# Environment
ENV STANZA_TEST_HOME=/app/stanza_test

# Models
RUN python -m spacy download de
RUN python -c "import stanza; stanza.download('de')"

COPY ./ /app/

RUN pip install gunicorn


CMD ["gunicorn", "-b", "0.0.0.0:8000", "-t", "600", "-w", "2", "-k", "uvicorn.workers.UvicornWorker", "app.main:app"]

EXPOSE 8000
