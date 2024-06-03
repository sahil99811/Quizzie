const express = require('express'); // Import the Express module
const app = express(); // Create an instance of an Express app
const { dbConnect } = require('./config/databaseConnect'); // Import the database connection function
const authRoutes = require('./routes/Auth'); // Import authentication routes
const quizRoutes = require('./routes/Quizz'); // Import quiz routes
const dotenv = require('dotenv'); // Import dotenv for environment variables
const cors = require('cors'); // Import CORS middleware

dotenv.config(); // Load environment variables from a .env file

app.use(express.json()); // Middleware to parse JSON bodies

// Use CORS middleware
app.use(cors());

// Optionally, configure CORS options
app.use(cors({
  origin: `${process.env.FRONTEND_BASE_URL}`, // Allow requests from any origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  
}));

// Use authentication routes, prefixed with /api/v1/auth
app.use('/api/v1/auth', authRoutes);

// Use quiz routes, prefixed with /api/v1/quiz
app.use('/api/v1/quiz', quizRoutes);

// Connect to the database
dbConnect()
    .then(() => {
        console.log("Database connected successfully");

        // Start the server on the port defined in environment variables
        const server = app.listen(process.env.PORT, () => {
            console.log("Server is started");
        });

        // Handle server startup errors
        server.on('error', (error) => {
            console.error("Server failed to start:", error);
            process.exit(1); // Exit the process with a failure code
        });
    })
    .catch((error) => {
        console.error("DB Connection Failed:", error);
        process.exit(1); // Exit the process with a failure code
    });
