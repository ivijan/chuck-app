FROM node:latest
RUN mkdir -p /Users/i330055/workbox/yaas/toad/nodejs-intro/chuck-app/docker-image
WORKDIR /Users/i330055/workbox/yaas/toad/nodejs-intro/chuck-app/docker-image
COPY package.json /Users/i330055/workbox/yaas/toad/nodejs-intro/chuck-app/docker-image
RUN npm install
COPY . /Users/i330055/workbox/yaas/toad/nodejs-intro/chuck-app/docker-image
EXPOSE 3000
CMD npm start