# Bước 1: Build source code
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# Bỏ qua xung đột peer dependency
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Bước 2: Phục vụ file tĩnh qua Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
