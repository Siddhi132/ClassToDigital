const mongoose = require('mongoose');

const projectRepoMentorSchema = new mongoose.Schema({
    isHidden: {
        type: Boolean,
        default: false
    },
    label:{
        type:String,
        default:"Looking For Mentor"
    },
    projectName: {
        type: String,
        required: true
    },
    projectDomain: {
        type: String,
        required: true
    },
    teamMember: {
        type: String,
        required: true
    },
    // type of Project
    typeOfProject: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    universityName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    isprojectStarted: {
        type: Boolean,
        required: true
    },
    projectstartDate: {
        type: Date,
        // required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    stageOfProject: {
        // yet to be started
        // Just started
        // Middle of Project Work
        type: String,
        required: true
    },
    mentorType: {
        // Academic Mentor
        // Industrial Mentor
        type: String,
        required: true
    },
    skillsRequiredforMentor: {
        // comma seperated
        type: String,
        required: true
    },
});

//! add the code after front end is integrated
// projectRepoMentorSchema.pre('save', function (next) {
//     const projectDescription = this.projectDescription.replace(/\r\n|\r|\n/g, '<br>');
//     const objective = this.objective.replace(/\r\n|\r|\n/g, '<br>');

//     this.projectDescription = projectDescription;
//     this.objective = objective;


//     next();
// });

module.exports = mongoose.model("ProjectRepoMentor", projectRepoMentorSchema);