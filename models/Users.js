const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail:{
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
    },

    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;