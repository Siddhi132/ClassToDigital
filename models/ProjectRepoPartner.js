const mongoose = require('mongoose');

const projectRepoPartnerSchema = new mongoose.Schema({
    isHidden: {
        type: Boolean,
        default: false
    },
    label:{
        type:String,
        default:"Looking For Project-Partner"
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
    mentorName: {
        type: String,
    },
    // type of Project
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
    isprojectStartedPartner: {
        type: Boolean,
        required: true
    },
    projectstartDatePartner: {
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
    skillsRequiredforMentor: {
        // comma seperated
        type: String,
        required: true
    },
});


// projectRepoPartnerSchema.pre('save', function (next) {
//     const projectDescription = this.projectDescription.replace(/\r\n|\r|\n/g, '<br>');
//     const objective = this.objective.replace(/\r\n|\r|\n/g, '<br>');

//     this.projectDescription = projectDescription;
//     this.objective = objective;


//     next();
// });

module.exports = mongoose.model("projectRepoPartner", projectRepoPartnerSchema);