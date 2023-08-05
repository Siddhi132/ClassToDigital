

const mongoose=require('mongoose');

const researchPaperScheme=new mongoose.Schema({
  authorName:{type:String,required:true},
  MentorGuideName:{type:String,required:true},
  Abstract:{type:String,required:true},
  conferenceName:{type:String,required:true},
  conferenceDate:{type:Date,required:true},
  issueDate:{type:Date,required:true},
  publisher:{type:String,required:true},
  conferenceLocation:{type:String,required:true},
  linkofResearchPaper:{type:String,required:true},
  
  // title:{type:String,required:true},
  // description:{type:String,required:true},
  // teamMembers:{type:String,required:true},
  // guide:{type:String,required:true},
  // noteDetails:{type:String,required:true},
  // skillsRequired:{type:String,required:true},
  // userId:{type:String,required:true},
  // needof:{type:String,required:true},
  // category:{type:String,required:true},
  // forumDiscussion:{type:Array},


});


researchPaperScheme.pre('save', function(next) {
    const Abstract = this.Abstract.replace(/\r\n|\r|\n/g, '<br>');
    // const noteDetails = this.noteDetails.replace(/\r\n|\r|\n/g, '<br>');
   
    // this.noteDetails = noteDetails;
    this.Abstract = Abstract;
   
    
    next();
  });

module.exports=mongoose.model("ResearchPaper",researchPaperScheme);





