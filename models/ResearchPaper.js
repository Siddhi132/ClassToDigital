

const mongoose=require('mongoose');

const researchPaperScheme=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    teamMembers:{type:String,required:true},
    guide:{type:String,required:true},
    noteDetails:{type:String,required:true},
    skillsRequired:{type:String,required:true},
    userId:{type:String,required:true},
    needof:{type:String,required:true},
    category:{type:String,required:true},
    forumDiscussion:{type:Array},


});

module.exports=mongoose.model("ResearchPaper",researchPaperScheme);





