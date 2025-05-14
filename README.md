# 🍎 My Store – E-commerce Backend

A modern, scalable backend for a full-featured e-commerce platform built with **TypeScript**, **Express**, **PostgreSQL**, and **RabbitMQ**. Designed for extensibility, real-time capabilities, and integration with a physical store.

---

## 🚀 Project Goals

This backend powers a store that sells clothes, decor, and trending products. It includes:
- Modular architecture for maintainability
- Support for admin panel integration
- Messaging architecture for future logistics and real-time notifications
- Scalable foundations for user and product management

---

## 🧱 Tech Stack

| Layer         | Technology                          |
|---------------|--------------------------------------|
| Language      | TypeScript                          |
| Framework     | Express.js                          |
| Database      | PostgreSQL                          |
| Messaging     | RabbitMQ                            |
| Container     | Docker + Docker Compose             |
| Auth          | JWT (planned)                       |
| Future Front  | Vue 3 / Nuxt (planned)              |

---

## 📁 Folder Structure (planned)

```
/src
  ├── modules
  │   ├── products
  │   │   ├── controller.ts
  │   │   ├── service.ts
  │   │   └── model.ts
  ├── routes
  ├── config
  ├── db
  └── utils
```

---

## 📦 Features (MVP)
- [x] API for managing products
- [ ] User registration & login (JWT)
- [ ] Order creation & history
- [ ] Admin product management
- [ ] RabbitMQ integration for messaging

---

## 🛠️ Running Locally

```bash
# Clone the repo
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# Install dependencies
npm install

# Start Docker containers
docker-compose up -d

# Run the app
npm run dev
```

---

## ✍️ Author

**Hendrius Félix**  
Back-End Developer | IoT Enthusiast  
[LinkedIn](https://www.linkedin.com/) *(add your link)*

---

## 🧽 License

This project is licensed under the MIT License.
