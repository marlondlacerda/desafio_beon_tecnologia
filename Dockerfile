FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm --silent
RUN npm install -g serverless --silent
RUN npm install --silent

EXPOSE 3000

COPY . .
