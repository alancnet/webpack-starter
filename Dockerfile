FROM node:16

EXPOSE 80

ENV NODE_PORT=80 NODE_ENV=production

WORKDIR /app/

COPY package.json /app/

RUN NODE_ENV=development yarn

ADD . /app/

RUN yarn build && yarn

CMD yarn server