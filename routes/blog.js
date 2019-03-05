var express     = require("express");
var router      = express.Router();
var Blog = require("../models/blog");
var User = require("../models/user");
var Category = require("../models/category");
var featuredBlogsList = [];
var middleware = require("../middleware");
var Comment = require("../models/comment");
var multer = require('multer');
var dotenv = require('dotenv').config;

var storage     = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dqszqcsyv', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


var getFeaturedBlogs = function(){
    Blog.find({"isFeatured": "1"}).sort({created: -1}).exec(function (err, featuredBlogs){
        if(err){
            console.log(err);
        } else {
            featuredBlogsList = featuredBlogs; 
        }
    });
};

router.get("/blog", function(req, res){
    getFeaturedBlogs();
    Blog.find().sort({created: -1}).exec(function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("blog", {blogs:blogs, featuredBlogs:featuredBlogsList, page_name:'blog'}); 
        }
    });    
});

// New blog template
router.get("/blog/new", middleware.isAdmin, function(req, res){
    // gets all category tags and render the new blog template
    Category.find().sort({name: 1}).exec(function(err, categories){
        if(err){
            console.log(err);
        } 
        res.render("new", {categories:categories});
    });
});

// Create new blog 
router.post("/blog", middleware.isAdmin, upload.single('image'), function(req, res){
    
    if(!req.file){
        //req.flash("error", "Please upload a file");
        res.redirect("back");
    }
    
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    cloudinary.uploader.upload(req.file.path, function(result) {
        // add cloudinary url for the image to the campground object under image property
        req.body.blog.image = result.secure_url;
        // add author to campground
        req.body.blog.author = {
            id: req.user._id,
            username: req.user.username
        }
        Blog.create(req.body.blog, function(err, newBlog){
            if(err){
                req.flash("error", err.message);
                res.render("new");
            } else {
                console.log(req.body);
                Category.findById(req.body.category, function(err, foundCategory){
                    if(err){
                        console.log(err);
                    }
                    newBlog.category.push(foundCategory);
                    newBlog.save();
                });
                // Then redirect to INDEX 
                res.redirect("/blog");
            }
        });
    });
});

// SHOW Blog 
router.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
      if(err){
          res.redirect("/blog");
      } else {
          res.render("show", {blog: foundBlog, page_name:'blog'});
      }
   });
});

// DELETE BLOG 
router.delete("/blog/:id", middleware.isAdmin, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            res.redirect("/blog/:id");
        } else {
            res.redirect("/blog");
        }
    });
});

// EDIT ROUTE
router.get("/blog/:id/edit", middleware.isAdmin, function(req,res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blog");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
});

// UPDATE ROUTE
router.put("/blog/:id", function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blog");
        } else {
            res.redirect("/blog/" + req.params.id);
        }
    });
});

// LIKE BLOG 
router.post("/blog/:id/like", function(req, res){
   Blog.update({_id: req.params.id}, {$inc: {likes: 1}}, {}, (err, numberAffected) => {
        if(err){
            console.log(err);
        }    
        res.send('Liked!');
    });
});

module.exports = router;