const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://alistechworld40:alistechworld40@cluster0.yrkrion.mongodb.net/?retryWrites=true&w=majority").then(()=>{
     console.log("Database Connected ....");
}).catch((err)=>{
      console.log(err);
});