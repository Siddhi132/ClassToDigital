
const Product = require('../../models/Products');
const StudentProfile = require('../../models/StudentProfile');
const MentorProfile = require('../../models/MentorProfile');
const uploadProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body.data);
        const val = await newProduct.save();
        const role=req.body.role;
        console.log("req.body",req.body);
        if(role=="student"){
            console.log("req.body.userId",req.body.data.userId);
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
        else if(role=="mentor"){
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
        res.send({ status: false, statusCode: 500, message: "Product not added" });
      }
    
}

const getProducts = async (req, res) => {
  console.log('req.query length', Object.keys(req.query).length);
  console.log("id..",req.query.id);

  try {
    if (Object.keys(req.query).length > 0) {
      console.log('req.query here', req.query);
      let val;
      val = await Product.find(req.query);
      
      if (val.length == 0) {
        res.send({ status: false, statusCode: 400, 'message': "0 Product found" });
      }
      else {
        res.send({ status: true, statusCode: 200, 'message': 'Product found successfully', data:{'allProducts': val}});
      }
    }
    else {
      console.log('req.query');
      const val = await Product.find();
      res.send({ status: true, statusCode: 200, 'message': 'Product found successfully', data:{'allProducts': val} });
    }
  }
  catch (err) {
    console.log('err', err);
    res.send({ status: false, statusCode: 400, 'message': "Product not found" });
  }

}



module.exports = { uploadProduct,getProducts };