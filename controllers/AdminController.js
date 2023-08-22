const blogModel = require("../models/blogModel");
const UserModel = require("../models/UserModels");

const blogSet= async(req,res) => {
    
    try {

        const blogsfind = await blogModel.find({});
        if(blogsfind.length > 0 ) {
              res.redirect("/login")
        } else  {
             res.render("BlogSetUp")
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"check Internet connection plz"})
    }

}

const BlogSetData = async(req,res) => {


    try {

        if(req.file) {
            const {title,description} = req.body;
            const imagepath = req.file.path;
            const GetBlog = new blogModel({
                blog_title : title,
                descripton : description,
                blog_logo : imagepath
            });

            const Data = await GetBlog.save();
            console.log(Data);

            const {name,email,password} = req.body;

            const UserData = new UserModel({
               Name : name,
               email,
               password,
               Is_Admin:1
            });

            const d2 = await UserData.save();
            res.redirect("/")
        }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:"Something Went Wrong"})
    }

}



module.exports = {
     blogSet,
     BlogSetData
}