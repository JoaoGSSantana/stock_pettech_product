FROM node:18-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

ARG MONGO_URI
ARG PORT
ARG JWT_SECRET

ENV MONGO_URI=$MONGO_URI

RUN echo "MONGO_URI=${MONGO_URI}" > .env
RUN echo "PORT=${PORT}" > .env
RUN echo "JWT_SECRET=${JWT_SECRET}" > .env

RUN npm i -g pnpm

RUN pnpm build

EXPOSE 3010

CMD ["node", "dist/main.js"]