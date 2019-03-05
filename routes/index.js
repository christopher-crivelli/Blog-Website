var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var Blog = require("../models/blog");
var User = require("../models/user");
var middleware = require("../middleware");

router.get("/", function(req, res){
    Blog.find().sort({created: -1}).exec(function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs:blogs, page_name: 'index'}); 
        }
    });    
});

router.get("/login", function(req, res){
    res.render("login", {page_name: "login"}); 
});

router.post("/login", function(req, res){
    passport.authenticate('local', function(err, user, info) {
    if (err) {
        req.flash("error", err.message);
        res.render("login");
    }
    if (!user) { 
        return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
        if (err) { 
            req.flash("error", err.message);
            res.render("login", {page_name: 'login'}); 
        }
        return res.redirect('/blog');
    });
  })(req, res);
});

router.post("/register", function(req,res){
    User.find({email: req.body.email.email}, function(err, foundUser){
        if(err){
            console.log(err);
        }
        if(foundUser.length > 0){
            req.flash("error", "A user with the given email already exists!");
            return res.redirect("/login");
        } else {
            var newUser = new User({username: req.body.username});
            User.register(newUser, req.body.password, function(err, user){
                if(err){
                    req.flash("error", err.message);
                    return res.redirect("/login");
                } else if(User.find({email: req.body.email}))
                newUser.email = req.body.email;
                newUser.save();
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "Successfully registered + logged in as " + req.user.username);
                    res.redirect("/blog");
                });
            }); 
        }
    });
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out. See you soon!");
    res.redirect("back");
});

module.exports = router;