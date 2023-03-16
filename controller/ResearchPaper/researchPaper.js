
const ResearchPaper = require('../../models/ResearchPaper');
const MentorProfile = require('../../models/MentorProfile');
const StudentProfile = require('../../models/StudentProfile');
const UserProfile = require('../../models/Users');

const uploadResearchPaper = async (req, res) => {
  try {
    console.log("req.body here", req.body);
    const newResearchPaper = new ResearchPaper(req.body);
    // console.log("newResearchPaper", newResearchPaper);
    const val = await newResearchPaper.save();
    // console.log("val", val);
    if (req.body.userRole === "student") {
      StudentProfile.findOneAndUpdate({ _id: req.body.userId }, { $push: { researchPapers: val._id } }, (err, existingUser) => {
        if (!err) {
          console.log("existingUser", existingUser);
          res.send({ status: true, statusCode: 200, message: "Research paper addedd successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Research paper not added" });
        }

      })
    }
    else if (req.body.userRole === "mentor") {
      MentorProfile.findOneAndUpdate({ _id: req.body.userId }, { $push: { researchPapers: val._id } }, (err, existingUser) => {
        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Research paper addedd successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Research paper not added" });
        }
      })
    }
    else {
      res.send({ status: false, statusCode: 500, message: "Research paper not addedd successfully" });
    }
  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During Adding Research Paper" });
  }

}

const getAllResearchPapers = async (req, res) => {
  console.log('req.query length', Object.keys(req.query).length);
  console.log("id..", req.query);
  var filter;
  try {
    if (Object.keys(req.query).length > 0) {
      console.log('req.query here', req.query);
      let val;
      if (req.query.request) {
        if(typeof (req.query.request)==="object"){
          filter= req.query.request;
     }
     else{
          filter= JSON.parse(decodeURIComponent(req.query.request));

     }

        val = await ResearchPaper.find(filter);
      }
      else {
        val = await ResearchPaper.find(req.query);
      }
      if (val.length == 0) {
        res.send({ status: false, statusCode: 404, 'message': "0 Research Paper found" });
      }
      else {
        res.send({ status: true, statusCode: 200, 'message': 'Research Papers found successfully', data: { 'allResearchPaper': val, 'userId': req.query.id, 'userRole': req.query.role } });
      }
    }
    else {
      console.log('req.query');
      const val = await ResearchPaper.find();
      res.send({ status: true, statusCode: 200, 'message': 'Research Papers found successfully', data: { 'allResearchPaper': val } });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error During fetching Research Paper" });
  }
}

const addCommentinResearchPaper = async (req, res) => {
  try {
    var researchPaperId = req.body.researchPaperId;
    var data = {
      useremail:req.body.userEmail,
      userid: req.body.userId,
      comment: req.body.comment,
      userRole: req.body.userRole
    }
    const val = await ResearchPaper.findByIdAndUpdate(researchPaperId, { $push: { forumDiscussion: data } });
    console.log("val", val);
    res.send({ status: true, statusCode: 200, message: "Comment added successfully" });
  }
  catch (err) {
    res.send({ status: false, statusCode: 500, message: "Error During Add Comment in research paper" });
  }

};

const getAllComments = async (req, res) => {
  try {
    var researchPaperId = req.query.researchPaperId;
    const val = await ResearchPaper.findById(researchPaperId);
    console.log('val', val);
    if (val.length == 0) {
      res.send({ status: false, statusCode: 404, message: "0 Comment found" });
    }
    else {
      res.send({ status: true, statusCode: 200, message: "Comment found successfully", 'forumDiscussion': val.forumDiscussion });
    }
  }
  catch (err) {
    res.send({ status: false, statusCode: 500, message: "Error During getting all comments" });

  }
}

const getResearchPaperById = async (req, res) => {
  try {
    const val = await ResearchPaper.findById(req.query.id);
    if (!val) {
      res.send({ status: false, statusCode: 400, 'message': "No Reseach paper found" });
    }
    else {
      res.send({ status: true, statusCode: 200, 'message': 'Reseach paper found successfully', data: { 'researchPaper': val } });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error during getting Reseach paper" });
  }
}



module.exports = { uploadResearchPaper, getAllResearchPapers, addCommentinResearchPaper, getAllComments , getResearchPaperById};