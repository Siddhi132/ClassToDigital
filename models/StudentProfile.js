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
    type: String,
    default: "Na"
  },
  education: {
    type: String,
    default: "Na"

  },
  stream: {
    type: String,
    default: "Na"

  },
  description: {
    type: String,
    default: "NA"
  },
  college: {
    type: String,
    default: "Na"

  },
  university: {
    type: String,
    default: "Na"

  },
  branch: {
    type: String,
    default: "Na"

  },
  semester: {
    type: Number,
  },
  state: {
    type: String,
    default: "Na"

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
    internshipId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'hired', 'rejected'],
    }
  }],

  industrialProjects: [{
    industrialProjectId: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'hired', 'rejected'],
    }
  }],

  sellProducts: [{
    type: Array,
  }],

  mentor: [{
    type: Array,
  }],

  projectRepository: [{
    type: Array,
  }],

  researchPapers: [{
    type: Array,
  }],

  resume: {
    name: {
      type: String,
    },
    path: {
      type: String,
    }
  },
  resumeIDP: {
    name: {
      type: String,
    },
    path: {
      type: String,
    }
  },
  profileImage: {
    name: {
      type: String,
      default: "Default Avatar"
    },
    path: {
      type: String,
      default: "\\images\\profile\\defaultAvatar.png"
    }
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


