
const Category = require("../../models/Category");

const Categories = async (req, res) => {
    try {
      const val = await Category.find();
      res.send({ status: true, statusCode: 200, message: "categories fetched successfully", data: { categories: val } });
    }
    catch (err) {
      res.send({ status: false, statusCode: 500, message: "category not fetched" });
    }
  }

module.exports = { Categories };