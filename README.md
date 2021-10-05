## Create docker private network
- ```bash
    $ docker network create es-net
  ```

## Run Elasticsearch
- ```bash
    $ docker run --name es-c-es --network es-net --rm -p 9200:9200 -p 9300:9300 -e "action.auto_create_index:true" -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.15.0
  ```

## Run Logstash
- ```bash
    $ cd es-container-example
    # Windows
    $ docker run --name es-c-logstash --rm --network es-net -e ES_IP=es-c-es -v %cd%/config/logstash/:/usr/share/logstash/pipeline/ docker.elastic.co/logstash/logstash:7.15.0
    # Linux or OS X
    $ docker run --name es-c-logstash --rm --network es-net -e ES_IP=es-c-es -v ./config/logstash/:/usr/share/logstash/pipeline/ docker.elastic.co/logstash/logstash:7.15.0
  ```

## Create front server
- Build front
  - ```bash
      $ cd es-container-example/front
      $ docker build -t es-c-front .
    ```
- Run front
  - ```bash
      $ docker run --name es-c-front --network es-net -e LOGSTASH_IP=es-c-logstash -p 8000:80 -it -d es-c-front
    ```
- Check front is running
  - ```bash
      $ docker exec -it es-c-front
      $ tail -f /etc/filebeat/filebeat.log
    ```

## Create api server
- Build api
  - ```bash
      $ cd es-container-example/api
      $ docker build -t es-c-api .
    ```
- Run api
  - ```bash
      $ docker run --name es-c-api --network es-net -e LOGSTASH_IP=es-c-logstash -p 8080:8080 -it -d es-c-api
    ```
- Check api is running
  - ```bash
      $ docker exec -it es-c-api
      $ tail -f /etc/filebeat/filebeat.log
    ```

## Run Kibana
- ```bash
    $ docker run --rm --name es-c-kibana --net es-net -p 5601:5601 -e "ELASTICSEARCH_HOSTS=http://es-c-es:9200" docker.elastic.co/kibana/kibana:7.15.0
  ```
