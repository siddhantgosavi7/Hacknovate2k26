# EcoSort AI Backend

Production-style REST API for the EcoSort AI hackathon project. It supports authentication, AI-style waste image scans, rewards, pickup scheduling, analytics, and a sustainability chatbot.

## Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs password hashing
- Multer image uploads
- Optional Cloudinary storage
- helmet, cors, morgan, dotenv

## Setup

```bash
cd backend
npm install
cp .env .env.local
npm run dev
```

Update `.env` with your MongoDB connection string and a strong `JWT_SECRET`.

Cloudinary is optional. If `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are empty, uploaded images are stored locally in `uploads/`.

## API Base URL

```text
http://localhost:5000/api
```

## Standard Response

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {}
}
```

Errors use:

```json
{
  "success": false,
  "message": "Invalid token"
}
```

## Routes

### Auth

`POST /api/auth/register`

```json
{
  "name": "Asha Green",
  "email": "asha@example.com",
  "password": "secret123"
}
```

`POST /api/auth/login`

```json
{
  "email": "asha@example.com",
  "password": "secret123"
}
```

Use the returned JWT as:

```text
Authorization: Bearer <token>
```

### Waste Scan

`POST /api/waste/scan`

Protected multipart form request:

- `image`: image file, required
- `hint`: optional text such as `plastic bottle`

`GET /api/waste/history`

Returns the authenticated user's previous scans.

### Rewards

`GET /api/rewards`

Returns EcoScore, XP, streak, badges, and reward history.

`POST /api/rewards/add`

```json
{
  "points": 50,
  "achievement": "Community Cleanup",
  "reason": "Joined a weekend recycling drive"
}
```

### Pickups

`POST /api/pickup/create`

```json
{
  "wasteCategory": "E-Waste",
  "address": "42 Green Street, Sector 9",
  "pickupDate": "2026-05-20T10:00:00.000Z",
  "notes": "Old chargers and phone batteries"
}
```

`GET /api/pickup/all`

Returns all pickups for the authenticated user.

### Analytics

`GET /api/analytics/dashboard`

Returns waste distribution, recycling trends, CO2 savings, participation stats, and recent activity.

### Chatbot

`POST /api/chatbot/message`

```json
{
  "message": "Where should I throw batteries?"
}
```

## Mock AI Behavior

The current AI layer is intentionally realistic but local:

- Uses file name and optional `hint` to infer waste type.
- Generates confidence scores between 86 and 98.
- Returns waste category, recommended bin, recyclability, disposal tip, and CO2 impact.
- Awards XP and badges after scans.

The service can later be replaced by a real vision model without changing the controller or route contract.
