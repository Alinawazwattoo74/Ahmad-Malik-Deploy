const express = require("express")
const AdminRoutes = new express.Router();
const AdminControler = require("../controllers/AdminController");
const multer = require("multer");
const path = require("path")
AdminRoutes.use(express.json());
AdminRoutes.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination : function(req,file,cb){
       return cb(null,"./public/images")
    },
    filename : function(req,file,cb){
    const name = Date.now()+'-'+file.originalname;
    return cb(null,name);
    }
});


const upload = multer({storage:storage});


AdminRoutes.get("/blogSet",AdminControler.blogSet);
AdminRoutes.post("/blogSet",upload.single("file"),AdminControler.BlogSetData);



module.exports = AdminRoutes