FROM node:13-alpine

ENV BEARER_TOKEN=secret

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .

RUN npm install

CMD ["npm", "start"]