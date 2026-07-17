# 👗 ShopFashion – E-Commerce Fashion Web Application

<p align="center">
  <img src="https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-6.x-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/Bootstrap-5.x-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
</p>

> A full-stack e-commerce web application for a fashion clothing store, built with **Angular 19** on the frontend and **Node.js / Express** on the backend.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Database](#-database)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage Guide](#-usage-guide)
- [Testing](#-testing)
- [Available Scripts](#-available-scripts)
- [Core Workflows](#-core-workflows)
- [Development Notes](#-development-notes)

---

## 🎯 Overview

**ShopFashion** is a complete online shopping application for a fashion retail store. The system provides a rich shopping experience with full product management, order handling, cart management, and payment integration. The project is split into two independent parts:

- **Frontend** – Single-page application built with Angular 19, Angular Material & CoreUI
- **Backend** – RESTful API server built with Node.js + Express + Sequelize ORM

---

## ✨ Features

### 👤 Customer (User)
- ✅ Register a new account
- ✅ Login / Logout (JWT Authentication)
- ✅ Browse products on the home page
- ✅ Search products by name
- ✅ View product details (name, price, old price, size, description, images)
- ✅ Filter products by category
- ✅ Add products to the shopping cart
- ✅ Manage the cart (add, remove items)
- ✅ Place orders / Checkout
- ✅ Pay via **ZaloPay**

### 🔐 Administrator (Admin)
- ✅ Access the admin panel (protected by Auth Guard + JWT Role)
- ✅ View all products
- ✅ Add new products (including image upload)
- ✅ Edit product information
- ✅ Delete products
- ✅ Manage categories (create, update, delete)

### 🖼️ Images
- ✅ Upload product images to the server
- ✅ View and delete images by filename

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                        │
│                    Angular 19 (Port 4200)                    │
│                                                             │
│  ┌────────────┐  ┌──────────┐  ┌────────┐  ┌──────────┐   │
│  │ Components │  │ Services │  │ Guards │  │  Models  │   │
│  └────────────┘  └──────────┘  └────────┘  └──────────┘   │
└──────────────────────────┬──────────────────────────────────┘
                           │  HTTP Requests (REST API)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  BACKEND SERVER (Port 3000)                  │
│                   Node.js + Express.js                       │
│                                                             │
│  ┌────────┐  ┌────────────┐  ┌─────────────┐  ┌────────┐  │
│  │ Routes │  │ Middleware │  │ Controllers │  │ Models │  │
│  └────────┘  └────────────┘  └─────────────┘  └────────┘  │
│                          │                                   │
│                     Sequelize ORM                            │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      MySQL Database                          │
│                    (fashion_shop DB)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AngularProject/
├── 📂 frontend/                     # Angular 19 Application
│   ├── 📂 src/
│   │   ├── 📂 app/
│   │   │   ├── 📂 components/       # UI Components
│   │   │   │   ├── 📂 admin/            # Admin product management panel
│   │   │   │   ├── 📂 carousel/         # Home page image carousel
│   │   │   │   ├── 📂 cart/             # Shopping cart page
│   │   │   │   ├── 📂 footer/           # Shared footer
│   │   │   │   ├── 📂 header/           # Shared header
│   │   │   │   ├── 📂 home/             # Home page
│   │   │   │   ├── 📂 login/            # Login page
│   │   │   │   ├── 📂 navbar/           # Navigation bar
│   │   │   │   ├── 📂 product/          # Product list
│   │   │   │   ├── 📂 product-category/ # Products filtered by category
│   │   │   │   ├── 📂 product-detail/   # Product detail page
│   │   │   │   ├── 📂 register/         # Registration page
│   │   │   │   ├── 📂 sidebar-admin/    # Admin sidebar
│   │   │   │   └── 📂 sidebar-category/ # Category sidebar
│   │   │   ├── 📂 guards/
│   │   │   │   └── auth.guard.ts        # Route guard for authentication
│   │   │   ├── 📂 models/
│   │   │   │   ├── category.model.ts    # Category TypeScript model
│   │   │   │   └── product.model.ts     # Product TypeScript model
│   │   │   ├── 📂 services/
│   │   │   │   ├── auth.service.ts      # Authentication & JWT service
│   │   │   │   ├── category.service.ts  # Category API service
│   │   │   │   └── product.service.ts   # Product API service
│   │   │   ├── app-routing.module.ts    # Route definitions
│   │   │   ├── app.module.ts            # Root module
│   │   │   └── app.component.ts         # Root component
│   │   ├── index.html
│   │   ├── main.ts
│   │   ├── main.server.ts              # SSR entry point
│   │   ├── server.ts                   # Express SSR server
│   │   └── styles.css                  # Global styles
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
└── 📂 backend/                      # Node.js + Express API
    ├── 📂 config/
    │   └── config.js                # Database connection config
    ├── 📂 constants/
    │   └── index.js                 # UserRole constants
    ├── 📂 controllers/              # Business logic handlers
    │   ├── CartController.js
    │   ├── CartItemController.js
    │   ├── CategoryController.js
    │   ├── ImageController.js
    │   ├── OrderController.js
    │   ├── OrderDetailController.js
    │   ├── PaymentController.js
    │   ├── ProductController.js
    │   ├── ProductImageController.js
    │   └── UserController.js
    ├── 📂 dtos/                     # Data Transfer Objects (Input Validation)
    │   └── 📂 requests/
    │       ├── cart/
    │       ├── cart_item/
    │       ├── order/
    │       ├── product/
    │       ├── product_images/
    │       └── user/
    ├── 📂 helpers/
    │   └── token.js                 # JWT token decoding helper
    ├── 📂 middlewares/              # Express middlewares
    │   ├── asyncHandler.js          # Async error catching wrapper
    │   ├── imageUpload.js           # Multer file upload config
    │   ├── jwtMiddleware.js         # JWT auth & role authorization
    │   ├── validate.js              # Joi schema validation
    │   └── validateImageExists.js   # Image existence check
    ├── 📂 migrations/               # Sequelize migration files
    ├── 📂 models/                   # Sequelize ORM models
    │   ├── cart.js
    │   ├── cartitem.js
    │   ├── category.js
    │   ├── index.js                 # DB connection initializer
    │   ├── order.js
    │   ├── order_details.js
    │   ├── product.js
    │   ├── productimage.js
    │   └── user.js
    ├── 📂 seeders/                  # Database seed data
    ├── 📂 uploads/                  # Uploaded image storage
    ├── approute.js                  # All API route definitions
    ├── index.js                     # Server entry point
    ├── .env                         # Environment variables
    ├── package.json
    └── ShopFahsion.postman_collection.json  # Postman API collection
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| [Angular](https://angular.io/) | `^19.0.0` | Main SPA framework |
| [Angular SSR](https://angular.io/guide/ssr) | `^19.0.5` | Server-Side Rendering support |
| [Angular Material](https://material.angular.io/) | `^19.0.4` | UI component library |
| [CoreUI Angular](https://coreui.io/angular/) | `~5.3.4` | Admin UI components |
| [Bootstrap](https://getbootstrap.com/) | `^5.3.3` | CSS framework |
| [Font Awesome](https://fontawesome.com/) | `^6.7.2` | Icon library |
| [RxJS](https://rxjs.dev/) | `~7.8.0` | Reactive programming |
| [TypeScript](https://www.typescriptlang.org/) | `~5.6.2` | Typed JavaScript |

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| [Node.js](https://nodejs.org/) | `22.x` | JavaScript runtime |
| [Express.js](https://expressjs.com/) | `^4.21.2` | Web framework |
| [Sequelize](https://sequelize.org/) | `^6.37.5` | ORM for MySQL |
| [MySQL2](https://sidorares.github.io/node-mysql2/) | `^3.11.5` | MySQL driver |
| [jsonwebtoken](https://jwt.io/) | `^9.0.2` | JWT authentication |
| [Argon2](https://github.com/ranisalt/node-argon2) | `^0.41.1` | Secure password hashing |
| [Multer](https://github.com/expressjs/multer) | `^1.4.5-lts.1` | File upload handling |
| [Joi](https://joi.dev/) | `^17.13.3` | Schema-based input validation |
| [Axios](https://axios-http.com/) | `^1.7.9` | HTTP client (ZaloPay integration) |
| [Crypto-JS](https://cryptojs.gitbook.io/docs/) | `^4.2.0` | HMAC-SHA256 for ZaloPay signing |
| [Moment.js](https://momentjs.com/) | `^2.30.1` | Date/time formatting |
| [Dotenv](https://github.com/motdotla/dotenv) | `^16.4.7` | Environment variable management |
| [Nodemon](https://nodemon.io/) | `^3.1.9` | Auto-restart dev server |
| [Babel](https://babeljs.io/) | `^7.26.0` | ES Module transpiler |

---

## 🗄️ Database

### Entity Relationship Diagram (ERD)

```
┌─────────────┐         ┌──────────────────┐         ┌───────────────┐
│  categories │         │     products      │         │product_images │
│─────────────│         │──────────────────│         │───────────────│
│ id (PK)     │──1──<──│ id (PK)           │──1──<──│ id (PK)       │
│ name        │         │ name             │         │ product_id    │
│ image       │         │ price            │         │ image_url     │
│ status      │         │ oldprice         │         └───────────────┘
│ created_at  │         │ image            │
│ updated_at  │         │ quantity         │         ┌─────────────┐
└─────────────┘         │ category_id (FK) │         │    carts    │
                        │ buyturn          │         │─────────────│
┌─────────────┐         │ size             │         │ id (PK)     │
│    users    │         │ description      │         │ user_id     │
│─────────────│         │ created_at       │         │ status      │
│ id (PK)     │         │ updated_at       │         │ created_at  │
│ email       │         └──────────────────┘         └──────┬──────┘
│ password    │                                             │
│ name        │         ┌──────────────────┐               │
│ role        │──1──<──│      orders       │   ┌───────────┴───────────┐
│ phone       │         │──────────────────│   │      cart_items        │
│ created_at  │         │ id (PK)          │   │───────────────────────│
│ updated_at  │         │ user_id (FK)     │   │ id (PK)               │
└─────────────┘         │ status           │   │ cart_id (FK)          │
                        │ notes            │   │ product_id (FK)       │
                        │ total            │   │ quantity              │
                        │ created_at       │   │ price                 │
                        │ updated_at       │   └───────────────────────┘
                        └────────┬─────────┘
                                 │
                        ┌────────┴─────────┐
                        │  order_details   │
                        │──────────────────│
                        │ id (PK)          │
                        │ order_id (FK)    │
                        │ product_id (FK)  │
                        │ price            │
                        │ quantity         │
                        │ created_at       │
                        │ updated_at       │
                        └──────────────────┘
```

### Table Descriptions

| Table | Description |
|-------|-------------|
| `users` | User account info; role field determines access level |
| `categories` | Product categories (e.g., Shirts, Pants, Dresses) |
| `products` | Product info: name, price, old price, image, size, description |
| `product_images` | Additional images for each product |
| `orders` | Customer orders |
| `order_details` | Line items for each order |
| `carts` | Shopping carts per user |
| `cart_items` | Items within a shopping cart |

---

## 📡 API Documentation

> **Base URL:** `http://localhost:3000/api`

> 🔐 Routes marked **[ADMIN]** require a JWT token with Admin role in the request header:
> `Authorization: Bearer <token>`

### 🛍️ Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/products` | Public | Get all products |
| `GET` | `/products/:id` | Public | Get product by ID |
| `GET` | `/products/category/:categoryId` | Public | Get products by category |
| `POST` | `/products` | 🔐 ADMIN | Create a new product |
| `PUT` | `/products/:id` | 🔐 ADMIN | Update a product |
| `DELETE` | `/products/:id` | 🔐 ADMIN | Delete a product |

### 🏷️ Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/categories` | Public | Get categories (paginated) |
| `GET` | `/allcategories` | Public | Get all categories |
| `GET` | `/categories/:id` | Public | Get category by ID |
| `POST` | `/categories` | 🔐 ADMIN | Create a new category |
| `PUT` | `/categories/:id` | 🔐 ADMIN | Update a category |
| `DELETE` | `/categories/:id` | 🔐 ADMIN | Delete a category |

### 👤 Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/users/register` | Public | Register a new account |
| `POST` | `/users/login` | Public | Login and receive a JWT token |

### 🛒 Carts

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/carts` | Public | Get all carts |
| `GET` | `/carts/:id` | Public | Get cart by ID |
| `POST` | `/carts` | Public | Create a new cart |
| `POST` | `/carts/checkout` | Public | Checkout (convert cart to order) |
| `PUT` | `/carts/:id` | Public | Update cart |
| `DELETE` | `/carts/:id` | Public | Delete cart |

### 📦 Cart Items

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/cartitems` | Public | Get all cart items |
| `GET` | `/cartitems/carts/:cart_id` | Public | Get items by cart ID |
| `POST` | `/cartitems` | Public | Add item to cart |
| `DELETE` | `/cartitems/:id` | Public | Remove item from cart |

### 📋 Orders

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/orders` | Public | Get all orders |
| `GET` | `/orders/:id` | Public | Get order by ID |
| `POST` | `/orders` | Public | Create a new order |
| `PUT` | `/orders/:id` | Public | Update an order |
| `DELETE` | `/orders/:id` | Public | Delete an order |

### 📄 Order Details

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/orderdetails` | Public | Get all order details |
| `GET` | `/orderdetails/:id` | Public | Get order detail by ID |
| `POST` | `/orderdetails` | Public | Create an order detail entry |
| `PUT` | `/orderdetails/:id` | Public | Update order detail |
| `DELETE` | `/orderdetails/:id` | Public | Delete order detail |

### 🖼️ Images

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/images/upload` | Public | Upload an image (`multipart/form-data`) |
| `GET` | `/images/:filename` | Public | View an image by filename |
| `DELETE` | `/images/:fileName` | Public | Delete an image by filename |

### 🖼️ Product Images

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/product-images` | Public | Get all product images |
| `GET` | `/product-images/:id` | Public | Get product image by ID |
| `POST` | `/product-images` | Public | Add a product image |
| `DELETE` | `/product-images/:id` | Public | Delete a product image |

### 💳 Payment

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/paymentzalopay` | Public | Create a ZaloPay payment transaction |

### 🩺 Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/healthcheck` | Check server status, DB connection, CPU & memory usage |

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** >= 22.x
- **npm** >= 10.x or **yarn**
- **MySQL** >= 8.x
- **Angular CLI** >= 19.x

### 1. Clone the Repository

```bash
git clone <repository-url>
cd AngularProject
```

### 2. Set Up the Backend

```bash
cd backend

# Install dependencies
npm install
# or
yarn install
```

### 3. Configure the Database

Create a MySQL database:
```sql
CREATE DATABASE fashion_shop;
```

Edit the `.env` file inside `backend/`:
```env
PORT=3000
NODE_ENV=development
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=fashion_shop
DB_HOST=127.0.0.1
DB_DIALECT=mysql
JWT_EXPIRATION=30d
JWT_SECRET=your_secret_key_here
```

Run migrations to create all tables:
```bash
npx sequelize-cli db:migrate
```

### 4. Start the Backend Server

```bash
npm start
# Server will run at: http://localhost:3000
```

### 5. Set Up the Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

### 6. Start the Frontend Dev Server

```bash
npm start
# Application will run at: http://localhost:4200
```

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | `3000` |
| `NODE_ENV` | Runtime environment | `development` |
| `DB_USERNAME` | MySQL username | `root` |
| `DB_PASSWORD` | MySQL password | _(empty)_ |
| `DB_DATABASE` | Database name | `fashion_shop` |
| `DB_HOST` | Database host | `127.0.0.1` |
| `DB_DIALECT` | Database type | `mysql` |
| `JWT_SECRET` | Secret key for signing JWTs | _(must be changed)_ |
| `JWT_EXPIRATION` | JWT token expiry duration | `30d` |

---

## 📱 Usage Guide

### 🌐 Application Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/home` | `HomeComponent` | Home page — carousel & featured products |
| `/login` | `LoginComponent` | User login |
| `/register` | `RegisterComponent` | New account registration |
| `/product/:id` | `ProductDetailComponent` | Product detail view |
| `/category/:categoryId` | `ProductCategoryComponent` | Products filtered by category |
| `/cart` | `CartComponent` | Shopping cart |
| `/admin` | `AdminComponent` | Admin panel _(requires Admin login)_ |

### 🔑 Role-Based Access

| Role | Permissions |
|------|-------------|
| **User (role: 0)** | Browse products, manage cart, place orders, pay |
| **Admin (role: 1)** | All user permissions + manage products and categories via Admin Panel |

### 🔒 Security

- **Passwords** are hashed using **Argon2** — one of the most secure hashing algorithms available
- **JWT Tokens** are stored in `localStorage` and sent in every protected request via `Authorization: Bearer <token>`
- **Route Guard** (`authGuard`) protects the Admin page and automatically redirects to `/login` if not authenticated
- **Role-Based Access Control (RBAC)** is enforced on both the frontend (guard) and backend (JWT middleware)

### 📤 Image Upload

- File uploads are handled by **Multer** (`multipart/form-data`)
- Uploaded images are stored in `backend/uploads/`
- Access images via: `http://localhost:3000/api/images/<filename>`

### 💳 ZaloPay Integration

- Uses the **ZaloPay API** to create payment transactions
- Requests are signed with **HMAC-SHA256** using **Crypto-JS**
- Payment endpoint: `POST /api/paymentzalopay`

---

## 🧪 Testing

### Backend

```bash
cd backend
npm test
```

> Import `ShopFahsion.postman_collection.json` into **Postman** for quick API testing.

### Frontend

```bash
cd frontend

# Unit tests with Karma + Jasmine
npm test

# Production build to catch compile errors
npm run build
```

---

## 📦 Available Scripts

### Backend

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `nodemon --inspect --exec babel-node index.js` | Start dev server with Nodemon + Babel |

### Frontend

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `ng serve` | Start dev server (port 4200) |
| `build` | `ng build` | Build production bundle |
| `watch` | `ng build --watch --configuration development` | Build and watch for changes |
| `test` | `ng test` | Run unit tests |
| `serve:ssr:frontend` | `node dist/frontend/server/server.mjs` | Run SSR production server |

---

## 🔄 Core Workflows

### Order Placement Flow

```
User selects a product
        │
        ▼
Add to cart (POST /api/cartitems)
        │
        ▼
View cart (GET /api/cartitems/carts/:cart_id)
        │
        ▼
Checkout (POST /api/carts/checkout)
        │
        ▼
Order created (POST /api/orders)
        │
        ▼
Pay via ZaloPay (POST /api/paymentzalopay)
        │
        ▼
Order complete ✅
```

### Authentication Flow

```
Login (POST /api/users/login)
        │
        ▼
Receive JWT Token → Saved to localStorage
        │
        ▼
Token sent with every protected request
Authorization: Bearer <token>
        │
        ▼
Backend validates token & checks user role
        │
        ▼
Access granted ✅  /  403 Forbidden ❌
```

---

## 📝 Development Notes

- The backend uses **ES Modules** (`import/export`) transpiled by **Babel** for Node.js compatibility
- The backend supports both **MySQL** and **SQLite** (configurable via `.env`)
- The frontend supports **Server-Side Rendering (SSR)** via Angular SSR + Express
- The `asyncHandler` middleware catches all async errors and forwards them to Express's error handler
- All user inputs are validated using **Joi schemas** via the `validate.js` middleware
- The health check endpoint (`/api/healthcheck`) reports DB connectivity, CPU load averages, and memory usage in real time

---

## 👨‍💻 Author

> **ShopFashion** – A full-stack fashion e-commerce application

---

<p align="center">Made with ❤️ using Angular & Node.js</p>
