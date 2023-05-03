var accountSid = process.env.ACC_SID;
var authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
let otp;
// Update the setTextMessage function to accept a phone number parameter
const setTextMessage = async (req, res) => {
    const generateOTP = () => {
        // Declare a digits variable which stores all digits
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 6; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    otp = +generateOTP(); //convert string into number
    const phone = req.body.phone; // Get the phone number from the request body
    try {
        console.log(otp);
        const message = await client.messages.create({
            body: `Hi there , I am node.js application, your otp is ${otp}`,
            from: process.env.MOBILE_NUM,
            to: phone
        });
        // console.log(message.sid);
        res.send("OTP sent successfully"); // Send success response to the client

    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to send OTP");
    }
}
const verifyOtp = async (req, res) => {
    const otpValue = +req.body.otp; // Get the OTP value from the request body & then convert number
    console.log(otpValue);
    console.log(otpValue == otp);
    console.log(otpValue === otp);
    // Compare the OTP with the stored value (e.g., in your database or in a session) If the OTP is verified successfully, send success response to the client
    if (otpValue === otp) {
        res.json({ success: true });
        console.log("OTP match");
        // res.send("OTP Matched");
    } else {
        res.json({ success: false });
        // res.send("OTP Didn't match ");
        console.log("OTP didn't match");
    }
}
const checkOTP = async (phone, newotp) => {
    const storedOTP = otp;
    // Compare the storedOTP with the provided `otp` parameter.
    console.log(otp);
    console.log(+newotp);
    console.log(otp === +newotp);
    if (+newotp === storedOTP) {
        console.log("OTP is Valid");
        return true;
    } else {
        console.log("OTP didn't valid");
        return false;
    }
};

module.exports = { setTextMessage, verifyOtp, checkOTP }; // Export the function as an object





