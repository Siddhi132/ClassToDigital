const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentProfileSchema = new mongoose.Schema({
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
  education: {
    type: String
  },
  stream: {
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
  semester: {
    type: Number
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
    type:Array,
    
  }],
  industrialProjects: [{
    type:Array,
    
  }],

  sellProducts: [{
    type:Array,
  }],

  projectRepository: [{
    type:Array,
  }],

  researchPapers: [{
    type:Array,
  }],

  resume: {
    type: String
  },
  notifications: [{
    notification: {
      type: String
    },
    notificationtype: {
      type: String
    },
    
  }],

  
});

// Hash the password before saving the user to the database
studentProfileSchema.pre('save', async function (next) {
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
studentProfileSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
}

const studentProfile = mongoose.model('studentProfile', studentProfileSchema);

module.exports = studentProfile;
