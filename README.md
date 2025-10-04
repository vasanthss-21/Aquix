Aquix - The Great Scam Escape
This project was bootstrapped with Create React App.

Live Demo: https://aquix-fe1b6.web.app/

Welcome to Aquix, an interactive web application designed to educate users about online scams in an engaging and gamified way. Through a series of narrative-driven stories, quizzes, and challenges, users learn to identify and avoid common fraud tactics, all while earning points and tracking their progress.

✨ Features
Interactive Story Mode: A narrative that guides users through various scam scenarios, combining animated scenes with decision-based quizzes.

Mastery Quiz: A dedicated quiz section to test scam awareness knowledge with a point-based scoring system.

User Authentication: Secure user registration and login functionality built with Firebase Authentication.

Personalized Dashboard: A user-specific dashboard that displays the user's name, email, and total accumulated points.

Fully Responsive Design: A mobile-first interface for a seamless experience on all devices.

Modern UI/UX: A sleek, dark-themed design with "glassmorphism" effects, smooth 3D transitions, and an animated mobile navigation menu.

🛠️ Tech Stack
Frontend: React.js

Backend & Database: Firebase (Authentication & Firestore)

Routing: React Router

Styling: CSS-in-JS within React components.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in the development mode.

Open http://localhost:3000 to view it in your browser.

The page will reload when you make changes.

You may also see any lint errors in the console.

npm test
Launches the test runner in the interactive watch mode.

See the section about running tests for more information.

npm run build
Builds the app for production to the build folder.

It correctly bundles React in production mode and optimizes the build for the best performance. Your app is ready to be deployed!

See the section about deployment for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project and copy all the configuration files (webpack, Babel, ESLint, etc.) into your project so you have full control over them.

📂 Project Structure
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

Learn More
You can learn more in the Create React App documentation. To learn React, check out the React documentation.
