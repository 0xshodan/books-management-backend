FROM ubuntu:16.04
RUN apt-get update -qy
RUN apt-get upgrade -qy
RUN apt-get install software-properties-common -qy
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install python3 -qy
RUN apt-get install python3-pip -qy
COPY . /app
WORKDIR /app/src
RUN pip3 install -r ../requirements.txt
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
EXPOSE 80/tcp
CMD [ "python3", "manage.py", "runserver", "0.0.0.0:80"]