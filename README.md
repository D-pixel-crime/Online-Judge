# ThinkXCode 💻

ThinkXCode Online Judge is a platform for compiling and executing code submissions in various programming languages. It provides a seamless interface for users to submit their code, test it against various test cases, and receive feedback in real-time.

!["ThinkXCode" Online Judge Screenshot](Frontend-OJ/src/assets/thinkxcode.png)

## Table of Contents 📑

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contact](#Contact)

## Features ✨

- **Multi-language Support**: Supports popular programming languages like C++, Python, and JavaScript.
- **Real-time Execution**: Executes code submissions and provides real-time feedback.
- **User Authentication**: Secure user registration and login.
- **Test Case Management**: Ability to create and manage test cases.
- **Result Evaluation**: Automatically evaluates submissions and provides detailed results.
- **Responsiveness**: Never be limited for not having large screen devices.

## Tech Stack 🛠️

- **Frontend**: React.js, hosted on Vercel
- **Backend**: Node.js, Express.js, hosted on AWS
- **Containerization**: Docker
- **Database**: MongoDB
- **Languages Supported**: C++, Python, JavaScript

## Getting Started 🚀

Follow these instructions to set up and run "ThinkXCode" Online Judge on your local machine for development and testing purposes.

### Prerequisites 🔧

- Node.js (v18 or later)
- Docker
- MongoDB

### Installation 📥

1. **Clone the repository:**

   ```sh
   git clone https://github.com/D-pixel-crime/Online-Judge.git
   cd Online-Judge
   ```

2. **Install frontend dependencies:**

   ```sh
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**

   ```sh
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   OJ_FRONTEND_URI = http://localhost:5173
   MONGO_URI = your_mongodb_uri
   JWT_SECRET = your_jwt_secret
   DOMAIN = If_u_have_a_domain
   ```

   If you have a domain, then uncomment the secure fetching and domain in login and register

   Create a `.env` file in the `backend` directory and add the following:

   ```plaintext
   VITE_OJ_BACKEND_URI = http://localhost:3000
   DOMAIN = If_u_have_a_domain
   ```

   If you have a domain, then uncomment the secure fetching and domain in profile

5. **Build and start the Docker containers:**

   Go to the `backend` directory and type the following in the terminal, and replace `<image_name>` with your convenient image name:

   ```sh
   docker build -t <image_name>
   ```

## Usage ⚙️

1. **Frontend:**

   Run the frontend development server:

   ```sh
   cd frontend
   npm run dev
   ```

2. **Backend:**

   Run the backend server:

   ```sh
   docker run -it -d -p 3000:3000 <image_name>
   ```

3. **Access the application:**

   Open your browser and navigate to `http://localhost:5173` for the frontend and `http://localhost:3000` for the backend API.

## Contact 📞

Mail me - [dpk4383@gmail.com](mailto:dpk4383@gmail.com)

Project Link: [https://github.com/D-pixel-crime/Online-Judge](https://github.com/D-pixel-crime/Online-Judge)
