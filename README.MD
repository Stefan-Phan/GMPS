# 🏥 General Medical Practice System (GMPS)

A full-featured medical appointment booking system that allows users to register, browse available doctors, book appointments, and receive email notifications. Now enhanced with **Gemini AI** for health-related advice and a **MongoDB Q&A cache** to reduce redundant API calls and cost.

## 🌐 Live Demo

> Coming soon...

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JWT, bcrypt
- **Email Notifications**: Nodemailer (Gmail/SMTP)
- **AI Integration**: Gemini API via Google Generative AI
- **Caching**: MongoDB QALog model to store AI Q&A pairs

## 🔐 Features

- 🔑 User registration and login with secure JWT auth
- 🧑‍⚕️ View all available doctors
- 📅 Book fixed 2-hour appointment slots
- 📧 Email confirmation and cancellation notices
- 🧠 AI assistant for pre-diagnosis symptom advice
- 🧠 Q&A log system to cache AI responses
- 👨‍⚕️ Admin tools to manage doctor records
- 🛡️ Role-based access control (admin, doctor, patient)

## 📡 API Endpoints

### 🔐 Auth Routes (`/api/v1/auth`)

| Method | Endpoint    | Description          |
| ------ | ----------- | -------------------- |
| POST   | `/register` | Register a new user  |
| POST   | `/login`    | Log in existing user |
| GET    | `/logout`   | Log out the user     |

### 🧑‍⚕️ Doctor Routes (`/api/v1/doctors`)

| Method | Endpoint | Description           |
| ------ | -------- | --------------------- |
| GET    | `/`      | Get all doctors       |
| GET    | `/:id`   | Get a specific doctor |

### 🛠 Admin Doctor Management (`/api/v1/admin`)

> Protected via `adminAuth`

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| POST   | `/`      | Create a new doctor |
| PATCH  | `/:id`   | Update doctor info  |
| DELETE | `/:id`   | Delete a doctor     |

### 📅 Booking Routes (`/api/v1/bookings`)

> Protected via `authenticateUser`

| Method | Endpoint            | Description                            |
| ------ | ------------------- | -------------------------------------- |
| GET    | `/`                 | Get all bookings for the user          |
| POST   | `/`                 | Create a new booking                   |
| GET    | `/:id`              | Get details of a specific booking      |
| PATCH  | `/:id`              | Update a booking                       |
| DELETE | `/:id`              | Cancel a booking                       |
| GET    | `/doctor/:doctorId` | Get all bookings for a specific doctor |

### 🧠 AI Assistant (`/api/v1/ai`)

| Method | Endpoint | Description                              |
| ------ | -------- | ---------------------------------------- |
| POST   | `/`      | Ask a symptom-related question to Gemini |
| GET    | `/`      | Get the 5 most recent AI Q&A entries     |

## 🧠 AI Health Assistant (Powered by Gemini)

- ✅ Ask questions like _"I have a sore throat, what should I do?"_
- 🧠 Get safe pre-consultation advice via Gemini AI (Google Generative AI)
- 💾 AI answers are cached in MongoDB (`QALog`) to prevent duplicate calls and reduce cost
- 🔄 Supports reuse of past answers for repeated questions

## 📧 Email Integration

Emails are automatically sent when:

- ✅ Booking is confirmed
- ❌ Booking is canceled

Uses Nodemailer via Gmail SMTP.

## 🔒 Authentication

- Users authenticate via **JWT**
- Passwords are securely hashed using **bcrypt**
- Admins and doctors use **role-based access control**

## 🧪 Caching Layer: QALog Model

Each AI interaction is cached with:

- `question` and `normalizedQuestion`
- `answer`
- `userId` and `timestamp`

This allows:

- Instant reuse of previous AI answers
- Reduced API usage for Gemini
- Recent Q&A query via `/api/v1/ai`

## ⚙️ Environment Variables (`.env`)

```env
If you need a sample .env file, contact: phannguyentuanhung2005@gmail.com
```
