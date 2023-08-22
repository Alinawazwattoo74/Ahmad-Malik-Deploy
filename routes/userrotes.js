const express = require("express");
const user_Routes = express.Router();
const Controller = require("../controllers/usercontroller");
const Auth = require("../middlewares/Auth")
const multer = require("multer");
const path = require("path")

user_Routes.use(express.json());
user_Routes.use(express.urlencoded({extended:false}));

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


user_Routes.get("/",Controller.getHomeload)
user_Routes.get("/search",Controller.searchload)
user_Routes.get("/contact",Controller.getContact)
user_Routes.get("/Forget",Controller.Forget)
user_Routes.post("/Forget",Controller.ForgetPost)
user_Routes.post("/comments",Controller.comments)
user_Routes.post("/replycomments",Controller.replycomments)
user_Routes.get("/forgetpassword/:id",Controller.forgetpassword)
user_Routes.post("/forgetpassword",Controller.forgetpasswordUpdate)
user_Routes.post("/contact",Controller.getContactPost)
user_Routes.get("/deatail/:id",Controller.getDetailBlog)
user_Routes.get("/login",Controller.login)
user_Routes.post("/login",Controller.verifyLogin)
user_Routes.get("/dashboard",Auth,Controller.LoaddashBoard)
user_Routes.get("/register",Controller.LoadRegister)
user_Routes.post("/register",Controller.GetRegister)
user_Routes.get("/logout",Auth,Controller.getLogOut)
user_Routes.get("/createBlog",Auth,Controller.getblogload)
user_Routes.post("/createBlog",Auth,upload.single("file"),Controller.getblogloadPost)
user_Routes.post("/deletepost",Auth,Controller.deletepost)
user_Routes.get("/edit/:id",Auth,Controller.editpost)
user_Routes.get("/spinner",Controller.spinner)
user_Routes.post("/edit/:id",upload.single("file"),Auth,Controller.editpostUpdate)






module.exports = user_Routes;