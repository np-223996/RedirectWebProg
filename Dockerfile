From node:13-alpine

ENV BEARER_TOKEN=secret

RUN mkdir -p /home/app
RUN npm install
RUN npm install express cors uuid dotenv

WORKDIR /home/app

COPY . .

CMD ["node", "server.js"]