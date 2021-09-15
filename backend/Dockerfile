# pull the official base image
FROM python:3

# set work directory
RUN mkdir /backend 
WORKDIR /backend

# install dependencies
RUN pip install --upgrade pip 
COPY ./requirements.txt /backend
RUN pip install -r requirements.txt

RUN apt-get update && apt-get install -y cron

# copy project
COPY . /backend
COPY ./backend/.env /backend/backend

RUN python manage.py crontab add

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
