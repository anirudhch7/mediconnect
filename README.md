# Mediconnect AI 🩺

Mediconnect AI is a Full Stack Doctor Appointment Booking System enhanced with powerful Artificial Intelligence capabilities. It is designed to provide a seamless healthcare experience for patients, efficient management tools for doctors, and comprehensive administrative controls for platform owners.

---

## 1. About the Project

This application enables patients to discover doctors, book appointments, and process online payments seamlessly. It features dedicated dashboards for three user roles—Patients, Doctors, and Administrators. By integrating modern web technologies with advanced AI capabilities, Mediconnect AI not only simplifies traditional appointment booking but also acts as an intelligent healthcare assistant, helping patients understand their symptoms, find the right specialists, and summarize their medical reports, while helping administrators predict no-shows and demand.

---

## 2. Features in Mediconnect AI

### Core Features
- **User Authentication:** Secure login and registration for Patients, Doctors, and Admins (using JWT).
- **Appointment Booking:** Seamlessly discover doctors, check real-time availability, and book slots.
- **Online Payments:** Integrated payment gateway (Razorpay/Stripe) for appointment fee collection.
- **Dedicated Dashboards:** Tailored views for patients (manage bookings), doctors (track earnings and schedule), and admins (platform oversight).
- **Profile Management:** Users and doctors can update their profiles and manage their data.

### 🤖 AI-Powered Features
- **AI Symptom Checker:** Patients can enter free-text symptoms to receive possible conditions, recommended specialist types, and urgency levels.
- **AI Chatbot Assistant:** A conversational assistant available on all patient pages to answer FAQs, guide the booking flow, and provide department suggestions.
- **AI Doctor Recommendation:** An intelligent algorithm that suggests doctors based on patient symptoms, doctor ratings, real-time availability, and past appointment history.
- **AI Medical Report Summarizer:** Allows patients to upload PDF medical reports to receive an AI-generated summary highlighting key observations, important metrics, and suggested next steps.
- **AI Appointment Prediction (Admin & Doctor):** Predicts peak booking hours, flags potential patient no-shows, and forecasts appointment demand across departments.

---

## 3. Tech Stack Used

The application is built on the **MERN Stack** and integrates various AI tools and third-party services:

### Frontend
- **Framework:** React.js (Bootstrapped with Vite)
- **Styling:** Tailwind CSS
- **Routing & State:** React Router, Context API
- **Charts:** Recharts / Chart.js (for Admin/Doctor prediction dashboards)

### Backend
- **Framework:** Node.js with Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **File Handling:** Multer

### AI & Third-Party Integrations
- **LLM API:** OpenAI GPT-4o API / Google Gemini API (for chatbots, symptom checking, summarization)
- **OCR:** `pdf-parse` and `Tesseract.js` (for extracting text from PDF reports)
- **Image Storage:** Cloudinary
- **Payments:** Razorpay / Stripe integration

---

## 4. How to Start the App

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine. You will also need API keys for Cloudinary, your chosen Payment Gateway, and your LLM provider (OpenAI/Gemini).

### Step 1: Clone the repository
```bash
git clone https://github.com/anirudhch7/mediconnect.git
cd mediconnect
```

### Step 2: Set up the Backend
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory based on the following template:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   OPENAI_API_KEY=your_openai_api_key
   AI_PROVIDER=openai # or gemini
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Step 3: Set up the Frontend (Patient App)
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

### Step 4: Set up the Admin Panel
1. Open another new terminal and navigate to the admin folder:
   ```bash
   cd admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## License

[MIT](LICENSE) — Please check the license file for more information.

---


## Author

Created by **@anirudhch7**.


You are all set! Open the respective local host links provided in your terminal to view the application.
