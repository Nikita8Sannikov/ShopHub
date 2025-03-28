# Используем официальный Node.js образ для сборки
FROM node:22 AS build

# Устанавливаем рабочую директорию
WORKDIR /client

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Сборка приложения для продакшн
RUN npm run build

# 2. Финальный образ (только собранные файлы)

# Запускаем сервер с готовым фронтендом с помощью Nginx
FROM nginx:alpine

# Устанавливаем рабочую директорию внутри контейнера для Nginx
WORKDIR /root 

# Копируем собранный фронтенд в директорию Nginx
COPY --from=build /client/dist /usr/share/nginx/html

# Копируем конфигурацию Nginx 
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Экспонируем 80 порт
# EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
