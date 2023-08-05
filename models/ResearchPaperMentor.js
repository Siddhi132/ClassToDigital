

const mongoose=require('mongoose');

const researchPaperMentorSchema=new mongoose.Schema({
    proposedPaperName:{type:String,required:true},
    Abstract:{type:String,required:true},
    authorName:{type:String,required:true},
    collegeName:{type:String,required:true},
    universityName:{type:String,required:true},
    areaofResearchPaper:{type:String,required:true},
    // mentorName:{type:String,required:true},
    domainofResearchPaper:{type:String,required:true},
    anyotherInformation:{type:String,required:true},
    //!looking for a mentor
    lookingforMentor:{type:String},
    skillsRequiredforMentor:{type:String},
});


researchPaperMentorSchema.pre('save', function(next) {
    const Abstract = this.Abstract.replace(/\r\n|\r|\n/g, '<br>');
    // const noteDetails = this.noteDetails.replace(/\r\n|\r|\n/g, '<br>');
   
    // this.noteDetails = noteDetails;
    this.Abstract = Abstract;
   
    
    next();
  });

module.exports=mongoose.model("ResearchPaperMentor",researchPaperMentorSchema);





