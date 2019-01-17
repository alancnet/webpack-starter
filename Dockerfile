FROM node

RUN npm install -g yarn

EXPOSE 80

ENV NODE_PORT=80 NODE_ENV=production
WORKDIR /app/
ADD . /app/
RUN NODE_ENV=development yarn && \
    yarn build && \
    yarn

CMD yarn server