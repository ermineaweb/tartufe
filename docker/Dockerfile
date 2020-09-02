FROM node:12 as build-stage

WORKDIR /client
COPY ./client/package.json ./
RUN npm i --silent
COPY ./client/ ./
RUN npm run build
RUN npm ci --production --silent

WORKDIR /server
COPY ./server/package.json ./
RUN npm i --silent
COPY ./server/ ./
RUN npm run build
RUN npm ci --production --silent

FROM node:12-alpine

WORKDIR /client
COPY --from=build-stage /client/ ./

WORKDIR /server
COPY --from=build-stage /server/ ./

CMD ["node","build/server.js"]
