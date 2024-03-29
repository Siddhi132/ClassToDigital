

const mongoose = require('mongoose');

const industrialProjectSchema = new mongoose.Schema({
    projectTitle:{type:String,required:true},
    companyName:{type:String,required:true},
    companyId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'companyProfile',
      required: true
  },
    position:{type:String,required:true},
    briefDescription:{type:String,required:true},
    state:{type:String,required:true},
    city:{type:String,required:true},
    typeOfCompany: { type: String, required: true },
    cin: { type: String, required: true },
    duration:{type:String,required:true},
    adminverified: { type: Boolean, required: true, default: false },
    morw:{type:String,required:true},
    stipend:{type:Number,required:true},
    skillsRequired:{type:String,required:true},
    numberOfOpenings:{type:Number,required:true},
    dateOfPosting:{type:Date,required:true,default:Date.now()},
    lastDateToApply:{type:Date,required:true},
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
    companyImage: {
      name: {
          type: String,
      },
      path: {
          type: String
      }
  }
  ,
  appliedStudents: [{
      studentId: {
        type: String,
      },
    status: {
        type: String,
        enum: ['pending', 'hired', 'rejected'],
      }
    }]


});

industrialProjectSchema.pre('save', function(next) {
    const rolesAndResponsibilities = this.rolesAndResponsibilities.replace(/\r\n|\r|\n/g, '<br>');
    const briefDescription = this.briefDescription.replace(/\r\n|\r|\n/g, '<br>');
    const whoCanApply = this.whoCanApply.replace(/\r\n|\r|\n/g, '<br>');
    const criteriaForSelection = this.criteriaForSelection.replace(/\r\n|\r|\n/g, '<br>');
    
    this.criteriaForSelection = criteriaForSelection;
    this.whoCanApply = whoCanApply;
    this.briefDescription = briefDescription;
    this.rolesAndResponsibilities = rolesAndResponsibilities;
    
    next();
  });
module.exports = mongoose.model("IndustrialProject", industrialProjectSchema);

