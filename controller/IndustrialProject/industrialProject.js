const IndustrialProjects = require('../../models/IndustrialProject');
const CompanyProfile = require('../../models/CompanyProfile');
const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');

const uploadIndustrialProject = async (req, res) => {
  try {
    const newIndustrialProject = new IndustrialProjects(req.body);
    CompanyProfile.findById(req.body.companyId, async (err, existingUser) => {
      if (!existingUser) {
        return res.send({ status: false, statusCode: 400, message: "No user available" });
      }
      else {
        newIndustrialProject.companyImage.path = existingUser.profileImage.path;
        newIndustrialProject.companyImage.name = existingUser.profileImage.name;
        const val = await newIndustrialProject.save();
        CompanyProfile.findOneAndUpdate({ _id: req.body.companyId }, { $push: { industrialProjects: val._id } }, (err, existingUser) => {
          if (!err) {
            res.send({ status: true, statusCode: 200, message: "Industrial project addedd successfully" });
          }
          else {
            console.log("err", err);
            res.send({ status: false, statusCode: 400, message: "Industrial project not added" });
          }

        })
      }

    }

    )
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, message: "Error during Adding Industrial project" });
  }
}


const getAllIndustrialProjects = async (req, res) => {
  console.log('req.query length', Object.keys(req.query).length);
  console.log("id..", req.query.id);
  var filter;
  try {
    if (Object.keys(req.query).length > 0) {
      console.log('req.query here', req.query);
      let val;
      let enableApplyButton = true;
      if (req.query.request) {
        if (typeof (req.query.request) === "object") {
          filter = req.query.request;
        }
        else {
          filter = JSON.parse(decodeURIComponent(req.query.request));

        }
        const existingUser = await StudentProfile.findById(req.query.id);
        console.log("existingUser", existingUser);
        if (existingUser) {
          if (existingUser.industrialProjects.includes(filter._id)) {
            enableApplyButton = false;
          }
        }
        val = await IndustrialProjects.find(filter).populate('companyId');
      }
      else {
        val = await IndustrialProjects.find(req.query).where('stipend').gte(parseInt(req.query.stipend)).populate('companyId');
      }
      if (val.length == 0) {
        res.send({ status: false, statusCode: 404, 'message': "0 Industrial Project found" });
      }
      else {
        res.send({ status: true, statusCode: 200, 'message': 'Industrial Projects found successfully', data: { 'allIndustrialProject': val, 'enableApplyButton': enableApplyButton, 'userId': req.query.id, 'userRole': req.query.role } });
      }
    }
    else {
      console.log('req.query');
      const val = await IndustrialProjects.find().populate('companyId');
      res.send({ status: true, statusCode: 200, 'message': 'Industrial Projects found successfully', data: { 'allIndustrialProject': val } });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error During Getting all Industrial Projects" });
  }
}

const applyForIndustrialProject = async (req, res) => {
  try {
    var id = req.body.userId;
    const existingUser = await StudentProfile.findById(id);
    if (!existingUser) {
      return res.send({ status: false, statusCode: 400, message: "No user available" });
    }


    // increment one in total no of application in internship collection 

    IndustrialProjects.findByIdAndUpdate(
      req.body.industrialProjectId,
      { $inc: { totalNumberOfApplicants: +1 } },
      { new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not applied" });
        }
        else {
          console.log("result", result);
        }
      }
    );
    // appliedStudents: [{
    //   studentId: {
    //     type: String,
    //   },
    //   status: {
    //     type: String,
    //     enum: ['pending', 'hired', 'rejected'],
    //   }
    // }]

    IndustrialProjects.findByIdAndUpdate(
      req.body.industrialProjectId,
      { $push: { appliedStudents: { studentId: id, status: "pending" } } },
      { new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not applied" });
        }
        else {
          console.log("result", result);
        }
      }
    );


    const IndustrialProjectData = {
      industrialProjectId: req.body.industrialProjectId,
      status: "pending"
    }


    StudentProfile.findByIdAndUpdate(
      id,
      { $push: { industrialProjects: IndustrialProjectData } },
      { new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not applied" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Industrial Project applied successfully" });
        }
      }
    );



  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error during Industrial Project apply.." });
  }

}

const getIndustrialProjectById = async (req, res) => {
  try {
    const val = await IndustrialProjects.findById(req.query.id).populate('companyId');
    if (val) {
      res.send({ status: true, statusCode: 200, 'message': 'Industrial Project found successfully', data: { 'IndustrialProject': val } });
    }
    else {
      res.send({ status: false, statusCode: 404, 'message': "0 Industrial Project found" });
    }

  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error During Getting Industrial Project" });
  }

}

const modifyApplicationStatusIdp = async (req, res) => {

  try {
    const { studentId, status, idpId } = req.body;
    console.log("in studentId", studentId);
    console.log("in    status", status);
    console.log("in internshipId", idpId);

    IndustrialProjects.findByIdAndUpdate(
      idpId,
      { $set: { 'appliedStudents.$[elem].status': status } },
      { arrayFilters: [{ 'elem.studentId': studentId }], new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "IndustrialProjects status is not changed" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "IndustrialProjects status changed successfully", status: status });
        }
      }
    );

  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During changing status IndustrialProjects" });
  }
}


const saveIndustrialProject = async (req, res) => {
  var industrialProjectId = req.body.industrialProjectId;
  var userId = req.body.userId;
  var role = req.body.role;
  // savedIndustrialProjects: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'IndustrialProject'
  // }],
  try {
    if (role == "student") {
      StudentProfile.findOneAndUpdate({ _id: userId }, { $push: { savedIndustrialProjects: industrialProjectId } }, { new: true }, (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not saved" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Industrial Project saved successfully" });
        }
      }
      );
    }
    else if (role == "mentor") {
      MentorProfile.findOneAndUpdate({ _id: userId }, { $push: { savedIndustrialProjects: industrialProjectId } }, { new: true }, (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not saved" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Industrial Project saved successfully" });
        }
      }
      );
    }
  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error during Industrial Project save.." });
  }


}

const removeSavedIndustrialProject = async (req, res) => {
  var industrialProjectId = req.body.industrialProjectId;
  var userId = req.body.userId;
  var role = req.body.role;
  // savedIndustrialProjects: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'IndustrialProject'
  // }],
  try {
    if (role == "student") {
      StudentProfile.findOneAndUpdate({ _id: userId }, { $pull: { savedIndustrialProjects: industrialProjectId } }, { new: true }, (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not removed" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Industrial Project removed successfully" });
        }
      }
      );
    }
    else if (role == "mentor") {  
      MentorProfile.findOneAndUpdate({ _id: userId }, { $pull: { savedIndustrialProjects: industrialProjectId } }, { new: true }, (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Industrial Project not removed" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Industrial Project removed successfully" });
        }
      }
      );
    }
  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error during Industrial Project remove.." });
  }
}

module.exports = { uploadIndustrialProject, getAllIndustrialProjects, applyForIndustrialProject, getIndustrialProjectById, modifyApplicationStatusIdp, saveIndustrialProject, removeSavedIndustrialProject };