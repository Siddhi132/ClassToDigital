

const mongoose = require('mongoose');

const industrialProjectSchema = new mongoose.Schema({
    projectTitle:{type:String,required:true},
    companyName:{type:String,required:true},
    companyId:{type:String,required:true},
    position:{type:String,required:true},
    briefDescription:{type:String,required:true},
    location:{type:String,required:true},
    duration:{type:String,required:true},
    stipend:{type:Number,required:true},
    skillsRequired:{type:String,required:true},
    numberOfOpenings:{type:Number,required:true},
    dateOfPosting:{type:Date,required:true,default:Date.now()},
    lastDateToApply:{type:Date,required:true},
    contactDetails:{type:String,required:true},
    paidOrUnpaid:{type:String,required:true},
    typeOfIndustrialProject:{type:String,required:true},
    modeOfIndustrialProject:{type:String,required:true},
    category:{type:String,required:true},
    rolesAndResponsibilities:{type:String,required:true},
    perks:{type:String,required:true},
    whoCanApply:{type:String,required:true},
    totalNumberOfApplicants:{type:Number,required:true},
    criteriaForSelection:{type:String,required:true},
    status:{type:Boolean,required:true,default:true},


});
module.exports = mongoose.model("IndustrialProject", industrialProjectSchema);

