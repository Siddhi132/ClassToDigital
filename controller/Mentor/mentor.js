// const User = require('../models/user');
const { object } = require('mongoose/lib/utils');
const MentorProfile = require('../../models/MentorProfile');


const getMentors = async (req, res) => {
    console.log('req.query', req.query);
  try{
    if (Object.keys(req.query).length !== 0) {
      console.log('req.query2', req.query);
      const val = await MentorProfile.find(req.query);
      res.send({status:true,statusCode:200, "data":{'mentors': val} });
    }
    else {
      const val = await MentorProfile.find();
      res.send({status:true,statusCode:200, "data":{'mentors': val} });
    }
  }
  catch(err){
    res.send({status:false,statusCode:500, "message":"Something went wrong during fetching the mentors" });
  }
}







module.exports = { getMentors};