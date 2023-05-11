FROM python:3.10-slim

WORKDIR /app

RUN pip install --upgrade pip

COPY ./requirements.txt /app

RUN pip install -r requirements.txt

COPY ./start.django.sh /start-django.sh
RUN chmod +x /start-django.sh

ADD . /app