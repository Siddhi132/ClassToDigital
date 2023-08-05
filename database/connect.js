uri = "mongodb://localhost/ClassToDigital";
const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = connectDB;