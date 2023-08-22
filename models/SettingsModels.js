const mongoose = require("mongoose");
const settiing = new mongoose.Schema({
  
  post_limit : {
        type : Number,
  },_id:{
    type : String,
  }

});


module.exports = mongoose.model("setting",settiing)