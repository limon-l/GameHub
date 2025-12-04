🎮 GameHub - A Game Library

GameHub is an engaging, premium online library designed for gaming enthusiasts to discover, explore, and manage their favorite titles. Featuring a "posh" glassmorphism design, fluid animations, and robust functionality, GameHub offers a seamless experience for browsing curated games, viewing detailed specs, and managing a personal "Installed" collection.

🔗 Live Demo

🚀 Experience the app live: https://illustrious-lebkuchen-48c062.netlify.app/

✨ Key Features

🔐 Authentication & Security

Firebase Authentication: Robust login system supporting both Email/Password and Google Sign-In.

Protected Routes: Ensures user-specific pages (Game Details, Profile, Installed Games) are accessible only to authenticated users.

Password Reset: Functional "Forget Password" flow sending reset links via email.

Session Management: Automatic session handling with secure sign-out flows.

📂 Game Management (Firestore)

Personal Collection: Users can "Install" games, adding them to their unique list stored in Cloud Firestore (/artifacts/.../data).

Real-time Updates: Collection management works seamlessly across devices using real-time listeners.

Download Simulation: Realistic "downloading" progress bars before installation completes.

🌍 Discovery & Navigation

Dynamic Homepage:

Cinematic Banner: Full-screen Swiper.js carousel with fade effects and parallax backgrounds.

Animated Titles: "Typewriter" style headers with scrolling underlines.

Featured Sections: "Trending Genres", "Why Choose Us", and "Community Spotlight" with scroll-triggered entrance animations.

Advanced "Top Games" Page:

Multi-Filtering: Filter games by Category (Action, RPG, FPS, etc.).

Smart Sorting: Sort by Rating (High/Low) or Name (A-Z).

Live Search: Instant search results with debouncing.

💬 Community & Engagement

Community Hub: A dedicated page featuring an auto-scrolling 3D Coverflow slider of community posts and discussions.

Reviews Page: An interactive carousel showcasing user reviews and ratings.

Support Center: A helpful FAQ and support section for user assistance.

👤 User Experience

Advanced Profile Management:

Image Upload: Users can upload profile pictures directly to Firebase Storage or provide image links.

Profile Editing: Update display name and manage account details.

Posh UI/UX:

Glassmorphism: Frosted glass effects on cards, navbars, and forms.

Motion Design: Smooth page transitions and component appearances powered by Framer Motion.

Responsive: Fully optimized for mobile (with sliding drawer menu), tablet, and desktop.

Toast Notifications: Interactive alerts for actions like successful login, errors, or game installation.

🛠️ Tech Stack

Frontend Framework

React (Vite)

Styling

Tailwind CSS

DaisyUI (Component Library)

Backend & Database

Firebase Auth, Firestore & Storage

Libraries & Packages

📦 Routing: react-router-dom

🎨 Animations: framer-motion

🖼️ Slider: swiper

🔔 Notifications: react-toastify

🧠 Head Management: react-helmet-async

✨ Icons: react-icons

🚀 Getting Started

Follow these steps to run the project locally on your machine.

Prerequisites

Node.js (v16 or higher)

npm or yarn

Installation

Clone the repository

git clone [https://github.com/your-username/gamehub.git](https://github.com/your-username/gamehub.git)
cd gamehub


Install dependencies

npm install


Configure Environment Variables
Create a .env.local file in the root directory and add your Firebase configuration keys:

VITE_APIKEY=your_api_key
VITE_AUTHDOMAIN=your_auth_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucket
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=your_app_id


Run the development server

npm run dev


Open your browser and navigate to http://localhost:5173.

📂 Project Structure

GameHub/
├── public/              # Static assets (games.json, logos)
├── src/
│   ├── components/      # Reusable UI (Navbar, Footer, GameCard, AnimatedTitle)
│   ├── context/         # AuthProvider, GameProvider
│   ├── firebase/        # Firebase initialization (Auth, DB, Storage)
│   ├── layouts/         # Main layout wrappers
│   ├── pages/           # Views (Home, TopGames, Profile, GameDetails, etc.)
│   ├── routes/          # Router configuration and Private Routes
│   └── main.jsx         # Entry point
├── .env.local           # Environment variables (not committed)
└── index.html


🔮 Future Improvements

Dark Mode Toggle: Implement a system-wide theme switcher.

User Reviews: Allow users to leave actual text reviews on game details pages.

Social Sharing: Add buttons to share game details on social media.

📝 License

This project is open-source and available under the MIT License.
