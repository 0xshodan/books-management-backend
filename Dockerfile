FROM ubuntu:16.04
RUN apt-get update -qy
RUN apt-get upgrade -qy
RUN apt-get install software-properties-common netcat -qy
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt-get install python3 python3-pip -qy
WORKDIR /usr/app
COPY . .
RUN pip3 install -r requirements.txt
EXPOSE 80/tcp
ENTRYPOINT [ "/usr/app/apply_migrations.sh" ]