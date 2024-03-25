FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++
RUN npm install
COPY . .
EXPOSE 4000
RUN chmod +x ./entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh" ]