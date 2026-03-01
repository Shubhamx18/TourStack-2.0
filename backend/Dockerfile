FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# Create uploads folder for PVC mount
RUN mkdir -p /app/uploads

# Give permission (important for K8s)
RUN chown -R node:node /app

USER node

EXPOSE 5000

CMD ["node", "server.js"]
