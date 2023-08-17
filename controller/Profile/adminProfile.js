const IndustrialProject = require('../../models/IndustrialProject');
const Internship = require('../../models/Internship');
const product = require('../../models/Products');

const verifyproduct = async (req,res) => {
    console.log("req.body",req.body);
    try {
        
        await product.findOneAndUpdate({ _id: req.body.id }, { $set: { verified: true } });
        res.send({ status: true, statusCode: 200, message: "Product verified successfully" });
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During Verifying Product" });
    }
}

const verifyinternship = async (req,res) => {
    console.log("req.body",req.body);
    try {
        
        await Internship.findOneAndUpdate({ _id: req.body.id }, { $set: { adminverified: true } });
        res.send({ status: true, statusCode: 200, message: "Internship verified successfully" });
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During Verifying Internship" });
    }
}

const verifyIndustrialProject = async (req,res) => {
    console.log("req.body",req.body);
    try {
        
        await IndustrialProject.findOneAndUpdate({ _id: req.body.id }, { $set: { adminverified: true } });
        res.send({ status: true, statusCode: 200, message: "Industrial Project verified successfully" });
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During Verifying Industrial Project" });
    }
}

module.exports = { verifyproduct, verifyinternship, verifyIndustrialProject };

