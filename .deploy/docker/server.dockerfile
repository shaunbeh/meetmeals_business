FROM node:20.14.0-buster

RUN mkdir /src

WORKDIR /src

COPY package.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 3000

CMD yarn start
