<p align="center">
  <img src="https://img.shields.io/badge/TourStack-Premium%20Travel%20Platform-0D9488?style=for-the-badge&logo=airplane&logoColor=white" alt="TourStack" />
</p>

<h1 align="center">🏔️ TourStack</h1>

<p align="center">
  <strong>India's Premium Full-Stack Travel & Hotel Management Platform</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Kubernetes-Ready-326CE5?style=flat-square&logo=kubernetes&logoColor=white" alt="Kubernetes" />
  <img src="https://img.shields.io/badge/Razorpay-Integrated-0C2451?style=flat-square&logo=razorpay&logoColor=white" alt="Razorpay" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

<p align="center">
  Discover extraordinary tours, luxurious rooms, and unforgettable holiday packages — all managed through a beautiful, responsive interface with a powerful admin dashboard.
</p>

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🖼️ Screenshots](#️-screenshots)
- [🛠️ Tech Stack](#️-tech-stack)
- [🏗️ Architecture](#️-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🐳 Docker Deployment](#-docker-deployment)
- [☸️ Kubernetes Deployment](#️-kubernetes-deployment)
- [⚙️ Environment Variables](#️-environment-variables)
- [🔌 API Reference](#-api-reference)
- [🗄️ Database Schema](#️-database-schema)
- [🔐 Security](#-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact & Support](#-contact--support)

---

## ✨ Features

### 🌍 Customer-Facing

| Feature | Description |
|---|---|
| **Tour Discovery** | Browse 8+ curated Indian tours (Mumbai, Manali, Ranthambore, Agra, Jaipur, Goa, Kerala, Varanasi) with rich itineraries, includes, tags, and high-res images |
| **Room Booking** | Explore 7 room categories (Deluxe, Classic, Suite, Heritage, Pool Villa, Cottage, Honeymoon) with availability search, capacity filters, and detailed descriptions |
| **Holiday Packages** | All-inclusive vacation packages (Goa, Rajasthan, Kerala, Himachal, Andaman, Varanasi, Kashmir) with accommodation, meals, and duration details |
| **Facilities Showcase** | Hotel amenities at a glance — Infinity Pool, Fitness Center, Ayurvedic Spa, Fine Dining, Rooftop Bar, Conference Hall |
| **Secure Authentication** | JWT-based registration & login with bcrypt password hashing |
| **Online Payments** | Razorpay payment gateway integration with order creation, verification, and status tracking |
| **Booking Management** | View, track, and manage all tour, room & package bookings from a personal dashboard |
| **User Profile** | Update personal details, change password, and view booking history |
| **Contact Form** | Reach out to the hotel team directly through the contact page |
| **Responsive Design** | Fully mobile-first responsive UI across all devices and screen sizes |

### 🔧 Admin Panel

| Feature | Description |
|---|---|
| **Dashboard** | At-a-glance analytics with booking stats, revenue charts (Chart.js), and recent activity |
| **Tour Management** | Full CRUD for tours — add, edit, delete tours with itinerary, images, pricing, and tags |
| **Room Management** | Full CRUD for rooms — manage pricing, capacity, images, and status |
| **Package Management** | Create and manage all-inclusive holiday packages |
| **Booking Oversight** | View all bookings across tours, rooms, and packages — update payment & booking statuses |
| **Customer Management** | Admin-managed customer records with contact details |
| **User Management** | View all registered users, monitor accounts |

---

## 🖼️ Screenshots

> Add your screenshots to the repo and update the paths below.

| Home Page | Tours Page | Admin Dashboard |
|---|---|---|
| ![Home](tour%20stack%20homepage.png) | *Coming Soon* | *Coming Soon* |

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library (latest with concurrent features) |
| [Vite 7](https://vite.dev/) | Lightning-fast build tool & dev server |
| [React Router 7](https://reactrouter.com/) | Client-side routing & navigation |
| [Framer Motion](https://www.framer.com/motion/) | Smooth animations & page transitions |
| [Axios](https://axios-http.com/) | HTTP client for API communication |
| [Chart.js + react-chartjs-2](https://www.chartjs.org/) | Admin dashboard analytics charts |
| [Swiper](https://swiperjs.com/) | Touch-friendly carousels & sliders |
| [SweetAlert2](https://sweetalert2.github.io/) | Beautiful, accessible alert dialogs |
| [React Hot Toast](https://react-hot-toast.com/) | Lightweight notification toasts |
| [Font Awesome 7](https://fontawesome.com/) | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express 4](https://expressjs.com/) | Web framework & REST API |
| [MySQL 8](https://www.mysql.com/) | Relational database |
| [mysql2](https://github.com/sidorares/node-mysql2) | MySQL driver with prepared statements |
| [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) | Stateless authentication tokens |
| [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Secure password hashing |
| [Razorpay SDK](https://razorpay.com/docs/) | Payment gateway integration |
| [Multer](https://github.com/expressjs/multer) | File/image upload handling |
| [Helmet](https://helmetjs.github.io/) | HTTP security headers |
| [CORS](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [Morgan](https://github.com/expressjs/morgan) | HTTP request logging |
| [Compression](https://github.com/expressjs/compression) | Gzip response compression |
| [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit) | Rate limiting for auth endpoints |

### DevOps & Infrastructure

| Technology | Purpose |
|---|---|
| [Docker](https://www.docker.com/) | Containerization (multi-stage builds) |
| [Docker Compose](https://docs.docker.com/compose/) | Multi-container orchestration |
| [Kubernetes](https://kubernetes.io/) | Container orchestration at scale |
| [Nginx](https://nginx.org/) | Production frontend reverse proxy |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT (Browser)                       │
│                  React 19 + Vite 7 SPA                       │
│         Framer Motion · Swiper · Chart.js · Axios            │
└──────────────────────────┬──────────────────────────────────┘
                           │  HTTP / REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND (Node.js + Express)                │
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌──────────────────────┐    │
│  │   Routes    │  │ Controllers│  │     Middleware        │    │
│  │            │  │            │  │  (JWT Auth, Rate      │    │
│  │ /api/auth  │→ │ authCtrl   │  │   Limit, Helmet,     │    │
│  │ /api/tours │→ │ tourCtrl   │  │   CORS, Compression) │    │
│  │ /api/rooms │→ │ roomCtrl   │  └──────────────────────┘    │
│  │ /api/pkgs  │→ │ packageCtrl│                               │
│  │ /api/book  │→ │ bookingCtrl│  ┌──────────────────────┐    │
│  │ /api/pay   │→ │ paymentCtrl│  │  Razorpay Gateway     │    │
│  │ /api/admin │→ │ adminCtrl  │  └──────────────────────┘    │
│  │ /api/contact│→ │ contactCtrl│                              │
│  └────────────┘  └────────────┘                               │
└──────────────────────────┬──────────────────────────────────┘
                           │  mysql2 (Connection Pool)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      MySQL 8.0 Database                      │
│                                                               │
│  users · admin_users · rooms · room_types · tours            │
│  packages · facilities · tour_bookings · room_bookings       │
│  package_bookings · payments · customers · contact_messages  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
TourStack/
├── 📄 README.md                    # You are here
├── 📄 package.json                 # Root scripts (dev, install, docker)
├── 📄 docker-compose.yml           # Multi-container orchestration
├── 📄 tourstack_db.sql             # Full database schema + seed data
│
├── 📂 backend/                     # Node.js + Express API
│   ├── 📄 server.js                # Express app entry point
│   ├── 📄 package.json             # Backend dependencies
│   ├── 📄 Dockerfile               # Backend Docker image
│   ├── 📄 .env                     # Environment variables (local)
│   ├── 📂 config/
│   │   └── 📄 db.js                # MySQL connection pool
│   ├── 📂 middleware/
│   │   └── 📄 auth.js              # JWT authentication middleware
│   ├── 📂 controllers/
│   │   ├── 📄 authController.js    # Register, Login, Profile
│   │   ├── 📄 tourController.js    # Tour CRUD
│   │   ├── 📄 roomController.js    # Room CRUD
│   │   ├── 📄 packageController.js # Package CRUD
│   │   ├── 📄 bookingController.js # Booking operations
│   │   └── 📄 adminController.js   # Admin panel operations
│   ├── 📂 routes/
│   │   ├── 📄 auth.js              # /api/auth/*
│   │   ├── 📄 tours.js             # /api/tours/*
│   │   ├── 📄 rooms.js             # /api/rooms/*
│   │   ├── 📄 packages.js          # /api/packages/*
│   │   ├── 📄 bookings.js          # /api/bookings/*
│   │   ├── 📄 payment.js           # /api/payment/*
│   │   ├── 📄 facilities.js        # /api/facilities/*
│   │   ├── 📄 admin.js             # /api/admin/*
│   │   └── 📄 contact.js           # /api/contact/*
│   └── 📂 scripts/
│       ├── 📄 seed.js              # Database seeding script
│       ├── 📄 syncImages.js        # Image URL synchronization
│       └── 📄 applySchema.js       # Schema migration helper
│
├── 📂 frontend/                    # React + Vite SPA
│   ├── 📄 index.html               # HTML entry point
│   ├── 📄 vite.config.js           # Vite configuration + proxy
│   ├── 📄 package.json             # Frontend dependencies
│   ├── 📄 Dockerfile               # Frontend Docker image
│   ├── 📄 nginx.conf               # Production Nginx config
│   ├── 📂 public/                  # Static assets
│   └── 📂 src/
│       ├── 📄 main.jsx             # React DOM render entry
│       ├── 📄 App.jsx              # Route definitions
│       ├── 📄 index.css            # Global styles & design system
│       ├── 📄 App.css              # App-level styles
│       ├── 📂 context/
│       │   └── 📄 AuthContext.jsx   # Auth state management
│       ├── 📂 config/
│       │   └── 📄 images.config.js # Centralized image URLs
│       ├── 📂 utils/               # Helper utilities
│       ├── 📂 components/
│       │   ├── 📄 Header.jsx       # Navigation header
│       │   ├── 📄 Footer.jsx       # Site footer
│       │   ├── 📄 PrivateRoute.jsx # Auth-protected route wrapper
│       │   ├── 📄 AdminRoute.jsx   # Admin-protected route wrapper
│       │   └── 📄 AdminSidebar.jsx # Admin panel sidebar
│       ├── 📂 pages/               # 20 page components
│       │   ├── 📄 Home.jsx         # Landing page with hero
│       │   ├── 📄 Tours.jsx        # Tour listing
│       │   ├── 📄 TourDetail.jsx   # Single tour view
│       │   ├── 📄 Rooms.jsx        # Room listing
│       │   ├── 📄 RoomDetail.jsx   # Single room view
│       │   ├── 📄 Packages.jsx     # Package listing
│       │   ├── 📄 Facilities.jsx   # Facilities showcase
│       │   ├── 📄 About.jsx        # About us page
│       │   ├── 📄 Contact.jsx      # Contact form
│       │   ├── 📄 Login.jsx        # User login
│       │   ├── 📄 Register.jsx     # User registration
│       │   ├── 📄 Profile.jsx      # User profile management
│       │   ├── 📄 MyBookings.jsx   # Booking history
│       │   ├── 📄 BookTour.jsx     # Tour booking form
│       │   ├── 📄 BookRoom.jsx     # Room booking form
│       │   ├── 📄 BookPackage.jsx  # Package booking form
│       │   ├── 📄 AvailableRooms.jsx # Room availability search
│       │   ├── 📄 Payment.jsx      # Razorpay payment page
│       │   ├── 📄 PaymentSuccess.jsx # Payment confirmation
│       │   └── 📄 ViewBooking.jsx  # Booking detail view
│       └── 📂 admin/               # 8 admin page components
│           ├── 📄 AdminLogin.jsx
│           ├── 📄 AdminDashboard.jsx
│           ├── 📄 AdminBookings.jsx
│           ├── 📄 AdminCustomers.jsx
│           ├── 📄 AdminTours.jsx
│           ├── 📄 AdminRooms.jsx
│           ├── 📄 AdminPackages.jsx
│           └── 📄 AdminUsers.jsx
│
└── 📂 k8s/                         # Kubernetes manifests
    ├── 📄 backend-deployment.yaml
    ├── 📄 frontend-deployment.yaml
    ├── 📄 mysql-deployment.yaml
    └── 📄 mysql-pvc.yaml
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | v18+ recommended |
| **npm** | v9+ |
| **MySQL** | 8.0+ |
| **Git** | Latest |

### 1. Clone the Repository

```bash
git clone https://github.com/Shubhamx18/TourStack.git
cd TourStack
```

### 2. Set Up the Database

```bash
# Log into MySQL
mysql -u root -p

# Run the schema + seed script
source tourstack_db.sql;
```

This creates the `tourstack` database, all tables, and seeds sample data (8 tours, 7 rooms, 7 packages, 6 facilities).

### 3. Configure Environment Variables

Create or update `backend/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=tourstack
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret
CLIENT_URL=http://localhost:5173
```

### 4. Install Dependencies

```bash
# Install all dependencies (backend + frontend) at once
npm run install:all
```

Or install separately:

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 5. Run the Application

```bash
# From root — starts both backend & frontend
npm run dev
```

Or run each service individually:

```bash
# Terminal 1 — Backend (http://localhost:5000)
npm run dev:backend

# Terminal 2 — Frontend (http://localhost:5173)
npm run dev:frontend
```

### 6. Access the Application

| Interface | URL |
|---|---|
| 🌐 **Website** | [http://localhost:5173](http://localhost:5173) |
| 🔧 **Admin Panel** | [http://localhost:5173/admin/login](http://localhost:5173/admin/login) |
| 🩺 **API Health Check** | [http://localhost:5000/api/health](http://localhost:5000/api/health) |

### Default Admin Credentials

```
Username: admin
Password: admin123
```

> ⚠️ **Important:** Change the default admin password immediately after first login.

---

## 🐳 Docker Deployment

Deploy the entire stack in seconds with Docker Compose.

### Quick Start

```bash
# Build and start all services
npm run docker:up
# or
docker compose up --build -d

# View logs
npm run docker:logs

# Stop all services
npm run docker:down
```

### Services

| Service | Container | Port | Description |
|---|---|---|---|
| **MySQL** | `mysql` | `3306` | Database with auto-init from `tourstack_db.sql` |
| **Backend** | `backend` | `5000` | Express API server |
| **Frontend** | `frontend` | `80` | Nginx serving React build |

### Production URLs (Docker)

| Interface | URL |
|---|---|
| 🌐 Website | [http://localhost](http://localhost) |
| 🔧 API | [http://localhost:5000](http://localhost:5000) |

---

## ☸️ Kubernetes Deployment

Kubernetes manifests are provided in the `k8s/` directory for cloud-native deployment.

```bash
# Apply all manifests
kubectl apply -f k8s/mysql-pvc.yaml
kubectl apply -f k8s/mysql-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

# Verify pods
kubectl get pods

# Check services
kubectl get svc
```

### Manifests

| File | Purpose |
|---|---|
| `mysql-pvc.yaml` | Persistent Volume Claim for MySQL data |
| `mysql-deployment.yaml` | MySQL 8 Deployment + Service |
| `backend-deployment.yaml` | Backend Deployment + Service + ConfigMap |
| `frontend-deployment.yaml` | Frontend Deployment + Service |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | API server port |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_USER` | `root` | MySQL username |
| `DB_PASSWORD` | — | MySQL password |
| `DB_NAME` | `tourstack` | Database name |
| `JWT_SECRET` | — | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `ADMIN_USERNAME` | `admin` | Default admin username |
| `ADMIN_PASSWORD` | `admin123` | Default admin password |
| `RAZORPAY_KEY_ID` | — | Razorpay test/live key ID |
| `RAZORPAY_KEY_SECRET` | — | Razorpay test/live secret |
| `CLIENT_URL` | `http://localhost:5173` | Frontend URL (for CORS) |

---

## 🔌 API Reference

Base URL: `http://localhost:5000/api`

### Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/register` | Register a new user | ❌ |
| `POST` | `/auth/login` | Login & receive JWT | ❌ |
| `GET` | `/auth/profile` | Get current user profile | 🔒 |
| `PUT` | `/auth/profile` | Update user profile | 🔒 |

### Tours

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/tours` | List all tours | ❌ |
| `GET` | `/tours/:id` | Get tour details | ❌ |

### Rooms

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/rooms` | List all rooms | ❌ |
| `GET` | `/rooms/:id` | Get room details | ❌ |

### Packages

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/packages` | List all packages | ❌ |
| `GET` | `/packages/:id` | Get package details | ❌ |

### Facilities

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/facilities` | List all facilities | ❌ |

### Bookings

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/bookings/tour` | Book a tour | 🔒 |
| `POST` | `/bookings/room` | Book a room | 🔒 |
| `POST` | `/bookings/package` | Book a package | 🔒 |
| `GET` | `/bookings/my` | Get user's bookings | 🔒 |

### Payments

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/payment/create-order` | Create Razorpay order | 🔒 |
| `POST` | `/payment/verify` | Verify payment signature | 🔒 |

### Contact

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/contact` | Submit contact message | ❌ |

### Admin

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/admin/login` | Admin login | ❌ |
| `GET` | `/admin/dashboard` | Dashboard statistics | 🔐 Admin |
| `GET` | `/admin/tours` | Manage tours | 🔐 Admin |
| `GET` | `/admin/rooms` | Manage rooms | 🔐 Admin |
| `GET` | `/admin/packages` | Manage packages | 🔐 Admin |
| `GET` | `/admin/bookings` | Manage bookings | 🔐 Admin |
| `GET` | `/admin/customers` | Manage customers | 🔐 Admin |
| `GET` | `/admin/users` | View registered users | 🔐 Admin |

### Health

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/health` | Server health check | ❌ |

> 🔒 = Requires `Authorization: Bearer <token>` header  
> 🔐 = Requires admin token

---

## 🗄️ Database Schema

The `tourstack_db.sql` file creates the following **13 tables**:

```
┌──────────────────────┐     ┌──────────────────────┐
│       users          │     │    admin_users        │
├──────────────────────┤     ├──────────────────────┤
│ id (PK)              │     │ id (PK)              │
│ name                 │     │ username (UNIQUE)     │
│ email (UNIQUE)       │     │ password (bcrypt)     │
│ password (bcrypt)    │     │ last_login            │
│ phone                │     │ created_at            │
│ dob                  │     └──────────────────────┘
│ created_at           │
└──────────┬───────────┘
           │ 1:N
           ▼
┌──────────────────────┐     ┌──────────────────────┐
│   tour_bookings      │────→│       tours           │
├──────────────────────┤     ├──────────────────────┤
│ id (PK)              │     │ id (PK)              │
│ user_id (FK)         │     │ name                 │
│ tour_id (FK)         │     │ description          │
│ booking_date         │     │ price                │
│ people               │     │ duration             │
│ total_amount         │     │ max_people           │
│ special_requests     │     │ location             │
│ payment_status       │     │ image_path / image_url│
│ booking_status       │     │ tag                  │
│ created_at           │     │ includes (JSON)      │
└──────────────────────┘     │ itinerary (JSON)     │
                             │ status               │
┌──────────────────────┐     └──────────────────────┘
│   room_bookings      │────→┌──────────────────────┐
├──────────────────────┤     │       rooms           │
│ id (PK)              │     ├──────────────────────┤
│ user_id (FK)         │     │ id (PK)              │
│ room_id (FK)         │     │ name                 │
│ check_in / check_out │     │ description          │
│ adults / children    │     │ price                │
│ total_nights         │     │ capacity             │
│ total_amount         │     │ image_path / image_url│
│ payment_status       │     │ status               │
│ booking_status       │     └──────────────────────┘
└──────────────────────┘
                             ┌──────────────────────┐
┌──────────────────────┐     │     facilities        │
│  package_bookings    │     ├──────────────────────┤
├──────────────────────┤     │ id (PK)              │
│ id (PK)              │     │ name                 │
│ user_id (FK)         │     │ description          │
│ package_id (FK)      │     │ icon                 │
│ booking_date         │     │ image_path           │
│ number_of_guests     │     │ status               │
│ total_amount         │     └──────────────────────┘
│ payment_status       │
│ booking_status       │     ┌──────────────────────┐
└──────────────────────┘────→│     packages          │
                             ├──────────────────────┤
┌──────────────────────┐     │ id (PK)              │
│     payments         │     │ name                 │
├──────────────────────┤     │ description          │
│ id (PK)              │     │ price                │
│ booking_id           │     │ duration             │
│ booking_type         │     │ accommodation        │
│ user_id (FK)         │     │ meals                │
│ amount               │     │ location             │
│ payment_method       │     │ image_path / image_url│
│ transaction_id       │     │ status               │
│ status               │     └──────────────────────┘
│ created_at           │
└──────────────────────┘     ┌──────────────────────┐
                             │  contact_messages     │
┌──────────────────────┐     ├──────────────────────┤
│     customers        │     │ id (PK)              │
├──────────────────────┤     │ name                 │
│ id (PK)              │     │ email                │
│ name                 │     │ subject              │
│ email                │     │ message              │
│ mobile               │     │ created_at           │
│ address              │     └──────────────────────┘
│ created_at           │
└──────────────────────┘     ┌──────────────────────┐
                             │     room_types        │
                             ├──────────────────────┤
                             │ id (PK)              │
                             │ name                 │
                             │ description          │
                             │ base_price           │
                             │ max_capacity         │
                             │ status               │
                             └──────────────────────┘
```

---

## 🔐 Security

TourStack implements multiple layers of security:

| Layer | Implementation |
|---|---|
| **Password Hashing** | bcryptjs with salt rounds |
| **Authentication** | JWT tokens with configurable expiry |
| **HTTP Headers** | Helmet.js for security headers (CSP, HSTS, X-Frame, etc.) |
| **Rate Limiting** | express-rate-limit on auth endpoints (30 req / 15 min) |
| **Input Validation** | Server-side validation & sanitization |
| **SQL Injection Prevention** | Parameterized queries via mysql2 prepared statements |
| **XSS Protection** | Content Security Policy + input encoding |
| **CORS Policy** | Configured allowed origins |
| **Gzip Compression** | Response compression for performance |
| **Route Protection** | PrivateRoute & AdminRoute wrapper components |

---

## 🧰 Available Scripts

### Root Level

```bash
npm run dev              # Start backend + frontend concurrently
npm run dev:backend      # Start backend only
npm run dev:frontend     # Start frontend only
npm run install:all      # Install all dependencies
npm run docker:up        # Docker Compose build & up
npm run docker:down      # Docker Compose down
npm run docker:logs      # Docker Compose follow logs
```

### Backend

```bash
cd backend
npm start                # Production server
npm run dev              # Development with nodemon
npm run seed             # Seed database with sample data
npm run sync-images      # Sync image URLs from config to DB
npm run verify           # Verify image URLs are accessible
```

### Frontend

```bash
cd frontend
npm run dev              # Development server (Vite)
npm run build            # Production build
npm run preview          # Preview production build
npm run lint             # Run ESLint
```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Purpose |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Code style (no logic change) |
| `refactor:` | Code refactoring |
| `perf:` | Performance improvement |
| `test:` | Adding tests |
| `chore:` | Maintenance tasks |

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact & Support

- 🐛 **Found a bug?** Open an [Issue](https://github.com/Shubhamx18/TourStack/issues)
- 💡 **Feature request?** Start a [Discussion](https://github.com/Shubhamx18/TourStack/discussions)
- 📧 **Email:** Reach out through the website contact form

---

<p align="center">
  Made with ❤️ by <strong>Shubham</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/⭐_Star_This_Repo-If_You_Found_It_Useful!-FFD700?style=for-the-badge" alt="Star this repo" />
</p>