

const mongoose=require('mongoose');

const CategorySchema=new mongoose.Schema({
    internship:{
        type:Object,
        required:true
    },
    industrialProject:{
        type:Object,
        required:true
    }
});
module.exports=mongoose.model("category",CategorySchema);








