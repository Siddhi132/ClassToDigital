const ProjectRepository = require('../../models/ProjectRepository');
const StudentProfile = require('../../models/StudentProfile');




const uploadProjectRepository = async (req, res) => {

    console.log("req.file after ajax", req.body.uploadFileData);


    try {
        const newProjectRepository = new ProjectRepository(req.body);
        newProjectRepository.projectReport.name =  req.body.uploadFileData.projectReport[0].filename;
        // path: 'public\\projectImages\\1678264647561-deom.png'
        newProjectRepository.projectReport.path =  req.body.uploadFileData.projectReport[0].path.replace('public', '');
        newProjectRepository.projectImage.name =  req.body.uploadFileData.projectImage[0].filename;
        newProjectRepository.projectImage.path =  req.body.uploadFileData.projectImage[0].path.replace("public", "");
        const val = await newProjectRepository.save();
        StudentProfile.findOneAndUpdate({ _id: req.query.userId }, { $push: { projectRepository: val._id } }, (err, existingUser) => {
            if (!err) {
                res.send({ status: true, statusCode: 200, message: "ProjectRepository added successfully" });
            }
            else {
                console.log("err", err);
                res.send({ status: false, statusCode: 400, message: "ProjectRepository not added" });
            }

        })

    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "ProjectRepository not added" });
    }

}

const getProjectRepository = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        const val = await ProjectRepository.find(req.query.request);
        res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository found successfully", "data": { "ProjectRepository": val } });
    }
    else {
        const val = await ProjectRepository.find();
        res.status(200).send({ "status": true, "statusCode": 200, "message": "ProjectRepository found successfully", "data": { "ProjectRepository": val } });

    }
}




module.exports = { uploadProjectRepository, getProjectRepository };