const mongoose = require('mongoose');

// Define the schema for the quiz
const quizzSchema = new mongoose.Schema({
    // Name of the quiz
    quizzName: {
        type: String,
        required: true
    },
    // Type of the quiz: can be "Poll" or "Q&A"
    quizzType: {
        type: String,
        enum: ["Poll", "Q&A"],
        required: true
    },
    // For "Poll" type quizzes: Array of selected options with their counts
    selectedOptions: [{
        option: String, // The option text
        count: {
            type: Number,
            default: 0 // Default count is 0
        }
    }],
    // For "Q&A" type quizzes: Total number of questions answered
    totalAnswered: {
        type: Number,
        default: 0 // Default is 0
    },
    // For "Q&A" type quizzes: Total number of correctly answered questions
    correctAnswered: {
        type: Number,
        default: 0 // Default is 0
    },
    // For "Q&A" type quizzes: Total number of incorrectly answered questions
    incorrectAnswered: {
        type: Number,
        default: 0 // Default is 0
    },
    // Array of ObjectIds referencing questions related to the quiz
    questions: [{
        type: mongoose.Types.ObjectId,
        ref: "question" // Reference to the 'question' model
    }],
    // Number of impressions/views the quiz has received
    impression: {
        type: Number,
        default: 0 // Default is 0
    },
    // Creator of the quiz
    createdBy: {
        type: String,
        required: true
    }
}, { timestamps: true }); // Adds timestamps for createdAt and updatedAt

// Export the schema
module.exports = mongoose.model('Quizz', quizzSchema);
