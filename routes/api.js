const express = require("express");
const router = express.Router();
const {verifyUserForSignup}=require('../controller/Signup/signup');
const {verifyUserForLogin}=require('../controller/Login/login');
const {showProfile, updateProfile}=require('../controller/Profile/profile');
const {getMentors}=require('../controller/Mentor/mentor');
const {Categories}=require('../controller/Categories/category');
const {uploadInternship,getAllInternship,applyForInternship}=require('../controller/Internship/internship');
const {uploadIndustrialProject,getAllIndustrialProjects,applyForIndustrialProject}=require('../controller/IndustrialProject/industrialProject');

router.route("/signup").post(verifyUserForSignup);
router.route("/login").post(verifyUserForLogin);
router.get('/profile',showProfile);
router.post('/profile',updateProfile);
router.get('/getMentors', getMentors);
router.post("/uploadInternship", uploadInternship);
router.get("/Categories",Categories);
router.get("/allInternship",getAllInternship);
router.get("/allIndustrialProjects",getAllIndustrialProjects);
router.post('/applyForInternship', applyForInternship);
router.post('/applyForIndustrialProject', applyForIndustrialProject);
router.post('/uploadIndustrialProject', uploadIndustrialProject);







module.exports = router;
