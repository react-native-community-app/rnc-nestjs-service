# Build dependencies
FROM node:20-alpine as dependencies

WORKDIR /usr/src/app
COPY package.json .
RUN npm i
COPY . . 
RUN npm run build

# Build production image
FROM dependencies as builder
EXPOSE ${PORT}
CMD npm run start:prod