
const User = require('../../models/Users');
const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');
const AdminProfile = require('../../models/AdminProfile');
const CompanyProfile = require('../../models/CompanyProfile');

const getUserById = async (req, res) => {
    try {
        console.log('req.query', req.query);
        var userId = req.query.userId;

        const val = await User.findById(userId);
        console.log('val', val);
        let userDetails;
        if (val.role == "student") {
            console.log('val.userId', val.userId);
            userDetails =await StudentProfile.findById(val.userId);
            console.log('userDetails', userDetails);
        }
        else if (val.role == "mentor") {
            console.log('val.userId', val.userId);
            userDetails =await MentorProfile.findById(val.userId);
        }
        else if (val.role == "admin") {
            userDetails = await AdminProfile.findById(val.userId);
        }
        else if (val.role == "company") {
            userDetails = await CompanyProfile.findById(val.userId);
        }
        else {
            res.send({ status: false, statusCode: 400, message: "User not found" });
        }
        res.send({ status: true, statusCode: 200, message: "User details found", data: userDetails });
    }
    catch (err) {
        console.log('err', err);
        res.send({ status: false, statusCode: 500, message: "User details not found" });
    }
}

module.exports = { getUserById };