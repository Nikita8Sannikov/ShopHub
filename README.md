# 🛒 ShopHub – стильный магазин премиум-товаров

## 📌 Описание

**ShopHub** — это концептуальный интернет-магазин с минималистичным черно-белым дизайном, вдохновлённым эстетикой премиальных автомобилей. Проект демонстрирует реализацию ключевых функций интернет-магазина с использованием современного стека технологий.

![preview](https://github.com/user-attachments/assets/9f192dc1-8756-4af2-9d5d-10c681ccc683)

---

## ⚙️ Функциональность

- 👤 Регистрация и вход по JWT + cookies
- 🧺 **Гостевая корзина** — добавляй товары до авторизации, после входа все добавленные товары сохраняются в персональной корзине.
- 🛒 Персональная корзина пользователя с подсчётом суммы
- 📦 CRUD для товаров и категорий (доступен администратору)
- 🔍 Фильтрация товаров по категориям и поиск товаров
- ⚡ Быстрый и отзывчивый UI на **shadcn/ui** + **Tailwind CSS**
---
📦  CRUD админа

![admin crud](https://github.com/user-attachments/assets/14740e97-6ca2-4b10-a4b4-f9a388aca718)

---

## 🧪 Технологии

### **Frontend:**
- ⚛️ React + TypeScript
- 🎨 Tailwind CSS + shadcn/ui
- ⚡ Vite

### **Backend:**
- 🟢 Node.js + Express
- 🍃 MongoDB
- 🔐 JWT + Cookies для авторизации

### **DevOps:**
- 🐳 Docker


## 🚀 Где посмотреть?
Готовая версия доступна онлайн:
<br>
👉 [Shop_Hub](https://shophub-nginx-v1-1.onrender.com/list)

---

## 🛠 Как запустить локально?

1. Клонируй репозиторий:
```bash
git clone https://github.com/Nikita8Sannikov/ShopHub.git
cd ShopHub
```
2. Установи зависимости:
```
npm install
```


> ⚠️ Для полноценной работы необходим `.env` файл с переменными окружения (ключи, URI базы данных)
Если хочешь просто посмотреть, используй деплой по ссылке выше.

---

## 🔮 Возможности для развития

- 🛍 Пагинация и расширенная фильтрация товаров
- 🌐 Интернационализация (i18n)
- 📱 Адаптив под мобильные устройства
- 📄 Всплывающие уведомления
