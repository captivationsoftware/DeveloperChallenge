FROM node:14.17-alpine

# Create app directory
WORKDIR /usr/src/

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]