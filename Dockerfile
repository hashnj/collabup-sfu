FROM node:18-alpine

# Install system dependencies including pip
RUN apk add --no-cache python3 py3-pip make g++ linux-headers

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 2000-2020/udp
EXPOSE 10000-10100/udp

CMD ["node", "index.js"]
