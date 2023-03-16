
// make addMentee function which will add mentee to the mentor's mentee array.
const MentorProfile = require('../../models/MentorProfile');
const StudentProfile = require('../../models/StudentProfile');

const addMentee = async (req, res) => {
    try {
        const mentorId = req.body.userId;
        const menteeEmail = req.body.email;
        var mentee;
        // check student for this email is exist or not 

        StudentProfile.find({ email: menteeEmail }, (err, existingUser) => {
            if (!err) {
                if (existingUser.length > 0) {
                    // push userid to mentor's mentee array and push mentor id to student's mentor array
                    console.log("existingUser", existingUser[0]._id);
                    mentee = {
                        menteeid: existingUser[0]._id,
                        menteeEmail: existingUser[0].email,
                    };

                    if (existingUser[0].mentor.length > 0) {
                        for (var i = 0; i < existingUser[0].mentor.length; i++) {
                            if (existingUser[0].mentor[i] == mentorId) {
                                console.log("mentee already added");
                                res.send({ status: false, statusCode: 400, message: "mentee already added" });
                                return;
                                
                            }
                        }
                    }
                    else{
                        MentorProfile.findOneAndUpdate({ _id: mentorId }, { $push: { mentee: mentee } }, (err, existingUser2) => {
                            if (!err) {
                                StudentProfile.findOneAndUpdate({"_id":existingUser[0]._id},{ $push: { mentor: mentorId } }, (err, existingUser3) => {
                                    if (!err) {
                                        res.send({ status: true, statusCode: 200, message: "mentee added successfully" });
                                    }
                                    else {
                                        console.log("err", err);
                                        res.send({ status: false, statusCode: 400, message: "mentee not added" });
                                    }
                                }   
                                )
                              
                            }
                            else {
                                console.log("err", err);
                                res.send({ status: false, statusCode: 400, message: "mentee not added" });
                            }
                        }
                        )
                    }


                    

                   

                }
                else {
                    res.send({ status: false, statusCode: 400, message: "mentee not found" });
                }
            }
            else {
                console.log("err", err);
                res.send({ status: false, statusCode: 400, message: "mentee not found" });
            }
        });



    } catch (err) {
        console.log(err);
        res.send({ status: false, statusCode: 500, message: "Mentor not addedd successflly" });

    }
}

const getMentee = async (req, res) => {
    try {
        MentorProfile.find({ _id: req.query.mentorId }, (err, existingUser) => {
            if (!err) {
                res.send({ status: true, statusCode: 200, message: "mentee found successfully", data: existingUser[0].mentee });
            }
            else {
                console.log("err", err);
                res.send({ status: false, statusCode: 400, message: "mentee not found" });
            }
        }
        )
    } catch (err) {
        console.log(err);
        res.send({ status: false, statusCode: 500, message: "Mentor not found successflly" });
    }
}

module.exports = { addMentee, getMentee };