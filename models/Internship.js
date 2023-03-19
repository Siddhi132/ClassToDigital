

const mongoose = require('mongoose');

const internshipScheme = new mongoose.Schema({
    companyName: { type: String, required: true },
    companyId: { type: String, required: true },
    position: { type: String, required: true },
    briefDescription: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    stipend: { type: Number, required: true, default: 0 },
    skillsRequired: { type: String, required: true },
    numberOfOpenings: { type: Number, required: true },
    dateOfPosting: { type: Date, required: true, default: Date.now() },
    lastDateToApply: { type: Date, required: true },
    contactDetails: { type: String, required: true },
    paidOrUnpaid: { type: String, required: true },
    typeOfInternship: { type: String, required: true },
    modeOfInternship: { type: String, required: true },
    category: { type: String, required: true },
    rolesAndResponsibilities: { type: String, required: true },
    perks: { type: String, required: true },
    whoCanApply: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
    totalNumberOfApplicants: { type: Number, required: true },
    criteriaForSelection: { type: String, required: true },
    companyImage: {
        name: {
            type: String,
        },
        path: {
            type: String
        }
    },
    
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

internshipScheme.pre('save', function(next) {
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

module.exports = mongoose.model("Internship", internshipScheme);








