

const mongoose = require('mongoose');

const projectRepositorySchema = new mongoose.Schema({
    isHidden: {
        type: Boolean,
        default: false
    },
    projectName: {
        type: String,
        required: true
    },
    teamMembers: {
        type: String,
        required: true
    },
    guideName: {
        type: String,
        required: true
    },
    projectDescription: {
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
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    projectSourceCode: {
        type: String,
        required: true
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
    videoDemo: {
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    skillsToBeLearned: {
        type: String,
        required: true
    },
    technologiesUsed: {
        type: String,
        required: true
    },
    objective: {
        type: String,
        required: true
    },



});


projectRepositorySchema.pre('save', function(next) {
    const projectDescription = this.projectDescription.replace(/\r\n|\r|\n/g, '<br>');
    const objective = this.objective.replace(/\r\n|\r|\n/g, '<br>');
   
    this.projectDescription = projectDescription;
    this.objective = objective;
 
    
    next();
  });

module.exports = mongoose.model("ProjectRepository", projectRepositorySchema);

