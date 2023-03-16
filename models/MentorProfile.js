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
        required: true,
        default: "NA"
    },
    education: {
        type: String,
        default: "NA"

    },
    college: {
        type: String,
        default: "NA"

    },
    university: {
        type: String,
        default: "NA"

    },
    branch: {
        type: String,
        default: "NA"

    },
   

    background: {
        type: String,
        default: "NA"

    },
    location: {
        type: String,
        default: "NA"

    },
    date: {
        type: Date,
        default: Date.now
    },
    rewardPoints: {
        type: Number,
        default: 0
    },
    typeOfMentor: {
        type: String,
        default: "NA"
    },
    AreaOfIntrest: {
        type: String,
        default: "NA"
    },

    Specialization: {
        type: String,
        default: "NA"
    },
    description: {
        type: String,
        default: "NA"
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
    researchPapers: [{
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
      profileImage: {
        name: {
          type: String,
          default: "Default Avatar"
        },
        path: {
          type: String,
          default: "\\images\\profile\\defaultAvatar.png"
        }
      }



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