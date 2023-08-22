const UserModels = require("../models/UserModels");
const bcrypt = require("bcrypt");
const Blogmodels = require("../models/blogModel");
const nodemailer = require('nodemailer');
const SettingsModels = require("../models/SettingsModels");



const sendEmail = async(name,lname,email,phone,msg) => {

    try {

        const transporter = nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 587,
            secure : false,
            requireTLS : true,
            auth : {
              user : "govaho920@gmail.com",
              pass :    "faailzntyhgphleh"
            }

        });
        const emailOptions = {
            from : email,
            to : "govaho920@gmail.com",
            subject : "This is An Email From Bloging website",
            text :` ${msg} from ${email} with phone no is ${phone} have first name is ${name} and last name is ${lname}`
        }

        await transporter.sendMail(emailOptions,function(error,info){
            if(error) {
                console.log(error);
            } else{
                console.log(info.response);
            }
        });
        
    } catch (error) {
        console.log(error.message);
    }

}



const sendForgetMail =  async(name,email,_id,req,res)=> {
  try {

    const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        requireTLS : true,
        auth : {
          user : "govaho920@gmail.com",
          pass :    "faailzntyhgphleh"
        }

    });
    const emailOptions = {
        from : "govaho920@gmail.com",
        to : email,
        subject : "This is An Email From Bloging website for forget password",
        html: `<p>Assalam-o-Alaikum ${name},</p><p>This is an email from our blogging website for password reset. Please click this link to reset your password: <a href="${req.protocol}://${req.get('host')}/forgetpassword/${_id}">Reset Password</a>.</p>`
    }

    await transporter.sendMail(emailOptions,function(error,info){
        if(error) {
            console.log(error);
        } else{
            console.log(info.response);
        }
    });
    
} catch (error) {
    console.log(error.message);
}

}



const SendCommentEmail = async(name,msg,email,req, res,_id) => {
  
  try {
    const transporter = nodemailer.createTransport({
      host : 'smtp.gmail.com',
      port : 587,
      secure : false,
      requireTLS : true,
      auth : {
        user : "govaho920@gmail.com",
        pass :    "faailzntyhgphleh"
      }

  });
  const emailOptions = {
      from : "govaho920@gmail.com",
      to : email,
      subject : `This is message from blogging website ${name} reply on yours comment`,
      html: `<p>Assalam-o-Alaikum,</p><p> ${name} reply on your comment tap to see </p> <a href="${req.protocol}://${req.get('host')}/deatail/${_id}">tap here</a>`
  }

  await transporter.sendMail(emailOptions,function(error,info){
      if(error) {
          console.log(error);
      } else{
          console.log(info.response);
      }
  });
    
  } catch (error) {
    console.log(error.message);
    
  }

}






const login = async(req,res) => {
    
    try {

        res.render("login")
        
    } catch (error) {
        console.log(error);
    }

}

const verifyLogin = async(req,res) => {
     try {

       const email = req.body.email;
       const password = req.body.password;
       const userData = await UserModels.findOne({email})
       if(userData) {

        const IsMatch = await bcrypt.compare(password,userData.password);
        if(IsMatch){

          Token = await userData.GenerateToken();
          console.log(Token);

          res.cookie("Allah",Token,{
            expires: new Date(Date.now() + 5500080842489) 
        })
        res.redirect("/dashboard")

        } else {
           res.render("login",{msg : "Invalid Login Credentials"})
        }

       } else {
           res.render("login",{msg : "Invalid Login Credentials"})
       }
        
     } catch (error) {
        console.log(error.message);
     }
}

const LoaddashBoard = async(req,res) => {
      try {
        const data = req.user

        const yourblogs = await Blogmodels.find({Creator:data._id})
        const yourblogscount = await Blogmodels.find({ Creator: data._id }).countDocuments();
        console.log(data);
        res.render("dashBoard",{yourblogs,yourblogscount,data})
        
      } catch (error) {
        console.log(error);
      }
}


const LoadRegister = async(req,res) => {
  
  try {

    res.render("Register")
    
  } catch (error) {
    console.log(error.message);
  }

}


const GetRegister = async(req,res) => {
    try {

      const {name,email,password} = req.body;
      const Data = new UserModels({
         Name:name,
         email,
         password,
         Is_Admin:1
      });

      Token = await Data.GenerateToken();
      console.log(Token);

      res.cookie("Allah",Token,{
        expires: new Date(Date.now() + 5500080842489) 
    })

      const datatosave = await Data.save();
      console.log(datatosave);
      res.render("login",{Success : `${name} your registeration is successfull now you can login `})
      
    } catch (error) {
      console.log(error.message);
    }
}


const getLogOut = async(req,res) => {
  
  try {
    req.user.Tokens = req.user.Tokens.filter((curr)=>{
        return curr.Token !== req.Token
    })
    res.clearCookie("Allah");
    await req.user.save();
    res.render("login",{msg : "Now You Are Logout Again login Here"})
    
  } catch (error) {
    console.log(error.message);
  }

}

const getblogload = async(req,res) => {
    try {
      res.render("createBlog")
    } catch (error) {
      console.log(error.message);
    }
}

const getblogloadPost = async(req,res) => {
    try {

      const {title,description} = req.body;
      

      if(!req.file) {
        res.render("createBlog",{msg : "Upload the banner image plz" })
      } else {
        const blogStore = new Blogmodels({
          blog_title : title,
          descripton:description,
          blog_logo : req.file.path,
          Creator : req.user._id
        });
      const data = await blogStore.save();
      res.status(200).json({ Success: true, msg: "post added successfully!", _id: data._id,data});

      }
      
    } catch (error) {
      res.status(500).json({ Success: false, msg: "An error occurred." });

    }
}


const getHomeload =  async(req,res) => {

  try {

    const blogs = await Blogmodels.find({})

    res.render("Home",{blogs})
    
  } catch (error) {
    console.log(error.message);
  }

}

const getDetailBlog = async(req,res) => {
    try {

      const blogData = await Blogmodels.findById(req.params.id);
      const userData = await UserModels.findById(blogData.Creator);
      res.render("DetailPage",{blogData,userData})
      
    } catch (error) {
      console.log(error.message);
    }
}


const searchload = async(req,res) => {
    try {
      const searchQuery = req.query.search;
      const searchresult = await Blogmodels.find({
          $or : [
           { blog_title : { $regex: new RegExp(searchQuery, 'i') }},
           { descripton : { $regex: new RegExp(searchQuery, 'i') }}
          ]
      })

      res.render("search",{searchQuery,searchresult})
      
    } catch (error) {
       console.log(error.message);      
    }
}



const getContact = async(req,res) => {
      try {

        res.render("contact")
        
      } catch (error) {
        console.log(error.message);
      }
}

const getContactPost = async(req,res) => {
  
  try {

    const {fname,LastName,email,phone,msg} = req.body;
    sendEmail(fname,LastName,email,phone,msg);
    res.render("contact",{Success : `Thanks For Contacting Us I Recived Your Message my Team Respond You Soon `})
    
  } catch (error) {
    console.log(error.message);
  }

}

const Forget = (req,res) => {


  try {

    res.render("ForgetPassword")
    
  } catch (error) {
    console.log(error.message);
  }


}

const ForgetPost = async(req,res) => {
  
  
  try {
    const email = req.body.email;
    const findData = await UserModels.findOne({email});
    if(findData) {
      sendForgetMail(findData.Name,findData.email,findData._id,req,res)
      res.render("ForgetPassword",{Success : `Check Your Email We Are Sent You A reset Password Link `})
    }

    else {
      res.render("ForgetPassword",{msg : `Email Not Found Enter valid Email `})
    }
    
  } catch (error) {
    console.log(error.message);
  }


}


const forgetpassword = async(req,res) => {
  
  try {

    const id = req.params.id;

    res.render("forgetpasswordenter",{id})
    
  } catch (error) {
    console.log(error.message);    
  }

}


const forgetpasswordUpdate = async(req,res) => {
  
  
  try {

    const {passwords,id} = req.body;
    const haspasswod = await bcrypt.hash(passwords,10)
    const update = await UserModels.findByIdAndUpdate(id,{$set:{ password:haspasswod}},{ new: true })
    res.render("login",{Success : `password has been update successfully`})

    console.log(update);
    
  } catch (error) {
    console.log(error.message);
  }

}

const comments = async(req,res) => {
    try {

      const postid = req.body.postid;

      const {comentername,msg,comentermail} = req.body;

      
const db = await Blogmodels.findByIdAndUpdate(
  postid,
  {
    $push: {
      comments: {
          name: comentername,
          comment: msg,
          mail:comentermail
      }
      }
  },
  { new: true } 
);

console.log(db);

      return res.status(200).send("Comment Added Successfully")

      
    } catch (error) {
      return res.status(500).send("not Added")
    }
}


const replycomments = async (req, res) => {
  try {
    const { comenternamereply, replymsg, blogscommentreplyId, blogscommentsided,coomentEmail } = req.body;
    
    console.log(comenternamereply, replymsg, blogscommentreplyId, blogscommentsided,coomentEmail);

    const addreply = await Blogmodels.updateOne(
  {
    "_id": blogscommentreplyId,
    "comments._id": blogscommentsided
  },
  {
    $push: {
      "comments.$.replies": {
        replyname: comenternamereply,
        replymsg: replymsg,
      }
    }
  }
);
console.log(addreply);

SendCommentEmail(comenternamereply,replymsg,coomentEmail,req, res,blogscommentreplyId)

 
      return res.status(200).send("Reply added successfully");
    
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error adding reply");
  }
};

const deletepost = async(req,res) => {
    try {

      const deletes = await Blogmodels.deleteOne({_id:req.body.postId})
      console.log(req.body.postId);
      console.log(deletes);
      res.status(200).send({success : true ,msg:"deleted post successfully"})

      
    } catch (error) {
      res.status(500).send({success : false ,msg:error.message})
    }
}

const editpost = async(req,res)=> {
     try {


      const data = await Blogmodels.findOne({_id:req.params.id})
      res.render("Edit",{data})


      
     } catch (error) {
      console.log(error.message);
     }
}


const editpostUpdate = async(req,res) => {
    try {

      const dataup = await Blogmodels.findByIdAndUpdate({_id:req.body.id},{
        $set : {
          blog_title : req.body.title,
          description : req.body.description,
          blog_logo : req.file.path
        }
      },{
         new : true
      });
      console.log(dataup);
      const data = req.user

      const yourblogs = await Blogmodels.find({Creator:data._id})
      const yourblogscount = await Blogmodels.find({ Creator: data._id }).countDocuments();
      
      res.render("dashBoard",{Success:"Your Blog Updated Successfully!",yourblogs,yourblogscount,data})
      
    } catch (error) {
      res.status(500).send({success : false ,msg:error.message})
      
    }
}

const spinner = async(req,res) => {
      res.render("spiner")
}





module.exports = {
    login,
    verifyLogin,
    LoaddashBoard,
    LoadRegister,
    GetRegister,
    getLogOut,
    getblogload,
    getblogloadPost,
    getHomeload,
    getDetailBlog,
    searchload,
    getContact,
    getContactPost,
    Forget,
    ForgetPost,
    forgetpassword,
    forgetpasswordUpdate,
    comments,
    replycomments,
    deletepost,
    editpost,
    editpostUpdate,
    spinner
}




