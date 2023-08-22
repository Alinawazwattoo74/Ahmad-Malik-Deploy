const express = require("express");
const app = express();

const http = require("http").createServer(app);
const {Server} = require("socket.io")
const io = new Server(http,{})


const path = require("path");
const hbs = require("hbs");
const cookies = require("cookie-parser");

require("./database/Db");

app.use("/public", express.static(path.join(__dirname, "public")));

const partialspath = path.join(__dirname, "partials");
hbs.registerPartials(partialspath);

// for admin

app.use(cookies());

const Admin = require("./routes/AdminRoute");
const IsBlog = require("./middlewares/IsBlog");
const user_Routes = require("./routes/userrotes");
app.use(IsBlog);
app.use("/", Admin);
app.use("/",user_Routes)
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/frontend/views"));


io.on("connection",function(socket){
     console.log("user connected");
     socket.on("post_data",function(formdata){
         console.log(formdata);
         socket.broadcast.emit("post_data",formdata)
     })
})

http.listen(3000, () => {
  console.log("Server Starts Allah Hu Akbar");
});
