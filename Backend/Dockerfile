FROM node:20-bullseye
RUN mkdir -p /back
WORKDIR /back
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY  migrations migrations
COPY knexfile.js /back/
COPY server.js /back/
ENV DB_PATH=/list.db