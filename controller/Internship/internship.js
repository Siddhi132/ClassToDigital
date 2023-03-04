const Internship = require("../../models/Internship");
const CompanyProfile = require("../../models/CompanyProfile");
const StudentProfile = require("../../models/StudentProfile");
const uploadInternship = async (req, res) => {

  try {
    const newInternship = new Internship(req.body);
    const val = await newInternship.save();
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
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Internship not added" });
  }


}



const getAllInternship = async (req, res) => {
  console.log('req.query length', Object.keys(req.query).length);
  console.log("id..",req.query.id);

  try {
    if (Object.keys(req.query).length > 0) {
      console.log('req.query here', req.query);
      let val;
      let enableApplyButton=true;
      if(req.query.request){
        const existingUser = await StudentProfile.findById(req.query.id);
        console.log("existingUser",existingUser);
        if(existingUser){
        if (existingUser.internships.includes(req.query.request._id)) {
          enableApplyButton = false;
        }
      }
      val = await Internship.find(req.query.request);
      }
      else{
      val = await Internship.find(req.query).where('stipend').gte(parseInt(req.query.stipend));
      }
      if (val.length == 0) {
        res.send({ status: false, statusCode: 400, 'message': "0 internship found" });
      }
      else {
        res.send({ status: true, statusCode: 200, 'message': 'Internship found successfully', data:{'allinternship': val,'enableApplyButton':enableApplyButton,'userId':req.query.id,'userRole':req.query.role} });
      }
    }
    else {
      console.log('req.query');
      const val = await Internship.find();
      res.send({ status: true, statusCode: 200, 'message': 'Internship found successfully', data:{'allinternship': val} });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 400, 'allinternship': "Internship not found" });
  }
}

const applyForInternship = async (req, res) => {
  try {
      var id = req.body.userId;
      const existingUser = await StudentProfile.findById(id);
      if (!existingUser) {
        return res.send({ status: false, statusCode: 400, message: "No user available" });
      }
      const InternshipData = {
        internships: req.body.internshipId,
      }
    
        StudentProfile.findOneAndUpdate({ _id: id }, { $push: InternshipData }, (err, existingUser) => {
          if (!err) {
            res.send({ status: true, statusCode: 200, message: "Internship applied successfully" });
          }
          else {
            console.log("err", err);
            res.send({ status: false, statusCode: 400, message: "Internship not applied" });
          }

        });
      
    
  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 400, message: "Internship not applied" });
  }

}

module.exports = { uploadInternship, getAllInternship, applyForInternship };