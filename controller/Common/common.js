const Internship = require("../../models/Internship");
const IndustrialProjects = require('../../models/IndustrialProject');
const Product = require('../../models/Products');
const StudentProfile = require("../../models/StudentProfile");
const MentorProfile = require("../../models/MentorProfile");
const ProjectRepository = require("../../models/ProjectRepository");

const deleteItem = async (req, res) => {
    var id = req.body.itemId;
    var item = req.body.item;
    var role = req.body.role;
    var userId = req.body.userId;
    console.log("req.body in common", req.body);

    console.log("id", id);
    console.log("item", item);
    console.log("role", role);
    console.log("userId", userId);

    if (item == "product") {
        Product.findByIdAndDelete(id, (err, result) => {
            if (err) {
                res.send({ status: false, statusCode: 400, message: "Product not deleted" });
            }
        }
        )
        if (role == "student") {
            StudentProfile.findOneAndUpdate({ _id: userId }, { $pull: { sellProducts: id } }, (err, existingUser) => {
                if (!err) {
                    res.send({ status: true, statusCode: 200, message: "Product removed from student successfully" });
                }
                else {
                    console.log("err", err);
                    res.send({ status: false, statusCode: 400, message: "Product not removed" });
                }
            }
            )
        }
        else if (role == "mentor") {
            MentorProfile.findOneAndUpdate({ _id: userId }, { $pull: { sellProducts: id } }, (err, existingUser) => {
                if (!err) {
                    res.send({ status: true, statusCode: 200, message: "Product removed menytor successfully" });
                }
                else {
                    console.log("err", err);
                    res.send({ status: false, statusCode: 400, message: "Product not removed" });
                }
            }
            )
        }








        // Product.findByIdAndDelete(id, (err, result) => {
        //     if (!err) {
        //         res.send({ status: true, statusCode: 200, message: "Product Deleted Successfully" });
        //     }
        //     else {
        //         res.send({ status: false, statusCode: 400, message: "Product not Deleted" });
        //     }
        // }
        // )

    }
    else if (item == "projectRepository") {
        ProjectRepository.findByIdAndDelete(id, (err, result) => {
            if (err) {
                res.send({ status: false, statusCode: 400, message: "Project not Deleted" });
            }
        })

        if (role == "student") {
            StudentProfile.findOneAndUpdate({ _id: userId }, { $pull: { projectRepository: id } }, (err, existingUser) => {
                if (!err) {
                    res.send({ status: true, statusCode: 200, message: "Project removed from student successfully" });
                }
                else {
                    console.log("err", err);
                    res.send({ status: false, statusCode: 400, message: "Project not removed" });
                }
            }
            )
        }
        else if (role == "mentor") {
            MentorProfile.findOneAndUpdate({ _id: userId }, { $pull: { projectRepository: id } }, (err, existingUser) => {
                if (!err) {
                    res.send({ status: true, statusCode: 200, message: "Project removed from mentor successfully" });
                }
                else {
                    console.log("err", err);
                    res.send({ status: false, statusCode: 400, message: "Project not removed" });
                }
            }
            )
        }


    }

    else if (item == "internship") {
        Internship.findByIdAndDelete(id, (err, result) => {
            if (!err) {
                res.send({ status: true, statusCode: 200, message: "Internship Deleted Successfully" });
            }
            else {
                res.send({ status: false, statusCode: 400, message: "Internship not Deleted" });
            }
        }
        )
    }
    else if (item == "industrialProject") {
        IndustrialProjects.findByIdAndDelete(id, (err, result) => {
            if (!err) {
                res.send({ status: true, statusCode: 200, message: "Project Deleted Successfully" });
            }
            else {
                res.send({ status: false, statusCode: 400, message: "Project not Deleted" });
            }
        }
        )
    }
}


const hideItem = async (req, res) => {
    var id = req.body.itemId;
    var item = req.body.item;
    var role = req.body.role;
    var userId = req.body.userId;
    console.log("req.body in common", req.body);

    console.log("id", id);
    console.log("item", item);
    console.log("role", role);
    console.log("userId", userId);

    if (item == "projectRepository") {
        ProjectRepository.findByIdAndUpdate(id, { $set: { isHidden: true } }, (err, result) => {
            if (!err) {
                res.send({ status: true, statusCode: 200, message: "Project Hidden Successfully" });
            }
            else {
                res.send({ status: false, statusCode: 400, message: "Project not Hidden" });
            }
        }
        )
    }
}

const visibleItem = async (req, res) => {
    var id = req.body.itemId;
    var item = req.body.item;
    var role = req.body.role;
    var userId = req.body.userId;
    console.log("req.body in common", req.body);

    console.log("id", id);
    console.log("item", item);
    console.log("role", role);
    console.log("userId", userId);

    if (item == "projectRepository") {
        ProjectRepository.findByIdAndUpdate(id, { $set: { isHidden: false } }, (err, result) => {
            if (!err) {
                res.send({ status: true, statusCode: 200, message: "Project Visible Successfully" });
            }
            else {
                res.send({ status: false, statusCode: 400, message: "Project not Visible" });
            }
        }
        )
    }
}




module.exports = { deleteItem, hideItem, visibleItem }