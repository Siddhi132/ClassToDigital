const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminProfileSchema = new mongoose.Schema({
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
  
  date: {
    type: Date,
    default: Date.now
  },
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

// Hash the password before saving the user to the database
AdminProfileSchema.pre('save', async function (next) {
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
AdminProfileSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
}

const adminProfile = mongoose.model('adminProfile', AdminProfileSchema);

module.exports = adminProfile;
