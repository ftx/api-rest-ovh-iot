FROM node:slim

MAINTAINER Florian Mauduit <flotix@linux.com>

ENV TOKEN_ID tokenid
ENV TOKEN_KEY tokenkey

# Install app & dependencies
COPY . /src
WORKDIR /src
RUN npm install


EXPOSE  81

CMD ["node", "index.js"]
