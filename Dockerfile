FROM node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install
RUN yarn build

CMD [ "npm", "start"]
