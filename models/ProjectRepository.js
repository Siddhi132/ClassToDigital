

const mongoose = require('mongoose');

const projectRepositorySchema = new mongoose.Schema({
    isHidden: {
        type: Boolean,
        default: false
    },
    label:{
        type:String,
        default:"Project Repository"
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
    academicMentorName: {
        type: String,
        required: true
    },
    IndustryMentorName: {
        type: String,
        required: true
    },
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
    //! project start boolean
    projectstartDate:{
        type: Date,
    },
    projectendDate:{
        type: Date,
    },
    briefDescription: {
        type: String,
        required: true
    },
    problemsDefine: {
        type: String,
        required: true
    },
    problemsSolution: {
        type: String,
        required: true
    },
    workingOfProject: {
        type: String,
        required: true
    },
    applications: {
        type: String,
        required: true
    },
    usp: {
        type: String,
    },
    materialused: {
        type: String,
    },
    hardwareused: {
        type: String,
    },
    softwareused: {
        type: String,
    },
    literatureSurvey: {
        type: String,
    },
    methodology: {
        type: String,
    },
    linkforAccessCode: {
        type: String,
    },
    linkforAccessPrototype: {
        type: String,
    },
    patentRadio: {
        type: Boolean,
    },
    patentInput: {
        type: String,
    },
    publishresearchpaper: {
        type: Boolean,
    },
    linkresearchpaper: {
        type: String,
    },
    testing_result: {
        type: String,
    },
    futurescope: {
        type: String,
    },
    conclusion: {
        type: String,
    },
    


    projectReport: {
        name: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    projectImage: {
        name: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
    },
    // videoDemo: {
    //     type: String
    // },
    // status: {
    //     type: Boolean,
    //     default: false
    // },
    // skillsToBeLearned: {
    //     type: String,
    //     required: true
    // },
    // technologiesUsed: {
    //     type: String,
    //     required: true
    // },
    // objective: {
    //     type: String,
    //     required: true
    // },
    



});


// projectRepositorySchema.pre('save', function(next) {
//     const projectDescription = this.projectDescription.replace(/\r\n|\r|\n/g, '<br>');
//     const objective = this.objective.replace(/\r\n|\r|\n/g, '<br>');
   
//     this.projectDescription = projectDescription;
//     this.objective = objective;
 
    
//     next();
//   });

module.exports = mongoose.model("ProjectRepository", projectRepositorySchema);

