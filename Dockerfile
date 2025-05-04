FROM node:18-alpine

# Install dependencies required by mediasoup
RUN apk add --no-cache python3 make g++ linux-headers

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Expose signaling and media ports
EXPOSE 3000
EXPOSE 2000-2020/udp
EXPOSE 10000-10100/udp

CMD ["node", "index.js"]
