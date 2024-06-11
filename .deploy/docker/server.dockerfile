FROM node:20.14.0

WORKDIR /opt/web

COPY package*.json ./

RUN yarn install

COPY ./ ./

RUN yarn build

EXPOSE 3000

CMD yarn start
