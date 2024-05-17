const mongoose = require('mongoose');

// Define the schema for the user
const userSchema = new mongoose.Schema({
    // User's name
    name: {
        type: String,
        required: true
    },
    // User's email
    email: {
        type: String,
        required: true
    },
    // User's password
    password: {
        type: String,
        required: true
    }
});

// Export the user model
module.exports = mongoose.model('User', userSchema);
