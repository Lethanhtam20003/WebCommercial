# Giai đoạn 1: Build Angular app
FROM node:20 AS build
WORKDIR /app

# Copy toàn bộ source code và cài dependencies
COPY . .
RUN npm install
RUN npm run build -- --configuration=production

# Giai đoạn 2: Serve bằng Nginx
FROM nginx:alpine
# Xóa file mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy Angular build vào thư mục serve của Nginx
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy file cấu hình Nginx custom (nếu có)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
