const mongoose = require('mongoose');

// Define the schema for the question
const questionSchema = new mongoose.Schema({
    // Description of the question
    description: {
        type: String,
        required: true
    },
    // Type of options: 'text', 'imageurl', or 'text&imageurl'
    optionType: {
        type: String,
        enum: ['text', 'imageurl', 'text&imageurl'],
        required: true
    },
    // Text option (required for 'text' and 'text&imageurl' types)
    text: {
        type: String,
        required: function() {
            return this.optionType === 'text&imageurl' || this.optionType === 'text';
        }
    },
    // Image URL option (required for 'imageurl' and 'text&imageurl' types)
    imageurl: {
        type: String,
        required: function() {
            return this.optionType === 'text&imageurl' || this.optionType === 'imageurl';
        }
    },
    // Index of the correct option (0-indexed)
    correctOption: {
        type: Number,
        required: true
    },
    // Timer setting for the question: 'OFF', '5', or '10' (default is 'OFF')
    timer: {
        type: String,
        enum: ['OFF', '5', '10'],
        default: 'OFF'
    }
}, { timestamps: true }); // Adds timestamps for createdAt and updatedAt

// Export the schema
module.exports = mongoose.model('Question', questionSchema);
