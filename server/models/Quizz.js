const mongoose = require('mongoose'); // Import mongoose for MongoDB interactions

// Define the schema for the quiz
const quizzSchema = new mongoose.Schema({
    // Name of the quiz
    quizzName: {
        type: String,
        required: true // Quiz name is required
    },
    // Type of the quiz: can be "Poll" or "Q&A"
    quizzType: {
        type: String,
        enum: ["Poll", "Q&A"], // Allowed values for quiz type
        required: true // Quiz type is required
    },
    // Array of ObjectIds referencing questions related to the quiz
    questions: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Question" // Reference to the 'Question' model
        }],
        validate: {
            validator: function(lth) {
                // Validate that the number of questions is between 1 and 5
                return lth.length >= 1 && lth.length <= 5;
            }
        },
        required: true // Questions array is required
    },
    // Number of impressions/views the quiz has received
    impression: {
        type: Number,
        default: 0 // Default value for impressions is 0
    },
    // Timer setting for the quiz: 'OFF', '5' minutes, or '10' minutes
    timer: {
        type: String,
        enum: ['OFF', '5', '10'], // Allowed values for timer
        default: 'OFF' // Default timer setting is 'OFF'
    },
    // Creator of the quiz
    createdBy: {
        type: String,
        required: true // Creator information is required
    }
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

// Export the schema as a Mongoose model
module.exports = mongoose.model('Quizz', quizzSchema);
