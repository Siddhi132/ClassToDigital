const StudentProfile = require('../../models/StudentProfile');
// const IndustrialProjects = require('../models/industrialProject');
// const sellProduct = require('../models/sellProduct');

// const Internship = require('../models/internship');
// const User = require('../../models/Users');
const MentorProfile = require('../../models/MentorProfile');
const AdminProfile=require('../../models/AdminProfile');
const CompanyProfile=require('../../models/CompanyProfile');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');


const showProfile = async (req, res) => {
    console.log('req.query', req.query);
    var id = req.query.id;
    var role = req.query.role;
    console.log('id 1', id);
    console.log('role 1', role);

    if (role == "student") {

        console.log('id 2', id);
        var userDetails = await StudentProfile.findById(id);
        console.log('userDetails', userDetails);
        var internshipData = {};
        var industrialProjectData = {};
        var sellProductData = {};
        var projectRepoData = {};
        var researchPaperData = {};

        // if (userDetails.internships.length > 0) {
        //     for (var i = 0; i < userDetails.internships.length; i++) {
        //         var internship = await Internship.findById(userDetails.internships[i]);
        //         internshipData[i] = internship;
        //     }
        // }

        // if (userDetails.industrialProjects.length > 0) {
        //     for (var i = 0; i < userDetails.industrialProjects.length; i++) {
        //         var industrialProject = await IndustrialProjects.findById(userDetails.industrialProjects[i]);
        //         industrialProjectData[i] = industrialProject;
        //     }
        // }
        // if (userDetails.sellProducts.length > 0) {
        //     for (var i = 0; i < userDetails.sellProducts.length; i++) {
        //         var product = await sellProduct.findById(userDetails.sellProducts[i]);
        //         sellProductData[i] = product;
        //     }
        // }
        // console.log('internshipData', internshipData);
        // ('userDetails', userDetails);
        console.log('userDetails', userDetails);
        var profileData={
            "user": userDetails, "internshipData": internshipData, "industrialProjectData": industrialProjectData, "sellProductData": sellProductData, "projectRepoData": projectRepoData, "researchPaperData": researchPaperData
        }
        res.send({status:true, statusCode:200, message: "success", data: profileData });
        // res.render('studentProfile', { "user": userDetails });

    }
    else if (role == "mentor") {
        var userDetails = await MentorProfile.findById(id);

        var mentee = {};
        var researchPaper = {};
        var sellProductData = {};
        var projectRepoData = {};

        // if (userDetails.mentee.length > 0) {
        //     for (var i = 0; i < userDetails.mentee.length; i++) {
        //         // var internship = await Internship.findById(userDetails.internships[i]);
        //         // internshipData[i] = internship;
        //     }
        // }

        // if (userDetails.researchPaper.length > 0) {
        //     for (var i = 0; i < userDetails.researchPaper.length; i++) {
        //         // var industrialProject = await IndustrialProjects.findById(userDetails.industrialProjects[i]);
        //         // industrialProjectData[i] = industrialProject;
        //     }
        // }
        // if (userDetails.sellProducts.length > 0) {
        //     for (var i = 0; i < userDetails.sellProducts.length; i++) {
        //         var product = await sellProduct.findById(userDetails.sellProducts[i]);
        //         sellProductData[i] = product;
        //     }
        // }
        var profileData={
            "user": userDetails, "sellProductData": sellProductData, "projectRepoData": projectRepoData, "researchPaperData": researchPaper, "mentee": mentee
        }
        res.send({ status:true, statusCode:200, message: "success", data: profileData });
    }

    else if(role == "admin"){
        var userDetails = await AdminProfile.findById(id);
        var adminData = {
            "user": userDetails};

        res.send({ status:true, statusCode:200, message: "success", data: adminData });
    }

    else if(role == "company"){
        var userDetails = await CompanyProfile.findById(id);
        var companyData = {
            "user": userDetails
        };
        res.send({ status:true, statusCode:200, message: "success", data: companyData });

    }





}


const updateProfile = async (req, res) => {
    var id = req.body.id;
    var role = req.body.role;
    console.log('id', id);
    console.log('role', role);
    try {


        if (role == "student") {
            const newData = {
                name: req.body.data.name,
                phone: req.body.data.phone,
                education: req.body.data.education,
                college: req.body.data.college,
                university: req.body.data.university,
                branch: req.body.data.branch,
                stream: req.body.data.stream,
                semester: req.body.data.semester,
                state: req.body.data.state,
                resume: req.body.data.resume
            }
            // console.log('updateFields', updateFields);
            // Check if a user with the same email already exists
            const existingUser = await StudentProfile.findById(id);
            if (!existingUser) {
                return res.send({status:true, statusCode:400, message: 'No user available.' });
            }

            StudentProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, user) => {
                if (err) {
                    console.log("abc",err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({status:true, statusCode:200, message: 'User updated successfully.' });
                }
            });

        }
        else if (role == "mentor") {
            const newData = {
                name: req.body.data.name,
                phone: req.body.data.phone,
                education: req.body.data.education,
                location: req.body.data.location,
                background: req.body.data.background,
                subcategory: req.body.data.subcategory,
                AreaOfIntrest: req.body.data.AreaOfIntrest,
                Specialization: req.body.data.Specialization,
                college: req.body.data.college,
                university: req.body.data.university,
                branch: req.body.data.branch
            }
            // console.log('updateFields', updateFields);
            // Check if a user with the same email already exists
            const existingUser = await MentorProfile.findById(id);
            if (!existingUser) {
                return res.send({status:true, statusCode:400, message: 'No user available.' });
            }

            MentorProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({status:true, statusCode:200, message: 'User updated successfully.' });
                }
            });
        }
        else if (role == "company") {
            const newData = {
                phone: req.body.data.phone,
                state: req.body.data.state,
                category: req.body.data.category,
                description: req.body.data.description

               
            }
          
            const existingUser = await CompanyProfile.findById(id);
            if (!existingUser) {
                return res.send({status:true, statusCode:400, message: 'No user available.' });
            }

            CompanyProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({status:true, statusCode:200, message: 'User updated successfully.' });
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.send({status:false, statusCode:500, message: 'Error updating user. ' });
    }
}





module.exports = { showProfile, updateProfile };