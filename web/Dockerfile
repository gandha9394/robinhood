FROM node:14-alpine

WORKDIR /app/
RUN apk add libpng-dev make automake autoconf libtool g++ nasm
COPY ./package.json ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"
ENV HOSTNAME=localhost
ENV PORT=3000
ENV HOST=$HOST

EXPOSE $PORT

COPY . ./

CMD [ "source .env" ]

RUN yarn build

ENTRYPOINT yarn start
