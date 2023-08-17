const User=require('../../models/Users');
const StudentProfile=require('../../models/StudentProfile');
const MentorProfile=require('../../models/MentorProfile');
const AdminProfile=require('../../models/AdminProfile');
const CompanyProfile=require('../../models/CompanyProfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { checkOTP } = require('../Common/otp');

const verifyUserForLogin = async (req, res) => {
  var user;
  try {
    const { email, password, phone, otp } = req.body;
    var role;

    if (phone && otp) {
      // Check if the OTP is valid
      const isValidOTP = await checkOTP(phone, otp);
      if (!isValidOTP) {
        return res.send({ status: true, statusCode: 400, message: 'Invalid OTP.' });
      }
      // Find the user by phone number
      var userData = await User.findOne({ userPhone: phone });
      console.log("userData", userData);
      if (userData) {
        role = userData.role;
      }
      else {
        return res.send({ status: true, statusCode: 400, message: 'Invalid phone number.' });
      }
      console.log("role", role);
      if (role == "mentor") {
        user = await MentorProfile.findOne({ phone });
      }
      else if (role == "student") {
        user = await StudentProfile.findOne({ phone });
      }
      else if (role == "admin") {
        user = await AdminProfile.findOne({ phone });
      }
      else if (role == "company") {
        user = await CompanyProfile.findOne({ phone });
      }
      console.log('user', user);

      let token = jwt.sign({
        _id: user._id, role: user.role, email: user.email
      }, process.env.JWT_SECRET);

      res.send({ status: true, statusCode: 200, "data": { "user": user, 'token': token }, 'message': 'Logged in successfully.' });
    }
    else {
      // find role from email from user schema
      var userData = await User.findOne({ userEmail: email });
      console.log("userData", userData);
      if (userData) {
        role = userData.role;
      }
      else {
        return res.send({ status: true, statusCode: 400, message: 'Invalid email' });
      }
      console.log("role", role);
      if (role == "mentor") {
        user = await MentorProfile.findOne({ email });
      }
      else if (role == "student") {
        user = await StudentProfile.findOne({ email });
      }
      else if (role == "admin") {
        user = await AdminProfile.findOne({ email });
      }
      else if (role == "company") {
        user = await CompanyProfile.findOne({ email });
      }
      console.log('user', user);

      const isMatch = await bcrypt.compare(password, user.password);
      // console.log('isMatch', isMatch);
      // If the password does not match, return an error
      if (!isMatch) {
        // console.log('password does not match');
        return res.send({ status: true, statusCode: 400, message: 'Invalid password.' });
      }
      // If the email and password match, generate a JSON web token
      let token = jwt.sign({
        _id: user._id, role: user.role, email: user.email
      }, process.env.JWT_SECRET);
      res.send({ status: true, statusCode: 200, "data": { "user": user, 'token': token }, 'message': 'Logged in successfully.' });
    }
  } catch (error) {
    console.log('error', error);
    res.send({ status: false, statusCode: 500, message: 'Error during login. ' });
  }
};



module.exports = { verifyUserForLogin };