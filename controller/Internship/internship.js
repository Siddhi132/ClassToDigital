const Internship = require("../../models/Internship");
const CompanyProfile = require("../../models/CompanyProfile");
const StudentProfile = require("../../models/StudentProfile");
const uploadInternship = async (req, res) => {

  try {
    const newInternship = new Internship(req.body);
    CompanyProfile.findById(req.body.companyId, async (err, existingUser) => {
      if (!existingUser) {
        return res.send({ status: false, statusCode: 400, message: "No user available" });
      }
      else {
        newInternship.companyImage.path = existingUser.profileImage.path;
        newInternship.companyImage.name = existingUser.profileImage.name;
        console.log("newInternship oiii 2", newInternship);
        const val = await newInternship.save();
        console.log('value -----------', val);
        console.log('value -----------', val._id);
        
        CompanyProfile.findOneAndUpdate({ _id: req.body.companyId }, { $push: { internships: val._id } }, (err, existingUser) => {
          if (!err) {
            res.send({ status: true, statusCode: 200, message: "Internship addedd successfully" });
          }
          else {
            console.log("err", err);
            res.send({ status: false, statusCode: 400, message: "Internship not added" });
          }
    
        })
      }   
    })

    
    

  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error during upload Internship" });
  }


}



const getAllInternship = async (req, res) => {
  console.log('req.query length', Object.keys(req.query).length);
  console.log("id..", req.query.id);
  var filter;
  try {
    if (Object.keys(req.query).length > 0) {
      console.log('req.query here', req.query);
      let val;
      let enableApplyButton = true;

      if (req.query.request) {
        if(typeof (req.query.request)==="object"){
          filter= req.query.request;
          }
     else{
          filter= JSON.parse(decodeURIComponent(req.query.request));
     }
        console.log("filter", filter);
        const existingUser = await StudentProfile.findById(req.query.id);
        console.log("existingUser", existingUser);
        if (existingUser) {
          if (existingUser.internships.includes(filter._id)) {
            enableApplyButton = false;
          }
        }
        val = await Internship.find(filter);
      }
      else {
        val = await Internship.find(req.query).where('stipend').gte(parseInt(req.query.stipend));
      }
      if (val.length == 0) {
        res.send({ status: false, statusCode: 400, 'message': "0 internship found" });
      }
      else {
        res.send({ status: true, statusCode: 200, 'message': 'Internship found successfully', data: { 'allinternship': val, 'enableApplyButton': enableApplyButton, 'userId': req.query.id, 'userRole': req.query.role } });
      }
    }
    else {
      console.log('req.query');
      const val = await Internship.find();
      res.send({ status: true, statusCode: 200, 'message': 'Internship found successfully', data: { 'allinternship': val } });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error during getting internships" });
  }
}

const applyForInternship = async (req, res) => {
  try {
    var id = req.body.userId;
    const existingUser = await StudentProfile.findById(id);
    if (!existingUser) {
      return res.send({ status: false, statusCode: 400, message: "No user available" });
    }
    
    // increment one in total no of application in internship collection 

    Internship.findByIdAndUpdate(
      req.body.internshipId,
      { $inc: { totalNumberOfApplicants: +1 } },
      { new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Internship not applied" });
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

   
      Internship.findByIdAndUpdate(
        req.body.internshipId,
        { $push: { appliedStudents: { studentId: id, status: 'pending' } } },
        { new: true },
        (err, result) => {
          if (err) {
            console.log("err", err);
            res.send({ status: false, statusCode: 400, message: "Internship not applied" });
          }
          else {
            console.log("result", result);
          }
        }
      );

        

      const InternshipData = {
        internshipId: req.body.internshipId,
        status: 'pending',
      }
    StudentProfile.findByIdAndUpdate(
      id,
      { $push: { internships: InternshipData } },
      { new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Internship not applied" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Internship applied successfully" });
        }
      }
    );


  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During applying internships" });
  }

}




const getInternshipById = async (req, res) => {
  try {
    const val = await Internship.findById(req.query.id);
    if (!val) {
      res.send({ status: false, statusCode: 400, 'message': "No internship found" });
    }
    else {
      res.send({ status: true, statusCode: 200, 'message': 'Internship found successfully', data: { 'internship': val } });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error during getting internships" });
  }
}

const modifyApplicationStatus = async (req, res) => {

  try {
    const {studentId, status, internshipId } = req.body;
    console.log("in studentId", studentId);
    console.log("in    status", status);
    console.log("in internshipId", internshipId);

    Internship.findByIdAndUpdate(
      internshipId,
      { $set: { 'appliedStudents.$[elem].status': status } },
      { arrayFilters: [{ 'elem.studentId': studentId }], new: true },
      (err, result) => {
        if (err) {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Internship status is not changed" });
        }
        else {
          console.log("result", result);
          res.send({ status: true, statusCode: 200, message: "Internship status changed successfully", status: status });
        }
      }
    );

  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During changing internships status" });
  }
}




module.exports = { uploadInternship, getAllInternship, applyForInternship, getInternshipById ,modifyApplicationStatus};