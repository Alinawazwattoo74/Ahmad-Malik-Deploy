const BlogSet = require("../models/blogModel")

const IsBlog = async (req, res, next) => {
    try {
        const blogs = await BlogSet.find({});
        if (blogs.length === 0 && req.originalUrl!=="/blogSet") {
            res.redirect("/blogSet");
        } else {
            next(); 
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = IsBlog;