const IndustrialProjects = require('../../models/IndustrialProject');
const CompanyProfile=require('../../models/CompanyProfile');
const StudentProfile=require('../../models/StudentProfile');

const uploadIndustrialProject=async(req,res)=>{
    try {
        const newIndustrialProject = new IndustrialProjects(req.body);
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
      catch (err) {
        console.log('err', err);
        res.send({ status: false, statusCode: 500, message: "Industrial project not added" });
      }
}


const getAllIndustrialProjects = async (req, res) => {
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
          if (existingUser.industrialProjects.includes(req.query.request._id)) {
            enableApplyButton = false;
          }
        }
        val = await IndustrialProjects.find(req.query.request);
        }
        else{
        val = await IndustrialProjects.find(req.query).where('stipend').gte(parseInt(req.query.stipend));
        }
        if (val.length == 0) {
          res.send({ status: false, statusCode: 404, 'message': "0 Industrial Project found" });
        }
        else {
          res.send({ status: true, statusCode: 200, 'message': 'Industrial Projects found successfully', data:{'allIndustrialProject': val,'enableApplyButton':enableApplyButton,'userId':req.query.id,'userRole':req.query.role} });
        }
      }
      else {
        console.log('req.query');
        const val = await IndustrialProjects.find();
        res.send({ status: true, statusCode: 200, 'message': 'Industrial Projects found successfully', data:{'allIndustrialProject': val} });
      }
    }
    catch (err) {
      console.log('err', err);
      res.send({ status: false, statusCode: 400, 'allIndustrialProject': "Industrial Projects not found" });
    }
  }

  const applyForIndustrialProject = async (req, res) => {
    try {
        var id = req.body.userId;
        const existingUser = await StudentProfile.findById(id);
        if (!existingUser) {
          return res.send({ status: false, statusCode: 400, message: "No user available" });
        }
        const IndustrialProjectData = {
            industrialProjects: req.body.industrialProjectId,
        }
      
          StudentProfile.findOneAndUpdate({ _id: id }, { $push: IndustrialProjectData }, (err, existingUser) => {
            if (!err) {
              res.send({ status: true, statusCode: 200, message: "Industrial Project applied successfully" });
            }
            else {
              console.log("err", err);
              res.send({ status: false, statusCode: 400, message: "Industrial Project not applied" });
            }
  
          });
        
      
    }
    catch (err) {
      console.log("err", err);
      res.send({ status: false, statusCode: 400, message: "Industrial Project not applied" });
    }
  
  }

module.exports={ uploadIndustrialProject,getAllIndustrialProjects,applyForIndustrialProject };