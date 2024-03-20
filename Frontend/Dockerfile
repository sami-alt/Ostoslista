FROM node:20-alpine3.19
RUN mkdir -p /front
WORKDIR /front
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY public public
COPY src src
ENV NODE_ENV=production
RUN npm run build
RUN npm install -gy http-server
