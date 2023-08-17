const User = require('../../models/Users');
const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');
const AdminProfile = require('../../models/AdminProfile');
const CompanyProfile = require('../../models/CompanyProfile');


const verifyUserForSignup = async (req, res) => {
  try {
    var existingUser;
    var user;
    const { email, role, phone } = req.body;
    console.log("req.body", req.body);

    if (role == 'student') {
      existingUser = await User.find({
        $or: [
          { email },
          { phone },
        ]
      });
    } else if (role == 'mentor') {
      existingUser = await User.findOne({
        $or: [
          { email },
          { phone },
        ]
      });
    } else if (role == 'admin') {
      existingUser = await User.findOne({
        $or: [
          { email },
          { phone },
        ]
      });
    } else if (role == 'company') {
      existingUser = await User.findOne({
        $or: [
          { email },
          { phone },
        ]
      });
    }


    if (existingUser > 0) {
      return res.send({ status: true, statusCode: 400, message: 'A user with this email already exists.' });
    }
    if (role == 'student') {
      user = new StudentProfile(req.body);
    }
    else if (role == 'mentor') {
      user = new MentorProfile(req.body);
    }
    else if (role == 'admin') {
      user = new AdminProfile(req.body);
    }
    else if (role == 'company') {
      user = new CompanyProfile(req.body);
    }

    await user.save();
    var UserData = {
      "userId": user._id,
      "userEmail": email,
      "userPhone": phone,
      "role": role
    }
    var userDataForUserSchema = new User(UserData);
    await userDataForUserSchema.save();
    console.log("userData", userDataForUserSchema);
    res.send({ status: true, statusCode: 200, message: 'User created successfully.' });
  }
  catch (error) {
    console.log("error this is ", error);
    res.send({ status: false, statusCode: 500, message: 'Error during creating user. ' });
  }
}


module.exports = { verifyUserForSignup };
