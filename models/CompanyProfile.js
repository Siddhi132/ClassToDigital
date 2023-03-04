const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companyProfileSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },

    state: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    rewardPoints: {
        type: Number,
        default: 0
    },
    internships: [{
        type: Array,

    }],
    industrialProjects: [{
        type: Array,

    }],
    category: {
        type: String
    },
    description: {
        type: String
    }




});

// Hash the password before saving the user to the database
companyProfileSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// Compare the entered password with the hashed password in the database
companyProfileSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error(err);
    }
}

const companyProfile = mongoose.model('companyProfile', companyProfileSchema);

module.exports = companyProfile;
