const express = require('express'); // Import the Express module
const {
    createQuizz,
    getTrendingQuizzs,
    getQuizzsAnalysis,
    getQuizzAnalysis,
    deleteQuiz,
    getQuizDetails,
    updateQuiz,
    quizTest,
    submitTest
} = require('../controllers/Quizz'); // Import the quiz controller functions
const { auth } = require('../middlewares/Auth'); // Import the authentication middleware

const router = express.Router(); // Create a new router object

// Route for creating a new quiz, requires authentication
router.post('/createQuiz', auth, createQuizz);

// Route for getting trending quizzes, requires authentication
router.get("/trendingQuiz", auth, getTrendingQuizzs);

// Route for getting analysis of all quizzes, requires authentication
router.get('/analysis', auth, getQuizzsAnalysis);

// Route for getting analysis of a specific quiz by its ID, requires authentication
router.get('/analysis/:quizId', auth, getQuizzAnalysis);

// Route for deleting a specific quiz by its ID, requires authentication
router.delete('/delete/:quizId', auth, deleteQuiz);

// Route for getting details of a specific quiz by its ID, requires authentication
router.get('/quizDetails/:quizId', auth, getQuizDetails);

// Route for updating a specific quiz by its ID, requires authentication
router.patch("/update/:quizId", auth, updateQuiz);

// Route for getting the quiz test by its ID, does not require authentication
router.get("/quizTest/:quizId", quizTest);

// Route for submitting the quiz test, does not require authentication
router.post('/submitTest', submitTest);

// Export the router object so it can be used in other parts of the application
module.exports = router;
