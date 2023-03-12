const User=require('../../models/Users');
const StudentProfile=require('../../models/StudentProfile');
const MentorProfile=require('../../models/MentorProfile');
const AdminProfile=require('../../models/AdminProfile');
const CompanyProfile=require('../../models/CompanyProfile');

const verifyUserForSignup =  async (req, res) => {
    try {
      var existingUser;
      var user;
      const {email,role } = req.body;
        console.log("req.body",req.body);

      if (role == 'student') {
        existingUser = await StudentProfile.findOne({ email });
      }
      else if (role == 'mentor') {
        existingUser = await MentorProfile.findOne({ email });
      }
      else if (role == 'admin') {
        existingUser= await AdminProfile.findOne({ email });
      }
      else if (role == 'company') {
        existingUser= await CompanyProfile.findOne({ email });
      }
      
      
      if (existingUser) {
        return res.send({ status:true,statusCode:400,message: 'A user with this email already exists.' });
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
       var UserData={
        "userId":user._id,
        "userEmail":email,
        "role":role
       }
       var userDataForUserSchema = new User(UserData);
       await userDataForUserSchema.save();
       console.log("userData",userDataForUserSchema);
      res.send({ status:true,statusCode:200,message: 'User created successfully.' });
    } catch (error) {
      console.log("error this is ", error);
      res.send({status:false,statusCode:500, message: 'Error during creating user. ' });
    }
}


module.exports = { verifyUserForSignup };