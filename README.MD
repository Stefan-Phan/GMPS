# General Medical Practice System (GMPS)

## Overview

The General Medical Practice System (GMPS) is a comprehensive backend solution designed to streamline the management of medical practices. Built with Node.js, Express.js, and MongoDB, this system provides a robust API for handling patient bookings, doctor information, and administrative tasks.

## Features

- **User Booking Management**: Create, update, and modify appointments
- **Doctor Availability**: View available doctors and their schedules
- **Conflict Minimization**: Intelligent scheduling to reduce booking conflicts
- **Admin Controls**: Add and modify doctor information
- **Authentication**: Secure routes for users, doctors, and admins

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Stefan-Phan/gmps.git
   ```

2. Navigate to the project directory:
   ```
   cd gmps
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register`: Register a new user
- `POST /api/v1/auth/login`: User login

### Bookings
- `GET /api/v1/bookings`: Get all bookings (authenticated)
- `POST /api/v1/bookings`: Create a new booking
- `PUT /api/v1/bookings/:id`: Update a booking
- `DELETE /api/v1/bookings/:id`: Cancel a booking

### Doctors
- `GET /api/v1/doctors`: Get all doctors
- `GET /api/v1/doctors/:id`: Get a specific doctor's details

### Admin
- `POST /api/v1/admin/doctors`: Add a new doctor (admin only)
- `PUT /api/v1/admin/doctors/:id`: Update doctor information (admin only)

## Authentication

The system uses JWT for authentication. Include the token in the Authorization header for protected routes:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Error Handling

The API uses standard HTTP status codes for error responses. Common codes include:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Data Models

### User
- `name`: String
- `email`: String (unique)
- `phoneNumber`: String
- `password`: String (hashed)
- `role`: String (enum: ['patient', 'admin'])

### Booking
- `patient`: ObjectId (ref: 'User')
- `doctor`: ObjectId (ref: 'Doctor')
- `name`: String
- `email`: String
- `appointmentDate`: String (enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
- `appointmentTime`: String
- `reason`: String
- `status`: String (enum: ['scheduled', 'completed', 'cancelled'])

### Doctor
- `name`: String
- `speciality`: String
- `contactInfor`: (Email: String), (phone: String)
- `availability`:
   - `dayOfWeek`: String (enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"])
   - `startTime`: String (default: 08:00)
   - `endTime`: String (default: 17:00)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Stefan Phan - phannguyentuanhung2005gmail.com

Project Link: https://github.com/Stefan-Phan/GMPS
