FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm install
COPY . .
RUN chmod +x ./entrypoint.sh
EXPOSE 4000
ENTRYPOINT [ "sh", "/app/entrypoint.sh" ]