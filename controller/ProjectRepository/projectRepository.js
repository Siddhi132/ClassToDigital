const ProjectRepository = require('../../models/ProjectRepository');
const StudentProfile = require('../../models/StudentProfile');

const uploadProjectRepository = async (req, res) => {


    try {
        const newProjectRepository = new ProjectRepository(req.body);
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
    if(req.query!=null){
      const val = await ProjectRepository.find(req.query);
        res.status(200).send({"status":true, "statusCode":200, "message":"ProjectRepository found successfully", "data": {"ProjectRepository":val} });
    }
    else{
    const val = await ProjectRepository.find();
    res.status(200).send({"status":true, "statusCode":200, "message":"ProjectRepository found successfully", "data": {"ProjectRepository":val} });

    }
    }




module.exports = { uploadProjectRepository , getProjectRepository};