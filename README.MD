# 🏥 General Medical Practice System (GMPS)

A full-featured medical appointment booking system that allows users to register, browse available doctors, book appointments, and receive email notifications. Built with modern technologies and security best practices. Future development includes AI integration to support users with health-related advice before they see a doctor.

---

## 🌐 Live Demo (Optional)

> Coming soon...

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Bcrypt for secure access
- **Email Notifications**: Nodemailer with SMTP (e.g. Gmail, SendGrid)
- **AI Integration (Planned)**: OpenAI API for symptom advice, mental well-being, and prescription education

## 🔐 Features

- 🔑 User registration & login (JWT)
- 🧑‍⚕️ Browse available doctors with time slots
- 📅 Book fixed 2-hour time slot appointments
- 📧 Receive email confirmation and cancellation notices
- 🧠 Future AI assistant: Get symptom advice before seeing a doctor
- 👨‍⚕️ Admin panel: Manage doctors and their availability
- 🛡️ Role-based access control (user/admin)

## 📡 API Endpoints

### 🔐 Auth Routes (`/api/v1/auth`)

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Log in existing user |
| GET    | `/logout`   | Log out the user     |

---

### 🧑‍⚕️ Doctor Routes (`/api/v1/doctors`)

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| GET    | `/`      | Get all doctors       |
| GET    | `/:id`   | Get a specific doctor |

### 🛠 Admin Doctor Management (`/api/v1/admin`)

> Protected via `adminAuth` middleware

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| POST   | `/`      | Create a new doctor |
| PATCH  | `/:id`   | Update doctor info  |
| DELETE | `/:id`   | Remove a doctor     |

### 📅 Booking Routes (`/api/v1/bookings`)

> Protected via `authenticateUser` middleware

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| GET    | `/`                 | Get all bookings (for the user)        |
| POST   | `/`                 | Create a new booking                   |
| GET    | `/:id`              | Get a specific booking                 |
| PATCH  | `/:id`              | Update a booking                       |
| DELETE | `/:id`              | Cancel a booking                       |
| GET    | `/doctor/:doctorId` | Get all bookings for a specific doctor |

## 🧠 Future Feature: AI Health Assistant

We plan to integrate OpenAI's GPT API to provide:

- 💬 Symptom-based advice (pre-diagnosis suggestions)
- 🧘‍♀️ Well-being support while waiting for appointments
- 💊 Explanation on how to use common prescriptions

> The AI assistant will not replace doctors, but offer first-level support and comfort.

## 📧 Email Integration

Emails are sent for:

- ✅ Booking confirmations
- ❌ Booking cancellations

Powered by `nodemailer` and SMTP (e.g., Gmail, SendGrid).

## 🔒 Authentication

- Uses **JWT (JSON Web Tokens)** for stateless auth
- Passwords hashed using **bcrypt**
- Routes protected by role (user/admin)

## ⚙️ Environment Variables (`.env`)

```env
Please email me phannguyentuanhung2005@gmail.com if you guys want to get the .env file
```
