const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
      blog_title : {
         type : String,
         required : true
      },
      blog_logo : {
        type : String,
         required : true
      },
      descripton : {
        type : String,
        required : true
      },Creator : {
          type : mongoose.Schema.ObjectId,
          ref : "user",
      },CreatedAt : {
          type : Date,
          default : new Date().toString()
      },
      comments: [{
        name: String,
        comment: String,
        mail:String,
        replies : [
          {
              replyname : String,
              replymsg : String,
          }
        ]
     }]
});

const Blog = new mongoose.model("Blog",BlogSchema);

module.exports = Blog