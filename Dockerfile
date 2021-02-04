FROM node:12.20.1-alpine3.10

COPY ./ ./app

WORKDIR /app

RUN ls & npm install

EXPOSE 8080

ENTRYPOINT ["npm", "run", "dev"]
