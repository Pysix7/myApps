FROM node:12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i --only=prod

COPY . .

CMD [ "node", "index.js" ]
