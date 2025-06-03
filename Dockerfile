FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM node:20-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only-production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env.production ./

EXPOSE 2321
CMD ["node", "dist/index.js"]