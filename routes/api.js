const express = require("express");
const router = express.Router();
const {verifyUserForSignup}=require('../controller/Signup/signup');
const {verifyUserForLogin}=require('../controller/Login/login');
const {showProfile, updateProfile, modifyStatus}=require('../controller/Profile/profile');
const {getMentors}=require('../controller/Mentor/mentor');
const {Categories}=require('../controller/Categories/category');
const {uploadInternship,getAllInternship,applyForInternship, getInternshipById, modifyApplicationStatus}=require('../controller/Internship/internship');
const {getIndustrialProjectById,uploadIndustrialProject,getAllIndustrialProjects,applyForIndustrialProject, modifyApplicationStatusIdp}=require('../controller/IndustrialProject/industrialProject');
const {getResearchPaperById,uploadResearchPaper, getAllResearchPapers, addCommentinResearchPaper, getAllComments}=require('../controller/ResearchPaper/researchPaper');
const {getUserById}=require('../controller/Profile/userDetailById');
const {uploadProduct,getProducts}=require('../controller/Products/product');
const { uploadProjectRepository, getProjectRepository} = require('../controller/ProjectRepository/projectRepository');
const {addNotification, getNotification, deleteNotification} = require('../controller/Notification/notification');
const {addMentee,getMentee} = require('../controller/Profile/mentorProfile');
const {verifyproduct} = require('../controller/Profile/adminProfile');


router.route("/signup").post(verifyUserForSignup);
router.route("/login").post(verifyUserForLogin);
router.get('/profile',showProfile);
router.post('/profile',updateProfile);
router.get('/getMentors', getMentors);
router.post("/uploadInternship", uploadInternship);
router.get("/Categories",Categories);
router.get("/allInternship",getAllInternship);
router.get("/getInternshipById",getInternshipById);
router.get("/getIndustrialProjectById",getIndustrialProjectById);
router.get("/getResearchPaperById",getResearchPaperById);
router.get("/allIndustrialProjects",getAllIndustrialProjects);
router.post('/applyForInternship', applyForInternship);
router.post('/applyForIndustrialProject', applyForIndustrialProject);
router.post('/uploadIndustrialProject', uploadIndustrialProject);
router.post('/uploadResearchPaper', uploadResearchPaper);
router.get('/allResearchPapers', getAllResearchPapers);
router.post('/addCommentinResearchPaper',addCommentinResearchPaper);
router.get('/getAllComments',getAllComments);
router.get('/getUserById',getUserById);
router.post('/uploadProduct',uploadProduct);
router.get('/getProducts',getProducts);
router.post('/uploadProjectRepository',uploadProjectRepository);
router.get('/getProjectRepository',getProjectRepository);
router.post('/addNotification', addNotification);
router.get('/getNotification', getNotification);
router.get('/deleteNotification', deleteNotification);
router.post('/addMentee',addMentee);
router.get('/getMentee',getMentee);
router.post('/modifyStatus',modifyStatus);
router.post('/modifyApplicationStatus',modifyApplicationStatus);
router.post('/modifyApplicationStatusIdp',modifyApplicationStatusIdp);
router.post('/verifyproduct',verifyproduct);







module.exports = router;
