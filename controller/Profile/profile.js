const StudentProfile = require('../../models/StudentProfile');

const MentorProfile = require('../../models/MentorProfile');
const AdminProfile = require('../../models/AdminProfile');
const CompanyProfile = require('../../models/CompanyProfile');



const showProfile = async (req, res) => {
    console.log('req.query', req.query);
    var id = req.query.id;
    var role = req.query.role;
    console.log('id 1', id);
    console.log('role 1', role);

    try {
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
            var profileData = {
                "user": userDetails, "internshipData": internshipData, "industrialProjectData": industrialProjectData, "sellProductData": sellProductData, "projectRepoData": projectRepoData, "researchPaperData": researchPaperData
            }
            res.send({ status: true, statusCode: 200, message: "success", data: profileData });
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
            var profileData = {
                "user": userDetails, "sellProductData": sellProductData, "projectRepoData": projectRepoData, "researchPaperData": researchPaper, "mentee": mentee
            }
            res.send({ status: true, statusCode: 200, message: "success", data: profileData });
        }

        else if (role == "admin") {
            var userDetails = await AdminProfile.findById(id);
            var adminData = {
                "user": userDetails
            };

            res.send({ status: true, statusCode: 200, message: "success", data: adminData });
        }

        else if (role == "company") {
            var userDetails = await CompanyProfile.findById(id);
            var companyData = {
                "user": userDetails
            };
            res.send({ status: true, statusCode: 200, message: "success", data: companyData });

        }
        else {
            res.send({ status: false, statusCode: 500, message: "Your profile will not fetched" });
        }
    }

    catch (err) {
        console.log('err', err);
        res.send({ status: false, statusCode: 500, message: "Profile Data is not fetched Successfully.." });
    }






}


const updateProfile = async (req, res) => {
    console.log('req.body update Profile', req.body);
    var id = req.body.id;
    var role = req.body.role;
    console.log('id', id);
    console.log('role', role);
    try {


        if (role == "student") {
            var newData;

            if (req.body.data.profileImage) {
                newData = {
                    name: req.body.data.name,
                    phone: req.body.data.phone,
                    education: req.body.data.education,
                    college: req.body.data.college,
                    university: req.body.data.university,
                    branch: req.body.data.branch,
                    stream: req.body.data.stream,
                    semester: req.body.data.semester,
                    state: req.body.data.state,
                    resume: req.body.data.resume,
                    resumeIDP: req.body.data.resumeIDP,
                    description: req.body.data.description,
                    profileImage: {
                        name: req.body.data.profileImage.filename,
                        path: req.body.data.profileImage.path.replace('public', ''),
                    }
                }
            }
            else {
                newData = {
                    name: req.body.data.name,
                    phone: req.body.data.phone,
                    education: req.body.data.education,
                    college: req.body.data.college,
                    university: req.body.data.university,
                    branch: req.body.data.branch,
                    stream: req.body.data.stream,
                    semester: req.body.data.semester,
                    state: req.body.data.state,
                    resume: req.body.data.resume,
                    resumeIDP: req.body.data.resumeIDP,
                    description: req.body.data.description,

                }

            }


            console.log('newData update Profile', newData);

            // console.log('updateFields', updateFields);
            // Check if a user with the same email already exists
            const existingUser = await StudentProfile.findById(id);
            if (!existingUser) {
                return res.send({ status: true, statusCode: 400, message: 'No user available.' });
            }

            StudentProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, user) => {
                if (err) {
                    console.log("abc", err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({ status: true, statusCode: 200, message: 'User updated successfully.' });
                }
            });

        }
        else if (role == "mentor") {
            console.log('req.body.data', req.body.data);
            var newData;
            if (req.body.data.profileImage) {
                newData = {
                    name: req.body.data.name,
                    phone: req.body.data.phone,
                    education: req.body.data.education,
                    location: req.body.data.location,
                    background: req.body.data.background,
                    AreaOfIntrest: req.body.data.AreaOfIntrest,
                    Specialization: req.body.data.Specialization,
                    college: req.body.data.college,
                    university: req.body.data.university,
                    branch: req.body.data.branch,
                    description: req.body.data.description,
                    typeOfMentor: req.body.data.typeOfMentor,
                    profileImage: {
                        name: req.body.data.profileImage.filename,
                        path: req.body.data.profileImage.path.replace('public', ''),
                    }

                }
            }
            else {
                newData = {
                    name: req.body.data.name,
                    phone: req.body.data.phone,
                    education: req.body.data.education,
                    location: req.body.data.location,
                    background: req.body.data.background,
                    AreaOfIntrest: req.body.data.AreaOfIntrest,
                    Specialization: req.body.data.Specialization,
                    college: req.body.data.college,
                    university: req.body.data.university,
                    branch: req.body.data.branch,
                    description: req.body.data.description,
                    typeOfMentor: req.body.data.typeOfMentor
                }
            }

            // console.log('updateFields', updateFields);
            // Check if a user with the same email already exists
            const existingUser = await MentorProfile.findById(id);
            if (!existingUser) {
                return res.send({ status: true, statusCode: 400, message: 'No user available.' });
            }

            MentorProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({ status: true, statusCode: 200, message: 'User updated successfully.' });
                }
            });
        }
        else if (role == "company") {

            var newData;

            if (req.body.data.profileImage) {
                newData = {
                    phone: req.body.data.phone,
                    state: req.body.data.state,
                    category: req.body.data.category,
                    description: req.body.data.description,
                    profileImage: {
                        name: req.body.data.profileImage.filename,
                        path: req.body.data.profileImage.path.replace('public', ''),
                    }

                }
            }
            else {
                newData = {
                    phone: req.body.data.phone,
                    state: req.body.data.state,
                    category: req.body.data.category,
                    description: req.body.data.description
                }
            }




            const existingUser = await CompanyProfile.findById(id);
            if (!existingUser) {
                return res.send({ status: true, statusCode: 400, message: 'No user available.' });
            }

            CompanyProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({ status: true, statusCode: 200, message: 'User updated successfully.' });
                }
            });
        }
        else if(role == "admin"){
            var newData;
            if(req.body.data.profileImage){
                newData = {
                    name: req.body.data.name,
                    phone: req.body.data.phone,
                    profileImage: {
                        name: req.body.data.profileImage.filename,
                        path: req.body.data.profileImage.path.replace('public', ''),
                    }
                }
            }
            else{
                newData = {
                    name: req.body.data.name,
                    phone: req.body.data.phone
                }
            }

            const existingUser = await AdminProfile.findById(id);
            if (!existingUser) {
                return res.send({ status: true, statusCode: 400, message: 'No user available.' });
            }

            AdminProfile.findOneAndUpdate({ _id: id }, { $set: newData }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success
                    console.log("User updated successfully!");
                    res.send({ status: true, statusCode: 200, message: 'User updated successfully.' });
                }
            })

        }
        else {
            res.send({ status: false, statusCode: 400, message: "you can not update profile." });
        }

    } catch (error) {
        console.log(error);
        res.send({ status: false, statusCode: 500, message: 'Error updating user. ' });
    }
}

const modifyStatus = async (req, res) => {
    console.log("req.body modify", req.body);
    try {
        const { object,studentId, itemId, status } = req.body;
        // "internships": [{
        //     "internshipId": "640f62287f31e921ccb3d262",
        //     "status": "pending",
        //     "_id": {
        //         "$oid": "64169886bd2995a666370c65"
        //     }
        // }

        console.log("object", object);
        console.log("studentId", studentId);
        console.log("itemId", itemId);
        console.log("status", status);
        if (object == "internship") {
            StudentProfile.findOneAndUpdate({ _id: studentId, "internships.internshipId": itemId }, { $set: { "internships.$.status": status } }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success

                    console.log("User updated successfully!");
                    res.send({ status: true, statusCode: 200, message: 'User updated successfully.' });
                }
            });
        }
        else if (object == "industrialProject") {
            StudentProfile.findOneAndUpdate({ _id: studentId, "industrialProjects.industrialProjectId": itemId }, { $set: { "industrialProjects.$.status": status } }, (err, existingUser) => {
                if (err) {
                    console.log(err);
                } else {
                    // handle success

                    console.log("User updated successfully!");
                    res.send({ status: true, statusCode: 200, message: 'User updated successfully.' });
                }
            });

    }}
    catch (error) {
        console.log(error);
        res.send({ status: false, statusCode: 500, message: 'Error updating user. ' });
    }
}


            






module.exports = { showProfile, updateProfile ,modifyStatus};