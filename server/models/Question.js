const mongoose = require('mongoose'); // Import mongoose for database interactions

// Define the sub-schema for the options
const optionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: function() {
            // Require text field if optionType is 'textimage' or 'text'
            return this.optionType === 'textImage' || this.optionType === 'text';
        },
        default: "" // Default value for text field
    },
    imageurl: {
        type: String,
        required: function() {
            // Require imageurl field if optionType is 'textimage' or 'image'
            return this.optionType === 'textImage' || this.optionType === 'image';
        },
        default: "" // Default value for imageurl field
    }
});

// Define the main schema for the question
const questionSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true // Description is required
    },
    optionType: {
        type: String,
        enum: ['text', 'image', 'textImage'], // Allowed values for optionType
        required: true // optionType is required
    },
    options: {
        type: [optionSchema], // Array of options using the sub-schema
        validate: {
            validator: function(lth) {
                // Validate that the number of options is between 2 and 4
                return lth.length >= 2 && lth.length <= 4; 
            },
        },
        required: true // Options are required
    },
    selectedOptions: {
        option1: {
            type: Number,
            default: 0 // Default value for option1 count
        },
        option2: {
            type: Number,
            default: 0 // Default value for option2 count
        },
        option3: {
            type: Number,
            default: 0 // Default value for option3 count
        },
        option4: {
            type: Number,
            default: 0 // Default value for option4 count
        }
    },
    correctAnswered: {
        type: Number,
        default: 0 // Default value for correct answers count
    },
    incorrectAnswered: {
        type: Number,
        default: 0 // Default value for incorrect answers count
    },
    correctOption: {
        type: Number,
        required: true // correctOption is required
    },
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps


// Export the model
module.exports = mongoose.model('Question', questionSchema);
