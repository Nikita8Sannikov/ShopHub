# Используем официальный Node.js образ как базовый
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /server

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --omit=dev

# Копируем серверный код
COPY . .

# Порт, на котором будет работать сервер
EXPOSE 5001

# Запускаем сервер
CMD ["npm", "run", "start:production"]
