# docker build -t dolphin-frontend-0-2-0 . && docker run -d --name dolphin-frontend-0-2-0 -e "WEBPORT=80" -e "REGURL=http://localhost:3000" -p 4999:80 dolphin-frontend-0-2-0
#
FROM node:7.10-alpine
LABEL maintainer="Eugen Soloviov"
RUN apk update && apk upgrade && apk add --no-cache git
COPY server /server
COPY client /client
RUN cd /client && npm install && node build/build.js && mv /client/public /server/public
COPY register.json /server/register.json
WORKDIR /server
RUN npm install
CMD ["node","index.js"]