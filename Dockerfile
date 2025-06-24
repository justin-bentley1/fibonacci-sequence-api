FROM node:22.16.0-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]

EXPOSE 3000


