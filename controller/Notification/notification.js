const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');
const AdminProfile = require('../../models/AdminProfile');

const addNotification = async (req, res) => {
    console.log('req.bodynotification', req.body);
    let userId = req.body.userId;
    let userRole = req.body.userRole;
    let notification = req.body.notification;
    let notificationtype = req.body.notificationtype;
    let notificationData = {
        notification: notification,
        notificationtype: notificationtype
    }
    if (userRole == 'student') {
        StudentProfile.findOneAndUpdate({ _id: userId }, { $push: { notifications: notificationData } }, (err, existingUser) => {
            if (!err) {
                res.status(200).send({ "status": true, "statusCode": 200, "message": "notification added successfully" });

            }
            else {
                res.status(400).send({ "status": false, "statusCode": 500, "message": "notification not added!" });

            }
        }
        )
    }
    else if (userRole == 'mentor') {
        MentorProfile.findOneAndUpdate({ _id: userId }, { $push: { notifications: notificationData } }, (err, existingUser) => {
            if (!err) {
                res.status(200).send({ "status": true, "statusCode": 200, "message": "notification added successfully" });

            }
            else {
                res.status(400).send({ "status": false, "statusCode": 500, "message": "notification not added!" });

            }
        }
        )
    }
    else if (userRole == 'admin') {
        AdminProfile.findOneAndUpdate({ _id: userId }, { $push: { notifications: notificationData } }, (err, existingUser) => {
            if (!err) {
                res.status(200).send({ "status": true, "statusCode": 200, "message": "notification added successfully" });

            }
            else {
                res.status(400).send({ "status": false, "statusCode": 500, "message": "notification not added!" });

            }
        }
        )
    }




}

const getNotification = async (req, res) => {
    var userId = req.query.userId;
    var userRole = req.query.userRole;
    console.log('userId noti', userId);
    console.log('userRole noti', userRole);
    if (userRole == 'student') {
        var userDetails = await StudentProfile.findById(userId);
    }
    else if (userRole == 'mentor') {
        var userDetails = await MentorProfile.findById(userId);
    }
    else if (userRole == 'admin') {
        var userDetails = await AdminProfile.findById(userId)
    }


    if (!userDetails) {
        res.send({ "status": false, "statusCode": 400, "message": 'No user available.' });
    }
    res.status(200).send({ status: true, statusCode: 200, message: "notification found successfully", "data": { "notifications": userDetails.notifications } });

}


const deleteNotification = async (req, res) => {
    var userId = req.query.userId;
    var userRole = req.query.userRole;
    var notificationId = req.query.notificationId;
    console.log('notificationId', notificationId);
    console.log('userId', userId);
    console.log('userRole', userRole);

    if (userRole == 'student') {
        var userDetails = await StudentProfile.findById(userId);
    }
    else if (userRole == 'mentor') {
        var userDetails = await MentorProfile.findById(userId);
    }
    else if (userRole == 'admin') {
        var userDetails = await AdminProfile.findById(userId)
    }


    if (!userDetails) {
        res.send({ "status": false, "statusCode": 400, "message": 'No user available.' });
    }
    // find all notification and delete the one with the id
    var notifications = userDetails.notifications;
    var newNotifications = [];


    for (var i = 0; i < notifications.length; i++) {
        if (notifications[i]._id != notificationId) {
            newNotifications.push(notifications[i]);
        }
    }

    if (userRole == 'student') {
        StudentProfile.findOneAndUpdate({ _id: userId }, { $set: { notifications: newNotifications } }, (err, existingUser) => {
            if (!err) {
                res.status(200).send({ "status": true, "statusCode": 200, "message": "notification deleted successfully" });
            }
            else {
                res.status(400).send({ "status": false, "statusCode": 400, "message": "notification not deleted!" });
            }
        }
        )
    }
    else if (userRole == 'mentor') {
        MentorProfile.findOneAndUpdate({ _id: userId }, { $set: { notifications: newNotifications } }, (err, existingUser) => {
            if (!err) {
                res.status(200).send({ "status": true, "statusCode": 200, "message": "notification deleted successfully" });
            }
            else {
                res.status(400).send({ "status": false, "statusCode": 400, "message": "notification not deleted!" });
            }
        }
        )
    }
    else if (userRole == 'admin') {
        AdminProfile.findOneAndUpdate({ _id: userId }, { $set: { notifications: newNotifications } }, (err, existingUser) => {
            if (!err) {
                res.status(200).send({ "status": true, "statusCode": 200, "message": "notification deleted successfully" });
            }
            else {
                res.status(400).send({ "status": false, "statusCode": 400, "message": "notification not deleted!" });
            }
        }
        )
    }




}


module.exports = { addNotification, getNotification, deleteNotification };


