FROM node:20-alpine

WORKDIR /usr/src/app

COPY build /usr/src/app/build
COPY package.json /usr/src/app
COPY pnpm-lock.yaml /usr/src/app

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

CMD ["node", "build"]