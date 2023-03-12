
require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { isAuth, isLoginRequired } = require('../middleware/Authentication/SetIsAuthenticate');
const multer = require('multer');
const fs = require('fs');

const uploadStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'projectImage') {
      if (!fs.existsSync('public/uploadedData/projectRepository/projectImages')) {
        fs.mkdirSync('public/uploadedData/projectRepository/projectImages', { recursive: true });
      }
      cb(null, 'public/uploadedData/projectRepository/projectImages');
    } else if (file.fieldname === 'projectReport') {
      if (!fs.existsSync('public/uploadedData/projectRepository/projectReports')) {
        fs.mkdirSync('public/uploadedData/projectRepository//projectReports', { recursive: true });
      }
      cb(null, 'public/uploadedData/projectRepository/projectReports');
    }
    else if (file.fieldname === 'resumeFile') {
      if (!fs.existsSync('public/uploadedData/internship/resumeFiles')) {
        fs.mkdirSync('public/uploadedData/internship/resumeFiles', { recursive: true });
      }
      cb(null, 'public/uploadedData/internship/resumeFiles');
    }  
    else if (file.fieldname === 'resumeFileIDP') {
      if (!fs.existsSync('public/uploadedData/industrialProject/resumeFiles')) {
        fs.mkdirSync('public/uploadedData/industrialProject/resumeFiles', { recursive: true });
      }
      cb(null, 'public/uploadedData/industrialProject/resumeFiles');
    }
    else if (file.fieldname === 'profileImage') {
      if (!fs.existsSync('public/uploadedData/profile/profileImages')) {
        fs.mkdirSync('public/uploadedData/profile/profileImages', { recursive: true });
          
      }
      cb(null, 'public/uploadedData/profile/profileImages');
    }
    else if (file.fieldname === 'productPhotos') {
      if (!fs.existsSync('public/uploadedData/product/productPhotos')) {
        fs.mkdirSync('public/uploadedData/product/productPhotos', { recursive: true });

      }
      cb(null, 'public/uploadedData/product/productPhotos');

    }
    else {
      cb(new Error('Invalid fieldname'));
    }

  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
}
);


const uploadFile = multer({
  storage: uploadStorage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== 'application/pdf' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(new Error('Only PDF, PNG and JPEG files are allowed'))
    }
    cb(null, true);
  }
});



// Home page
var login;
router.get('/', isAuth, async (req, res) => {
  console.log("req.session.userId ", req.session.userId);
  const user = await User.findOne({ userId: req.session.userId });
  console.log("user", user);
  if (!user) {
    login = 0
    res.render('Home/Home', { login, message: "User Not found.", status: 404 });
  } else {
    login = 1;
    var role = user.role;
    console.log("req.session.userId /khlii 2", req.session.userId);
    console.log("role", role);
    res.render('Home/Home', { login, role });
  }



});

// sign up page
router.get('/signup', (req, res) => {
  res.render('Home/SignUp');
});

router.post('/signup', (req, res,next) => {
  // Code to fetch data from the API goes here
  axios.post(process.env.BASE_URL + '/api/signup', req.body)
    .then((response) => {
      if (response.data.statusCode == 500) {
        return next(response.data.message);
      }
      res.redirect('/login');

    })
    .catch((error) => {
      console.log("this i want", error);
      next(error);
    });
});

// login page
router.get('/login', (req, res) => { res.render('Home/Login'); });
router.post('/login', (req, res, next) => {
  axios.post(process.env.BASE_URL + '/api/login', req.body)
    .then((response) => {
      
      // flag = 1;
      var decodedId;
      jwt.verify(response.data.data.token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          res.send({ status: true, statusCode: 400, message: "Invalid token" })
          console.log("err", err);
        } else {
          console.log("decoded", decoded);
          decodedId = decoded;
        }
      })
      req.session.isAuthenticated = true;
      req.session.userId = decodedId._id;
      req.session.userRole = decodedId.role;
      console.log("ll", req.session);
      console.log('response.data', response.data);
      res.redirect('/');

    })
    .catch((error) => {
      console.log("this i want", error);
      res.send({ status: false, statusCode: 500, message: "Login failed" })
    });


});

// Profile page

router.get('/profile', isLoginRequired, async (req, res, next) => {
  console.log("in profile", req.session);
  axios.get(process.env.BASE_URL + '/api/profile', { params: { "id": req.session.userId, "role": req.session.userRole } })
    .then((response) => {
      
      if (!req.session.userId) {
        login = 0;
      }
      else {
        login = 1;
      }
      console.log('response.data.profile', response);
      var role = response.data.data.user.role;
      console.log("role here", role);
      // flag = 1;
      res.render('Profile/Profile', { "user": response.data.data.user, role, login });
    })
    .catch((error) => {
      console.log(error);
      res.send({ status: false, statusCode: 400, "message": "Might be something went wrong" })
    });
});

router.post('/profile', isLoginRequired, uploadFile.single("profileImage"), async (req, res, next) => {
  // Code to fetch data from the API goes here
  console.log("in profile", req.session);
  console.log("in profile body", req.body);
  console.log("in profile file", req.file);
  
  req.body.profileImage = req.file;
  axios.post(process.env.BASE_URL + '/api/profile', { "id": req.session.userId, "role": req.session.userRole, "data": req.body })
    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      console.log('response profile', response);
      res.redirect('/profile');

    })
    .catch((error) => {
      console.log(error);
    });
});

// mentors 
router.get('/mentors', (req, res, next) => {
  // Code to fetch data from the API goes here
  console.log("req.query", req.query);
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    axios.get(process.env.BASE_URL + '/api/getMentors', { params: req.query })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        login = 1;
        var role = req.session.userRole;
        res.render('Mentor/Mentor', { "mentor": response.data.data.mentors , login, role});
      })
      .catch((error) => {
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  } else {
    if (!req.session.userId) {
      login = 0;
    }
    else {
      login = 1;
      var role = req.session.userRole;
    }
    axios.get(process.env.BASE_URL + '/api/getMentors', { params: req.query })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        res.render('Mentor/AllMentors', { "mentors": response.data.data.mentors, login, role });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
});


// Internship 
router.get('/uploadInternship', isLoginRequired, (req, res) => {
  if (req.session.userRole == "company") {
    res.render('Internship/UploadInternship');
  }
  else {
    res.redirect('/');
  }
});

router.post('/uploadInternship', isLoginRequired, (req, res, next) => {
  req.body.companyId = req.session.userId;
  axios.post(process.env.BASE_URL + '/api/uploadInternship', req.body)
    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      res.render('Internship/UploadInternship', { "message": response.data });
    })
    .catch((error) => {
      res.render('Internship/UploadInternship', { "message": error });
      console.log(error);
    });
});

router.get("/internships", (req, res, next) => {
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    console.log("req.query", req.query);
    axios.get(process.env.BASE_URL + '/api/allInternship', { params: { "request": req.query, "id": req.session.userId, "role": req.session.userRole } })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        login = 1;
        var role = req.session.userRole;
        console.log("response here", response.data);
        res.render('Internship/InternshipDetails', { "internship": response.data.data.allinternship,"userId": req.session.userId, login, role });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
  else {
    if (!req.session.userId) {
      login = 0;
    }
    else {
      login = 1;
      var role = req.session.userRole;
    }
    axios.get(process.env.BASE_URL + '/api/allInternship', { params: req.query })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        res.render('Internship/Internships', { "internships": response.data, "userId": req.session.userId, "userRole": req.session.userRole , login, role});
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })

      });
  }
});



//Industrial Project

router.get('/uploadIndustrialProject', (req, res) => {
  if (req.session.userRole == "company") {
    res.render('IndustrialProject/UploadIndustrialProject');
  }
  else {
    res.redirect('/');
  }
});

router.post('/uploadIndustrialProject', isLoginRequired, (req, res,next) => {
  // Code to fetch data from the API goes here
  req.body.companyId = req.session.userId;
  axios.post(process.env.BASE_URL + '/api/uploadIndustrialProject', req.body)
    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      res.render('IndustrialProject/UploadIndustrialProject', { "message": response.data });
    })
    .catch((error) => {
      res.render('IndustrialProject/UploadIndustrialProject', { "message": error });
      console.log(error);
    });
});

router.get("/industrialProjects", (req, res, next) => {
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    console.log("req.query", req.query);
    axios.get(process.env.BASE_URL + '/api/allIndustrialProjects', { params: { "request": req.query, "id": req.session.userId, "role": req.session.userRole } })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        login = 1;
        var role = req.session.userRole;
        console.log("response here", response.data);
        res.render('IndustrialProject/IndustrialProjectDetails', { "industrialProject": response.data.data.allIndustrialProject,"userId": req.session.userId, login, role });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
  else {
    if (!req.session.userId) {
      login = 0;
    }
    else {
      login = 1;
      var role = req.session.userRole;
    }
    axios.get(process.env.BASE_URL + '/api/allIndustrialProjects', { params: req.query })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        console.log("response here", response.data);
        res.render('IndustrialProject/IndustrialProjects', { "industrialProject": response.data, "userId": req.session.userId, "userRole": req.session.userRole , login, role});
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })

      });
  }
});


// Research Paper
router.get('/uploadResearchPaper', isLoginRequired, (req, res) => {
  if (req.session.userRole == "mentor" || req.session.userRole == "student") {
    res.render('ResearchPaper/UploadResearchPaper');
  }
  else {
    res.redirect('/');
  }
});

router.post('/uploadResearchPaper', isLoginRequired, (req, res, next) => {
  req.body.userId = req.session.userId;
  req.body.userRole = req.session.userRole;
  console.log("req.body", req.body);
  axios.post(process.env.BASE_URL + '/api/uploadResearchPaper', req.body)
    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      console.log("response", response.data);
      res.render('ResearchPaper/UploadResearchPaper', { "message": response.data });
    })
    .catch((error) => {
      console.log(error);
      res.render('ResearchPaper/UploadResearchPaper', { "message": error });
    });
});


router.get('/researchPapers', (req, res,next) => {
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    console.log("req.query", req.query);
    axios.get(process.env.BASE_URL + '/api/allResearchPapers', { params: { "request": req.query, "id": req.session.userId, "role": req.session.userRole } })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        login = 1;
        var role = req.session.userRole;
        console.log("response here", response.data);
        res.render('ResearchPaper/ResearchPaperDetails', { "researchPaper": response.data ,"userId": req.session.userId, login, role});
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
  else {
    axios.get(process.env.BASE_URL + '/api/allResearchPapers', { params: req.query })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        if (!req.session.userId) {
          login = 0;
        }
        else {
          login = 1;
          var role = req.session.userRole;
        }
        console.log("response here", response.data);
        res.render('ResearchPaper/ResearchPapers', { "researchPapers": response.data , login, role});
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })

      });
  }
});

// Product section 
router.get("/uploadProduct", isLoginRequired, (req, res) => {
  if (req.session.userRole == "mentor" || req.session.userRole == "student") {
    res.render('SellProduct/UploadProduct');
  }
  else {
    res.redirect('/');
  }
});

router.post("/uploadProduct", isLoginRequired,uploadFile.array("productPhotos",
  maxCount = 5
) ,(req, res,next) => {
  console.log("here..", req.body)
  console.log("here..", req.session.userId)
  req.body.userId = req.session.userId;
  var role = req.session.userRole;

  console.log("req.body files index ma", req);
  req.body.photosData = req.files;
  axios.post(process.env.BASE_URL + '/api/uploadProduct', { "data": req.body, "role": role })
    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      res.render('SellProduct/UploadProduct', { "message": response.data });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get("/products", (req, res, next) => {

  axios.get(process.env.BASE_URL + '/api/getProducts', { params: req.query })
    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      if (!req.session.userId) {
        login = 0;
      }
      else {
        login = 1;
        var role = req.session.userRole;
      }
      console.log("response here", response.data);
      res.render('SellProduct/GetProducts', { "products": response.data , login, role});
    })
    .catch((error) => {
      console.log(error);
      res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })

    });

});


//  project repository
router.get('/uploadProjectRepository', isLoginRequired, (req, res) => {
  res.render('ProjectRepository/uploadProjectRepository');
});


router.post('/uploadProjectRepository', isLoginRequired, uploadFile.fields(
  [
    { name: 'projectImage', maxCount: 1 },
    { name: 'projectReport', maxCount: 1 }
  ]
), (req, res, next) => {
  // Code to fetch data from the API goes here
  console.log("req.only", req);
  console.log("req.file befor ajax", req.file);
  console.log("req.files befor ajax", req.files);
  req.body.uploadFileData = req.files;
  var userId = req.session.userId;
  axios.post(process.env.BASE_URL + '/api/uploadProjectRepository', req.body, { params: { "userId": userId } })

    .then((response) => {
      if(response.data.statusCode == 500){
        next(response.data.message);
      }
      res.render('ProjectRepository/uploadProjectRepository', { "message": response.data });
    })
    .catch((error) => {
      res.render('ProjectRepository/uploadProjectRepository', { "message": error });

    });
});


router.get("/ProjectRepository", (req, res) => {
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    console.log("req.query", req.query);
    axios.get(process.env.BASE_URL + '/api/getProjectRepository', { params: { "request": req.query, "id": req.session.userId, "role": req.session.userRole } })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        console.log("response here", response.data);
        login = 1;
        var role = req.session.userRole;
        res.render('ProjectRepository/projectRepositoryDetails', { "projectRepository": response.data.data.ProjectRepository, login, role });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
  else {
    if (!req.session.userId) {
      login = 0;
    }
    else {
      login = 1;
      var role = req.session.userRole;
    }
    axios.get(process.env.BASE_URL + '/api/getProjectRepository', { params: req.query })
      .then((response) => {
        if(response.data.statusCode == 500){
          next(response.data.message);
        }
        console.log('response here', response.data);
        res.render('ProjectRepository/projectRepositories', { "projectRepositories": response.data.data.ProjectRepository, login, role });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })

      });
  }
});

// Notification
router.get("/notification", isLoginRequired, (req, res) => {
  axios.get(process.env.BASE_URL + '/api/getNotification', { params: { "userId": req.session.userId, "userRole": req.session.userRole } })
    .then((response) => {
      console.log("response here", response.data);
      res.send(response.data.data.notifications);
    })
    .catch((error) => {
      console.log(error);
    });
}
);

router.get("/deleteNotification", isLoginRequired, (req, res) => {
  axios.get(process.env.BASE_URL + '/api/deleteNotification', { params: { "userId": req.session.userId, "userRole": req.session.userRole, "notificationId": req.query.notificationId } })
    .then((response) => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
}
);


// logout page
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });

});

router.post('/resumeUpload', uploadFile.single('resumeFile'), (req, res) => {
  console.log("req.only", req);
  console.log("req.file befor ajax", req.file);
  console.log("req.files befor ajax", req.files);
  res.send({ "message": "File uploaded successfully" , "file": req.file});
});

router.post('/resumeUploadIDP', uploadFile.single('resumeFileIDP'), (req, res) => {
  console.log("req.only", req);
  console.log("req.file befor ajax", req.file);
  console.log("req.files befor ajax", req.files);
  res.send({ "message": "File uploaded successfully" , "file": req.file});
});











module.exports = router;
