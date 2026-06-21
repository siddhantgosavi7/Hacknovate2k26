# 🌍 EcoSort AI - Intelligent Waste Management Platform

EcoSort AI is a modern, full-stack web application designed to gamify and simplify waste segregation and recycling. Leveraging Google's **Gemini 2.5 Flash** model, the platform assists users in scanning and identifying waste materials, learning appropriate disposal methods, scheduling waste pickups, earning digital rewards (EcoCoins), and building an eco-conscious community.

🔗 **Live Application URL**: [ecosort-v2ky.onrender.com](https://ecosort-v2ky.onrender.com)

---

## 🚀 Key Features

1. **📷 AI Waste Scanner**
   - Upload an image of waste items to receive instant classification.
   - Powered by **Gemini 2.5 Flash** with custom JSON instructions.
   - Categorizes waste (Dry, Wet, E-Waste, Hazardous, Bulk Recycling, or N/A).
   - Estimates environmental footprint savings (CO2, Water, Energy).
   - Generates specific, localized disposal guidelines.

2. **💬 EcoChat Assistant**
   - Talk to a helpful AI agent designed to answer waste management and segregation queries in seconds.

3. **📅 Smart Pickup Scheduling**
   - Book waste pickups directly from the application with customizable schedules (e.g., date, waste types).

4. **🪙 EcoCoins & Rewards**
   - Users are rewarded with digital currency (**EcoCoins**) for successful recycling scans and scheduling collections.

5. **🛒 Marketplace**
   - Spend earned EcoCoins on sustainable goods, eco-friendly products, and retail vouchers.

6. **🏆 Community Leaderboard**
   - Gamified experience tracking the top environmental contributors in the community.

7. **🌐 Multi-lingual Support**
   - Context-aware localization to allow wider community accessibility.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (for premium micro-animations and transitions)
- **Routing**: React Router DOM v7
- **Icons**: Lucide React

### Backend
- **Framework**: Node.js, Express
- **AI Integration**: Google Generative AI SDK (Gemini 2.5 Flash)
- **Upload Handling**: Multer
- **Security & Session**: JSON Web Token (JWT)
- **Environment Management**: Dotenv

---

## 📂 Repository Structure

```text
Hacknovate2k26/
├── backend/                  # Node.js/Express Backend API
│   ├── data/                 # Local data storage/JSON database files
│   ├── routes/               # API endpoints
│   │   ├── auth.js           # Authentication & Profile routes
│   │   ├── chat.js           # EcoChat API (Gemini Integration)
│   │   ├── ecocoins.js       # Rewards & Transaction routes
│   │   ├── leaderboard.js    # Community rankings
│   │   ├── marketplace.js    # Store products & orders
│   │   ├── pickups.js        # Collection scheduling
│   │   └── waste.js          # Waste analysis and scanning (Gemini Integration)
│   ├── uploads/              # Temp directory for image uploads
│   ├── server.js             # Main server entrypoint
│   └── package.json          # Backend configuration and dependencies
│
└── frontend/                 # Vite & React Frontend
    ├── dist/                 # Production build assets
    ├── src/                  # React codebase
    │   ├── components/       # Reusable layout and ui components (e.g., AppShell)
    │   ├── contexts/         # Authentication, Cart, and Translation contexts
    │   ├── pages/            # Page components (Home, Login, Register, Marketplace, Profile)
    │   ├── sections/         # Home page features (WasteScanner, PickupScheduling, Rewards, etc.)
    │   ├── styles.css        # Tailwind and global stylesheet
    │   └── App.jsx           # Main routing and provider mapping
    └── package.json          # Frontend configuration and dependencies
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the Repository
```bash
git clone https://github.com/siddhantgosavi7/Hacknovate2k26.git
cd Hacknovate2k26
```

### 2. Configure the Backend
Navigate to the `backend` directory, install dependencies, and configure the environment variables.

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:
```env
PORT=5050
GEMINI_API_KEY=your_gemini_api_key_here
JWT_SECRET=your_jwt_secret_here
```

Start the backend server in development mode:
```bash
npm run dev
```
The server will start running on `http://localhost:5050`.

### 3. Configure the Frontend
Open a new terminal, navigate to the `frontend` directory, install dependencies, and launch Vite.

```bash
cd frontend
npm install
npm run dev
```
The application will launch on `http://127.0.0.1:5173` (or `http://localhost:5173`).

---

## 🔒 Environment Variables Reference

| Variable | Description | Location | Default Value |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend server port | `backend/.env` | `5050` |
| `GEMINI_API_KEY` | Developer Google Gemini key | `backend/.env` | Custom value |
| `JWT_SECRET` | Secret key used to sign JWTs | `backend/.env` | Custom value |

---

## 🎨 UI/UX Theme and Styling

EcoSort AI focuses on a **clean, dark-mode-first aesthetic** utilizing:
- Harmonious HSL colors.
- Smooth cards and glassmorphism.
- Micro-interactions powered by Framer Motion.
- Clean typography and responsive design suitable for both mobile and desktop users.
