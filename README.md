
# Quizzie Application

Quizzie is a MERN stack-based web application that allows users to create quizzes and polls with multiple question formats. Users can share a public link with students or anyone to take the quiz or poll and view detailed analytics on the results.

## Features
- Create quizzes and polls with different question types:
  - Photo options
  - Photo + text options
  - Text-only questions
- Share public links to quizzes or polls for others to participate.
- View analytics on the dashboard, including how many participants answered questions correctly.
- See detailed quiz results in a table format.

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Tailwind CSS (or any other styling used)
  
## How to Use

1. **Create an Account**:
   - Sign up with your email and password to create an account.
   
2. **Login**:
   - Use your credentials to log in to the dashboard.

3. **Dashboard**:
   - On the dashboard, view detailed analytics for quizzes and polls, including:
     - How many students or participants took the quiz/poll.
     - How many participants answered each question correctly.
     - Poll results.

4. **Create a Quiz or Poll**:
   - Navigate to the "Create Quiz" or "Create Poll" section.
   - Add questions with your choice of:
     - Photo options
     - Photo + text options
     - Text-only questions
   - After creating the quiz/poll, share the public link generated with your participants.

5. **View Analytics**:
   - After participants take the quiz or poll, view results in the form of tables, showing detailed analytics like the number of correct answers for each question.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sahil99811/quizzie-application.git
   ```

2. **Install dependencies**:
   Navigate to the root directory and install the backend and frontend dependencies:
   ```bash
   cd quizzie-application
   npm install
   cd client
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory with the following variables:
   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   Open two terminals:
   - For the backend:
     ```bash
     npm run server
     ```
   - For the frontend:
     ```bash
     npm start
     ```

5. **Access the application**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`
