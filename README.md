🏎️ Trydan Racing - Professional Telemetry System

This repository contains the complete software for the Trydan Racing Professional Telemetry System, an F1-grade, multi-part application designed for real-time race data analysis, AI-driven strategy, and driver performance optimization.

The system is composed of four primary components:

Public-Facing Website: A static, responsive website (index.htm, team.html) to showcase the team, achievements, and provide a login portal.

Node.js Web Server: A lightweight server (server.js) whose sole purpose is to host the private telemetry dashboard application.

Python AI/ML Backend: A powerful Flask API server (racing_api_server.py) that acts as the "brain" of the operation. It ingests live data, performs all complex calculations (optimal lap, tire wear, AI strategy), and serves these insights via a REST API.

Dashboard Frontend: A sophisticated single-page application (public/index.html, public/script2.js) that provides a rich, multi-column visualization of all live and processed data for race engineers and drivers.

✨ Key Features

Dashboard & Visualization

Live Track Map: Real-time GPS tracking of the kart on a high-contrast map, powered by Leaflet.js.

Real-time Charts: Smooth, live-updating line graphs for critical metrics like Speed and RPM, using Chart.js.

F1-Style UI: A professional, multi-column layout inspired by top-tier racing systems.

Simulator Mode: Run a full simulation of a lap on the NMIT track with USE_LOCAL_DATA = true for development and testing without a live kart.

AI & Analysis (Powered by Python Backend)

Optimal Lap Calculation: Automatically logs all sector times to calculate a theoretical "perfect lap" for the driver to chase.

Live Delta Time: Shows a real-time (e.g., +0.2s or -0.1s) comparison against the calculated optimal lap.

AI Race Strategy: Provides real-time strategic advice based on lap number, tire wear, and pace.

Tire Status Prediction: Analyzes data to predict tire grip levels, degradation, and optimal pit windows.

Driver Performance Score: Generates an objective score (0-100) based on consistency, smoothness, and speed.

Corner-by-Corner Analysis: Identifies specific corners where the driver is losing time and provides actionable advice.

🛠️ Tech Stack

AI Backend: Python 3, Flask (for API), Pandas (for data analysis)

Dashboard Server: Node.js, Express.js

Dashboard Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)

Visualization: Chart.js (graphs), Leaflet.js (maps)

Data Transport: MQTT (for live data ingestion), REST API (between frontend and backend)

Public Website: HTML5, CSS3, Vanilla JavaScript

📁 Repository Structure

.
├── 📄 index.htm               # Main public website
├── 📄 team.html                 # Public team page
├── 📄 login.html                # Public login page
├── 📄 styles.css                # CSS for public website
├── 📄 script.js                 # JS for public website (hamburger menu, etc.)
|
├── 📄 server.js                 # Node.js server to host the dashboard
├── 📄 racing_api_server.py    # Python Flask AI/ML API server
|
└── 📁 public/
    ├── 📄 index.html            # The dashboard's HTML structure
    ├── 📄 style.css             # The dashboard's CSS (green/black theme)
    └── 📄 script2.js            # The dashboard's core application logic


🚀 How to Run the System

This system requires two separate terminals to run simultaneously.

Prerequisites

Node.js: Ensure you have Node.js (which includes npm) installed.

Python: Ensure you have Python 3 and pip installed.

Step 1: Install Dependencies

Node.js Dependencies:

# From the root project directory
npm install express


Python Dependencies:

# We recommend using a virtual environment
# python -m venv venv
# source venv/bin/activate  (or .\venv\Scripts\activate on Windows)

pip install Flask flask-cors pandas
# Note: racing_api_server.py imports 'racing_engine_gps_speed',
# ensure this file is present and any of its dependencies are installed.


Step 2: Run the Backend Servers

You must have two terminals open in the root of the project directory.

Terminal 1: Start the Python AI/ML Server

This server runs the "brain" and provides data to the dashboard.

python racing_api_server.py


You should see output indicating the Flask server is running on http://localhost:5000.

Terminal 2: Start the Node.js Dashboard Server

This server provides the dashboard's web files to your browser.

node server.js


You should see output indicating the server is live on http://localhost:3000.

Step 3: Access the Application

Public Website: You can open index.htm directly in your browser.

Login: Navigate to login.html and enter the credentials.

Access Dashboard: After a successful login, you will be redirected to http://localhost:3000. The dashboard will load.

Using the Dashboard

Simulator Mode (Default): As-is, public/script2.js has USE_LOCAL_DATA = true. This runs the built-in NMIT track simulator. All data is generated locally in your browser. This is perfect for testing the UI.

Live Mode (Advanced): To use live data, you must:

Set USE_LOCAL_DATA = false in public/script2.js.

Implement the fetch logic in script2.js to call your Python API endpoints (e.g., fetch('http://localhost:5000/api/dashboard')).

Feed live telemetry data from your kart (e.g., via MQTT) to the racing_api_server.py's /api/telemetry endpoint.


 Website developed by : adithya-m-05, sujay-cj , mohdibrahim77
