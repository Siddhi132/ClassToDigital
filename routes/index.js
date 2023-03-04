
require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { isAuth, isLoginRequired } = require('../middleware/Authentication/SetIsAuthenticate');



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

router.post('/signup', (req, res) => {
  // Code to fetch data from the API goes here
  axios.post(process.env.BASE_URL + '/api/signup', req.body)
    .then((response) => {
      res.redirect('/login');

    })
    .catch((error) => {
      console.log(error);
      res.redirect('/signup');
    });
});

// login page
router.get('/login', (req, res) => { res.render('Home/Login'); });
router.post('/login', (req, res) => {
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
      res.send({ status: false, statusCode: 500, message: "Login failed" })
      console.log(error);
    });


});

// Profile page

router.get('/profile', isLoginRequired, async (req, res) => {
  console.log("in profile", req.session);
  axios.get(process.env.BASE_URL + '/api/profile', { params: { "id": req.session.userId, "role": req.session.userRole } })
    .then((response) => {
      console.log('response.data.profile', response);
      var role = response.data.data.user.role;
      console.log("role here", role);
      // flag = 1;
      res.render('Profile/Profile', { "user": response.data, role });
    })
    .catch((error) => {
      console.log(error);
      res.send({ status: false, statusCode: 400, "message": "Might be something went wrong" })
    });
});

router.post('/profile', isLoginRequired, async (req, res) => {
  // Code to fetch data from the API goes here
  console.log("in profile", req.session);
  console.log("in profile body", req.body);
  axios.post(process.env.BASE_URL + '/api/profile', { "id": req.session.userId, "role": req.session.userRole, "data": req.body })
    .then((response) => {
      console.log('response profile', response);
      res.redirect('/profile');

    })
    .catch((error) => {
      console.log(error);
    });
});

// mentors 
router.get('/mentors', (req, res) => {
  // Code to fetch data from the API goes here
  console.log("req.query", req.query);
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    axios.get(process.env.BASE_URL + '/api/getMentors', { params: req.query })
      .then((response) => {
        res.render('Mentor/Mentor', { "mentor": response.data.data.mentors });
      })
      .catch((error) => {
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  } else {
    axios.get(process.env.BASE_URL + '/api/getMentors', { params: req.query })
      .then((response) => {
        res.render('Mentor/AllMentors', { "mentors": response.data.data.mentors });
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

router.post('/uploadInternship', isLoginRequired, (req, res) => {
  req.body.companyId = req.session.userId;
  axios.post(process.env.BASE_URL + '/api/uploadInternship', req.body)
    .then((response) => {
      res.render('Internship/UploadInternship', { "message": response.data });
    })
    .catch((error) => {
      res.render('Internship/UploadInternship', {"message": error});
      console.log(error);
    });
});

router.get("/internships", (req, res) => {
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    console.log("req.query", req.query);
    axios.get(process.env.BASE_URL + '/api/allInternship', { params :{"request":req.query,"id":req.session.userId,"role":req.session.userRole} })
      .then((response) => {
        console.log("response here", response.data);
        res.render('Internship/InternshipDetails', { "internship": response.data });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
  else {
    axios.get(process.env.BASE_URL + '/api/allInternship', { params: req.query })
      .then((response) => {
        res.render('Internship/Internships', { "internships": response.data });
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

router.post('/uploadIndustrialProject',isLoginRequired, (req, res) => {
  // Code to fetch data from the API goes here
  req.body.companyId = req.session.userId;
  axios.post(process.env.BASE_URL +'/api/uploadIndustrialProject',req.body)
    .then((response) => {
      res.render('IndustrialProject/UploadIndustrialProject', {"message": response.data});
    })
    .catch((error) => {
      res.render('IndustrialProject/UploadIndustrialProject', {"message": error});
      console.log(error);
    });
});

router.get("/industrialProjects", (req, res) => {
  if (req.query._id) {
    if (!req.session.userId) {
      res.redirect('/login');
    }
    console.log("req.query", req.query);
    axios.get(process.env.BASE_URL + '/api/allIndustrialProjects', { params :{"request":req.query,"id":req.session.userId,"role":req.session.userRole} })
      .then((response) => {
        console.log("response here", response.data);
        res.render('IndustrialProject/IndustrialProjectDetails', { "industrialProject": response.data });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })
      });
  }
  else {
    axios.get(process.env.BASE_URL + '/api/allIndustrialProjects', { params: req.query })
      .then((response) => {
        console.log("response here", response.data);
        res.render('IndustrialProject/IndustrialProjectDetails', { "industrialProject": response.data });
      })
      .catch((error) => {
        console.log(error);
        res.send({ status: false, statusCode: 500, "message": "Might be something went wrong" })

      });
  }
});












module.exports = router;
