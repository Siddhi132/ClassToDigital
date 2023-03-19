const product = require('../../models/Products');

const verifyproduct = async (req,res) => {
    console.log("req.body",req.body);
    try {
        
        await product.findOneAndUpdate({ _id: req.body.id }, { $set: { verified: true } });
        res.send({ status: true, statusCode: 200, message: "Product verified successfully" });
    }
    catch (err) {
        console.log("err", err);
        res.send({ status: false, statusCode: 500, message: "Error During Verifying Product" });
    }
}
module.exports = { verifyproduct };

