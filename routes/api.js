const express = require("express");
const router = express.Router();
const {verifyUserForSignup}=require('../controller/Signup/signup');
const {verifyUserForLogin}=require('../controller/Login/login');
const {showProfile, updateProfile}=require('../controller/Profile/profile');
const {getMentors}=require('../controller/Mentor/mentor');
const {Categories}=require('../controller/Categories/category');
const {uploadInternship,getAllInternship,applyForInternship, getInternshipById}=require('../controller/Internship/internship');
const {uploadIndustrialProject,getAllIndustrialProjects,applyForIndustrialProject}=require('../controller/IndustrialProject/industrialProject');
const {uploadResearchPaper, getAllResearchPapers, addCommentinResearchPaper, getAllComments}=require('../controller/ResearchPaper/researchPaper');
const {getUserById}=require('../controller/Profile/userDetailById');
const {uploadProduct,getProducts}=require('../controller/Products/product');
const { uploadProjectRepository, getProjectRepository} = require('../controller/ProjectRepository/projectRepository');
const {addNotification, getNotification, deleteNotification} = require('../controller/Notification/notification');

router.route("/signup").post(verifyUserForSignup);
router.route("/login").post(verifyUserForLogin);
router.get('/profile',showProfile);
router.post('/profile',updateProfile);
router.get('/getMentors', getMentors);
router.post("/uploadInternship", uploadInternship);
router.get("/Categories",Categories);
router.get("/allInternship",getAllInternship);
router.get("/getInternshipById",getInternshipById)
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







module.exports = router;
