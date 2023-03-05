const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    education: {
        type: String
    },
    college: {
        type: String
    },
    university: {
        type: String
    },
    branch: {
        type: String
    },

    background: {
        type: String
    },
    location: {
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
    AreaOfIntrest: {
        type: String,
        default: 0
    },

    Specialization: {
        type: String,
        default: 0
    },
    InstagramLink: {
        type: String
    },
    LinkedInLink: {
        type: String
    },
    TwitterLink: {
        type: String
    },
    FacebookLink: {
        type: String
    },
    mentee: [{
        type: Array,

    }],
    researchPaper: [{
        type: Array,

    }],

    sellProducts: [{
        type: Array,
    }],

    projectRepository: [{
        type: Array,
    }],
    notifications: [{
        notification: {
          type: String
        },
        notificationtype: {
          type: String
        },
        
      }],



});

// password: {
//   type: String,
//   required: true
// },


// Hash the password before saving the user to the database
mentorSchema.pre('save', async function (next) {
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
mentorSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (err) {
        throw new Error(err);
    }
}

const MentorProfile = mongoose.model('MentorProfile', mentorSchema);
module.exports = MentorProfile;