var express     = require('express'), 
    router      = express.Router({mergeParams: true}),
    Comment     = require('../models/comment'),
    Blog        = require('../models/blog'),
    User        = require('../models/user'),
    middleware  = require('../middleware');

router.post("/", middleware.isLoggedIn, function(req, res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err.message);
            // req.flash("error", "Blog not found");
            res.redirect("/blog")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    // req.flash("error", "Error creating comment");
                    res.redirect("/blog/" + blog._id);
                } else if(req.body.comment.text.length === 0){
                    return res.redirect("back");
                } else {
                    // add username and id to comment 
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username;
                    // save comment 
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect("/blog/" + blog._id);
                }
            });
        }
    });  
});

module.exports = router;