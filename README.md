# Nodejs REST API for IoT Timeseries OVH PaaS

:whale: Available on DockerHub (https://hub.docker.com/r/flotix/api-rest-ovh-iot/)

## Env variables

- TOKEN_ID
- TOKEN_KEY

### Use

#### Example
docker run -p 81:81 -e TOKEN_ID="foo" -e TOKEN_KEY="bar" flotix/api-rest-ovh-iot

#### Usage

When it run, you can access to this url for send metrics :

http://mydomain.dot/send?measurement=temp&value=26.2&location=Home


#### Contact
flotix@linux.com
http://ftx.cloud
