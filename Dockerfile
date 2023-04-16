FROM ubuntu:16.04
RUN apt-get update -qy
RUN apt-get upgrade -qy
RUN apt-get install software-properties-common netcat -qy
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install python3 python3-pip -qy
WORKDIR /usr/app
COPY ./src .
COPY ./requirements.txt .
RUN pip3 install -r requirements.txt
COPY ./django_entrypoint.sh .
ENTRYPOINT [ "/usr/app/django_entrypoint.sh" ]