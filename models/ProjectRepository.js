

const mongoose = require('mongoose');

const projectRepositorySchema = new mongoose.Schema({
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
module.exports = mongoose.model("ProjectRepository", projectRepositorySchema);

