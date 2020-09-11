FROM node:12.16.3-alpine
RUN npm i -g nodemon
RUN mkdir -p /api
COPY package*.json /api/
RUN chown -R node: /api
USER node
WORKDIR /api
RUN npm i
COPY . .