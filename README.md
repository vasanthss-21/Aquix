# 🕵️‍♂️ Aquix - The Great Scam Escape  

[![Live Demo](https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-brightgreen)](https://aquix-fe1b6.web.app/)  
[![React](https://img.shields.io/badge/Frontend-React.js-blue?logo=react)](https://reactjs.org/)  
[![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?logo=firebase)](https://firebase.google.com/)  
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)  

> 🎮 **Aquix** is an **interactive web application** designed to **educate users about online scams** in a fun, gamified way!  
Through **stories, quizzes, and challenges**, users sharpen their scam-detection skills — all while earning points and tracking progress.  

---

## ✨ Features  

✅ **Interactive Story Mode** – Narrative-driven scam scenarios with decision-based quizzes.  
✅ **Mastery Quiz** – Dedicated quiz mode to test your fraud awareness.  
✅ **User Authentication** – Secure signup/login using **Firebase Authentication**.  
✅ **Personalized Dashboard** – Track your name, email, and total accumulated points.  
✅ **Fully Responsive** – Optimized for **mobile-first** seamless experience.  
✅ **Modern UI/UX** – Sleek **dark theme** with **glassmorphism effects**, **smooth 3D transitions**, and an **animated mobile nav menu**.  

---

## 🛠️ Tech Stack  

- ⚛️ **Frontend**: [React.js](https://reactjs.org/)  
- 🔥 **Backend & Database**: [Firebase (Auth + Firestore)](https://firebase.google.com/)  
- 🛣️ **Routing**: React Router  
- 🎨 **Styling**: CSS-in-JS inside React components  

---

## 📂 Project Structure  

```bash
└───src
    │   App.css
    │   App.js
    │   App.test.js
    │   firebase.js
    │   index.css
    │   index.js
    │   logo.svg
    │   reportWebVitals.js
    │   setupTests.js
    │
    ├───components
    │       Navbar.js
    │       ProtectedRoute.js
    │
    ├───contexts
    │       UserContext.js
    │
    └───pages
            AudioChallenge.js
            Dashboard.js
            Home.js
            Login.js
            Quiz.js
            StoryLevel.js
            styles.css
