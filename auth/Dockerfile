FROM node:12.16.3-alpine
RUN npm i -g nodemon
RUN mkdir -p /auth
COPY package*.json /auth/
RUN chown -R node: /auth
USER node
WORKDIR /auth
RUN npm i
COPY . .