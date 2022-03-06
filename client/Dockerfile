FROM node:12.16.3-alpine
RUN npm install -g create-react-app
RUN mkdir -p /client
COPY package*.json /client/
RUN chown -R node: /client
USER node
WORKDIR /client
RUN CI=true
RUN npm i
COPY . .