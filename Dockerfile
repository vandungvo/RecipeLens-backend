# Sử dụng Node.js LTS làm base image
FROM node:18-alpine AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json để cài đặt dependencies trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Biến môi trường để chạy ứng dụng ở production mode
ENV NODE_ENV=production

# Biên dịch TypeScript sang JavaScript
RUN npm run build

# Xóa node_modules và cài đặt lại dependencies ở chế độ production
RUN rm -rf node_modules && npm install --omit=dev

# ----

# Tạo image nhẹ hơn để chạy ứng dụng (multi-stage build)
FROM node:18-alpine AS runner

WORKDIR /app

# Sao chép file từ giai đoạn trước
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./ 

# Mở cổng cho ứng dụng
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["node", "dist/main.js"]
