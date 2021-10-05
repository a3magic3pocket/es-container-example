FROM golang:1.16

WORKDIR /root/api

COPY . /root/api

RUN cp /etc/apt/sources.list sources.list_backup
RUN sed -i -e 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
RUN sed -i -e 's/security.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

#  https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
# How to set filebeat; https://logit.io/sources/configure/filebeat
RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN apt-get install apt-transport-https -y
RUN echo "deb https://artifacts.elastic.co/packages/oss-7.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-7.x.list
RUN apt-get update && apt-get install filebeat -y
COPY ./filebeat.yml /etc/filebeat/filebeat.yml
RUN update-rc.d filebeat defaults 90 10

ENTRYPOINT bash api_script.sh
