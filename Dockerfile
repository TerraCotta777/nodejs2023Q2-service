FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
RUN chmod +x ./entrypoint.sh
ENTRYPOINT [ "/app/entrypoint.sh" ]