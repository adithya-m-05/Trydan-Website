🏎️ Trydan Racing - Professional Telemetry System

This repository contains the complete software for the Trydan Racing Professional Telemetry System, an F1-grade, multi-part application designed for real-time race data analysis, AI-driven strategy, and driver performance optimization.

⚙️ System Overview

The system is composed of four primary components:

Public-Facing Website
A static, responsive website (index.htm, team.html) to showcase the team, achievements, and provide a login portal.

Node.js Web Server
A lightweight server (server.js) whose sole purpose is to host the private telemetry dashboard application.

Python AI/ML Backend
A powerful Flask API server (racing_api_server.py) that acts as the "brain" of the operation.
It ingests live data, performs complex calculations (optimal lap, tire wear, AI strategy), and serves insights via a REST API.

Dashboard Frontend
A sophisticated single-page application (public/index.html, public/script2.js) providing rich, multi-column visualization of all live and processed data for race engineers and drivers.

✨ Key Features
🧭 Dashboard & Visualization

Live Track Map: Real-time GPS tracking of the kart on a high-contrast map (powered by Leaflet.js).

Real-time Charts: Smooth, live-updating line graphs for metrics like Speed and RPM (via Chart.js).

F1-Style UI: Professional, multi-column layout inspired by top-tier racing telemetry systems.

Simulator Mode: Run a full simulation of a lap on the NMIT track (USE_LOCAL_DATA = true) for development and testing without a live kart.

🤖 AI & Analysis (Powered by Python Backend)

Optimal Lap Calculation: Logs sector times to calculate a theoretical perfect lap.

Live Delta Time: Displays real-time differences against the optimal lap (e.g., +0.2s or -0.1s).

AI Race Strategy: Provides real-time strategic advice based on lap number, tire wear, and pace.

Tire Status Prediction: Predicts tire grip levels, degradation, and optimal pit windows.

Driver Performance Score: Objective score (0–100) based on consistency, smoothness, and speed.

Corner-by-Corner Analysis: Identifies time loss per corner and gives actionable driver feedback.

🛠️ Tech Stack
Component	Technologies
AI Backend	Python 3, Flask (API), Pandas (Data Analysis)
Dashboard Server	Node.js, Express.js
Dashboard Frontend	HTML5, CSS3, Vanilla JavaScript (ES6+)
Visualization	Chart.js (graphs), Leaflet.js (maps)
Data Transport	MQTT (live data), REST API (frontend ↔ backend)
Public Website	HTML5, CSS3, Vanilla JavaScript
📁 Repository Structure
.
├── 📄 index.htm               # Main public website
├── 📄 team.html               # Public team page
├── 📄 login.html              # Public login page
├── 📄 styles.css              # CSS for public website
├── 📄 script.js               # JS for public website (hamburger menu, etc.)
│
├── 📄 server.js               # Node.js server to host the dashboard
├── 📄 racing_api_server.py    # Python Flask AI/ML API server
│
└── 📁 public/
    ├── 📄 index.html          # Dashboard HTML structure
    ├── 📄 style.css           # Dashboard CSS (green/black theme)
    └── 📄 script2.js          # Dashboard core logic

🚀 How to Run the System

This system requires two separate terminals to run simultaneously.

✅ Prerequisites

Node.js: Ensure Node.js (includes npm) is installed.

Python 3: Ensure Python and pip are installed.

⚡ Step 1: Install Dependencies

Node.js Dependencies:

# From the root project directory
npm install express


Python Dependencies:

# (Recommended) Use a virtual environment
# python -m venv venv
# source venv/bin/activate  (or .\venv\Scripts\activate on Windows)

pip install Flask flask-cors pandas


Note: racing_api_server.py imports racing_engine_gps_speed.
Ensure this file and its dependencies are present.

🧠 Step 2: Run the Backend Servers

You’ll need two terminals open in the root of the project directory.

🖥️ Terminal 1: Start Python AI/ML Server

This server runs the AI “brain” and provides data to the dashboard.

python racing_api_server.py


You should see output like:

Flask server running on http://localhost:5000

🌐 Terminal 2: Start Node.js Dashboard Server

This server hosts the dashboard web files.

node server.js


Expected output:

Server live on http://localhost:3000

🏁 Step 3: Access the Application

Public Website: Open index.htm directly in your browser.

Login: Navigate to login.html and enter credentials.

Dashboard: After login, you’ll be redirected to http://localhost:3000
.

🎮 Using the Dashboard
🔧 Simulator Mode (Default)

By default, public/script2.js has:

const USE_LOCAL_DATA = true;


This runs the NMIT track simulator — all data is generated locally in your browser.
Perfect for UI testing and development.

🛰️ Live Mode (Advanced)

To use live telemetry data:

Set:

const USE_LOCAL_DATA = false;


in public/script2.js.

Implement fetch logic to call your Python API, e.g.:

fetch('http://localhost:5000/api/dashboard')


Feed live telemetry from your kart (via MQTT) to the Flask endpoint:

/api/telemetry

🏆 Authors & Contributors

Trydan Racing Team – NMIT
🚗 Developed for real-time racing innovation and driver optimization.

 Website developed by : adithya-m-05, sujay-cj , mohdibrahim77
