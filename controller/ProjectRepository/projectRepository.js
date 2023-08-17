const ProjectRepository = require('../../models/ProjectRepository');
const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');
const ProjectRepoMentor = require('../../models/ProjectRepoMentor');
const ProjectRepoPartner = require('../../models/ProjectRepoPartner');





const uploadProjectRepository = async (req, res) => {

    console.log("req.file after ajax", req.body.uploadFileData);
    console.log(req.query);

    try {
        const newProjectRepository = new ProjectRepository(req.body);
        newProjectRepository.projectReport.name = req.body.uploadFileData.projectReport[0].filename;
        // path: 'public\\projectImages\\1678264647561-deom.png'
        newProjectRepository.projectReport.path = req.body.uploadFileData.projectReport[0].path.replace('public', '');
        newProjectRepository.projectImage.name = req.body.uploadFileData.projectImage[0].filename;
        newProjectRepository.projectImage.path = req.body.uploadFileData.projectImage[0].path.replace("public", "");
        const val = await newProjectRepository.save();
        if (req.query.userRole == "student") {
            StudentProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
                if (!err) {
                    res.send({ status: true, statusCode: 200, message: "ProjectRepository added student successfully" });
                }
                else {
                    console.log("err", err);
                    res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
                }

            })
        }
        else if (req.query.userRole == "mentor") {
            MentorProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
                if (!err) {
                    res.send({ status: true, statusCode: 200, message: "ProjectRepository added mentor successfully" });
                }
                else {
                    console.log("err", err);
                    res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
                }

            })
        }

    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During adding ProjectRepository" });
    }

}

const uploadProjectRepoMentor = async (req, res) => {

    // console.log("req.file after ajax", req.body.uploadFileData);
    console.log(req.query);

    try {
        if (req.query.userRole == "student" || req.query.userRole == "mentor") {

            console.log(req.body);
            const newProjectRepoMentor = new ProjectRepoMentor(req.body);

            // newProjectRepoMentor.projectReport.name =  req.body.uploadFileData.projectReport[0].filename;
            // // path: 'public\\projectImages\\1678264647561-deom.png'
            // newProjectRepoMentor.projectReport.path =  req.body.uploadFileData.projectReport[0].path.replace('public', '');
            // newProjectRepoMentor.projectImage.name =  req.body.uploadFileData.projectImage[0].filename;
            // newProjectRepoMentor.projectImage.path =  req.body.uploadFileData.projectImage[0].path.replace("public", "");
            const val = await newProjectRepoMentor.save();
            console.log(newProjectRepoMentor, "\n", val)
            if (req.query.userRole == "student") {
                StudentProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
                    if (!err) {
                        res.send({ status: true, statusCode: 200, message: "ProjectRepository added student successfully" });
                    }
                    else {
                        console.log("err", err);
                        res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
                    }
                })
            }
            else if (req.query.userRole == "mentor") {
                MentorProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
                    if (!err) {
                        res.send({ status: true, statusCode: 200, message: "ProjectRepository added mentor successfully" });
                    }
                    else {
                        console.log("err", err);
                        res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
                    }
                })
            }
        }
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During adding ProjectRepository" });
    }

}

const uploadProjectRepoPartner = async (req, res) => {

    // console.log("req.file after ajax", req.body.uploadFileData);
    console.log(req.query);

    try {
        if (req.query.userRole == "student" || req.query.userRole == "mentor") {

            console.log(req.body);
            const newProjectRepoPartner = new ProjectRepoPartner(req.body);

            // newProjectRepoMentor.projectReport.name =  req.body.uploadFileData.projectReport[0].filename;
            // // path: 'public\\projectImages\\1678264647561-deom.png'
            // newProjectRepoMentor.projectReport.path =  req.body.uploadFileData.projectReport[0].path.replace('public', '');
            // newProjectRepoMentor.projectImage.name =  req.body.uploadFileData.projectImage[0].filename;
            // newProjectRepoMentor.projectImage.path =  req.body.uploadFileData.projectImage[0].path.replace("public", "");
            const val = await newProjectRepoPartner.save();
            console.log(newProjectRepoPartner, "\n", val)
            if (req.query.userRole == "student") {
                StudentProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
                    if (!err) {
                        res.send({ status: true, statusCode: 200, message: "ProjectRepository added student successfully" });
                    }
                    else {
                        console.log("err", err);
                        res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
                    }
                })
            }
            else if (req.query.userRole == "mentor") {
                MentorProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
                    if (!err) {
                        res.send({ status: true, statusCode: 200, message: "ProjectRepository added mentor successfully" });
                    }
                    else {
                        console.log("err", err);
                        res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
                    }
                })
            }
        }
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During adding ProjectRepository" });
    }

}

const getProjectRepository = async (req, res) => {
    console.log("req.query abc", JSON.stringify(req.query));
    var filter;
    try {
        if (Object.keys(req.query).length > 0) {
            console.log(typeof (req.query.request));
            if (typeof (req.query.request) === "object") {
                filter = req.query.request;
            }
            else {
                filter = JSON.parse(decodeURIComponent(req.query.request));

            }
            console.log("filter", filter);
            const val = await ProjectRepository.find(filter);
            console.log("val", val.length);
            res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository found successfully", "data": { "ProjectRepository": val } });
        }
        else {
            const val = await ProjectRepository.find();
            res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository found successfully", "data": { "ProjectRepository": val } });

        }
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During getting ProjectRepository" });
    }
}
const getProjectRepoMentor = async (req, res) => {
    console.log("req.query abc", JSON.stringify(req.query));
    var filter;
    try{
        if (Object.keys(req.query).length > 0) {
            console.log("query", req.query)
            console.log(typeof (req.query.request));
            if(typeof (req.query.request)==="object"){
                 filter= req.query.request;
            }
            else{
                 filter= JSON.parse(decodeURIComponent(req.query.request));
            }
            console.log("filter", filter);
            const val = await ProjectRepoMentor.find(filter);
            console.log("val", val);
            res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository for Mentor found successfully", "data": { "ProjectRepoMentor": val } });
        }
        else {
            const val = await ProjectRepoMentor.find();
            res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository Mentor found successfully", "data": { "ProjectRepoMentor": val } });
    
        }
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During getting ProjectRepository" });
    }
}
const getProjectRepoPartner = async (req, res) => {
    console.log("req.query abc", JSON.stringify(req.query));
    var filter;
    try{
        if (Object.keys(req.query).length > 0) {
            console.log("query", req.query)
            console.log(typeof (req.query.request));
            if(typeof (req.query.request)==="object"){
                 filter= req.query.request;
            }
            else{
                 filter= JSON.parse(decodeURIComponent(req.query.request));
            }
            console.log("filter", filter);
            const val = await ProjectRepoPartner.find(filter);
            console.log("val", val);
            res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository for Partner found successfully", "data": { "ProjectRepoPartner": val } });
        }
        else {
            const val = await ProjectRepoPartner.find();
            res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository Partnerr found successfully", "data": { "ProjectRepoPartner": val } });
    
        }
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During getting ProjectRepoPartner" });
    }
}





module.exports = { uploadProjectRepository, getProjectRepository, uploadProjectRepoMentor, uploadProjectRepoPartner,getProjectRepoMentor,getProjectRepoPartner };