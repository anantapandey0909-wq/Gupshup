# Gup Shup Cafe - Backend & Deployment Guide

You previously had a completely **Frontend-only** project. I have just added a **Node.js + Express backend** for you! 

We created:
1. `server.js` - A backend file that serves your frontend pages and provides an API endpoint (`/api/order`) to handle orders.
2. `package.json` - Configuration and dependencies for the backend.
3. Updated `order.js` - Connected the checkout button to actually send data to the backend.

---

## 1. Running Locally 

Before deploying, you'll need to run this on your own machine. From my check, your computer does not seem to have **Node.js** installed (or it may not be in your terminal's PATH).

1. Download and install [Node.js](https://nodejs.org/).
2. Once installed, open a fresh terminal in your project folder (`c:\Users\asus\OneDrive\Desktop\gupshup-cafe`).
3. Run the following command to download the packages (`express` and `cors`):
   ```bash
   npm install
   ```
4. Start your new backend server:
   ```bash
   npm start
   ```
5. Open your browser and go to `http://localhost:3000`. When you place an order, the terminal will log out the order details!

---

## 2. Pushing to GitHub
To deploy your application, you must first upload the code to GitHub.

1. Go to [GitHub](https://github.com/) and create a new repository.
2. Open your terminal in the project folder and run:
   ```bash
   git init
   git add .
   git commit -m "Added Node.js backend"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

---

## 3. Deploying the Website

Since the app now contains a backend server, standard static hosting (like GitHub Pages) will not work. 
We recommend using **Render**, which has a great free tier for full-stack Node.js apps.

### Deploying on Render (Free & Easy)
1. Go to [Render.com](https://render.com/) and sign up.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your `gupshup-cafe` repository.
4. Render will automatically detect that it is a Node.js environment. Set the following settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Click **Create Web Service**. 
6. Render will download your code, install dependencies, and give you a live public URL (e.g., `https://gupshup-cafe.onrender.com`).

*(Note: The first time a free Render app boots up after being asleep, it may take ~50 seconds, which is normal for their free tier).*
