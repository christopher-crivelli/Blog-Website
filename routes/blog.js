var express     = require("express");
var router      = express.Router();
var Blog = require("../models/blog");
var User = require("../models/user");
var Category = require("../models/category");
var featuredBlogsList = [];
var middleware = require("../middleware");

var getFeaturedBlogs = function(){
    Blog.find({"isFeatured": "1"}).sort({created: -1}).exec(function (err, featuredBlogs){
        if(err){
            console.log(err);
        } else {
            featuredBlogsList = featuredBlogs; 
        }
    });
}

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
        res.render("new", {categories:categories});
    });
});

// Create new blog 
router.post("/blog", middleware.isAdmin, function(req, res){
    //req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
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

// SHOW Blog 
router.get("/blog/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
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
        res.send('');
    });
});

module.exports = router;