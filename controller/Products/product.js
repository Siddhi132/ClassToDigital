
const Product = require('../../models/Products');
const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');
const uploadProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body.data);
    console.log("req.body.data photos data", req.body.data.photosData);

    for (let i = 0; i < req.body.data.photosData.length; i++) {
      newProduct.photos.push({ name: req.body.data.photosData[i].filename, path: req.body.data.photosData[i].path.replace("public", "") });
    }
    console.log("newProduct updated product data", newProduct);

    // newProduct.photos.name =  req.body.data.uploadFileData.productImage[0].filename;
    // newProduct.photos.path = req.body.data.uploadFileData.productImage[0].filename;
    const val = await newProduct.save();
    const role = req.body.role;
    console.log("req.body", req.body);
    if (role == "student") {
      console.log("req.body.userId", req.body.data.userId);
      StudentProfile.findOneAndUpdate({ _id: req.body.data.userId }, { $push: { sellProducts: val._id } }, (err, existingUser) => {
        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Product addedd successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Product not added" });
        }

      })
    }
    else if (role == "mentor") {
      MentorProfile.findOneAndUpdate({ _id: req.body.data.userId }, { $push: { sellProducts: val._id } }, (err, existingUser) => {
        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Product addedd successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Product not added" });
        }

      })
    }


  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During Adding Product" });
  }

}

const getProducts = async (req, res) => {
  console.log('req.query length', Object.keys(req.query).length);
  console.log("id..", req.query.id);

  try {
    if (Object.keys(req.query).length > 0) {
      console.log('req.query here', req.query);
      let val;
      val = await Product.find(req.query);

      if (val.length == 0) {
        res.send({ status: false, statusCode: 400, 'message': "0 Product found" });
      }
      else {
        res.send({ status: true, statusCode: 200, 'message': 'Product found successfully', data: { 'allProducts': val } });
      }
    }
    else {
      console.log('req.query');
      const val = await Product.find();
      res.send({ status: true, statusCode: 200, 'message': 'Product found successfully', data: { 'allProducts': val } });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 500, 'message': "Error during getting  products" });
  }

}

const saveProduct = async (req, res) => {
  console.log("req.body", req.body);
  var productId = req.body.productId;
  var userId = req.body.userId;
  var role = req.body.role;

  try {
    if (role == "student") {
      StudentProfile.findOneAndUpdate({ _id: userId }, { $push: { savedProducts: productId } }, (err, existingUser) => {
        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Product saved successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Product not saved" });
        }

      })

    }
    else if (role == "mentor") {
      MentorProfile.findOneAndUpdate({ _id: userId }, { $push: { savedProducts: productId } }, (err, existingUser) => {

        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Product saved successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Product not saved" });
        }
      })
    }
  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During Saving Product" });
  }
}

const removeSavedProduct = async (req, res) => {
  console.log("req.body", req.body);
  var productId = req.body.productId;
  var userId = req.body.userId;
  var role = req.body.role;
  try {
    if (role == "student") {
      StudentProfile.findOneAndUpdate({ _id: userId }, { $pull: { savedProducts: productId } }, (err, existingUser) => {
        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Product removed successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Product not removed" });
        }

      }
      )

    }
    else if (role == "mentor") {
      MentorProfile.findOneAndUpdate({ _id: userId }, { $pull: { savedProducts: productId } }, (err, existingUser) => {
        if (!err) {
          res.send({ status: true, statusCode: 200, message: "Product removed successfully" });
        }
        else {
          console.log("err", err);
          res.send({ status: false, statusCode: 400, message: "Product not removed" });
        }

      }
      )
    }

  }
  catch (err) {
    console.log("err", err);
    res.send({ status: false, statusCode: 500, message: "Error During Removing Product" });
  }
}


module.exports = { uploadProduct, getProducts, saveProduct, removeSavedProduct };