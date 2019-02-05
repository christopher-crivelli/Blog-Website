var express     = require("express");
var router      = express.Router();

var passport    = require("passport");
var Blog = require("../models/blog");
var User = require("../models/user");

router.get("/", function(req, res){
    var maxBlogs = 3;
    Blog.find().sort({created: -1}).exec(function(err, blogs){
        if(err){
            console.log(err);
        } else {
            res.render("index", {blogs:blogs, maxBlogs: maxBlogs}); 
        }
    });    
});

router.get("/login", function(req, res){
    var error = null;
    res.render("login", {error:error}); 
});

router.post("/login", function(req, res){
    passport.authenticate('local', function(err, user, info) {
    if (err) {
        console.log(err);
        res.render("login", {error:err.message})
    }
    if (!user) { 
        return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
        if (err) { 
            console.log(err);
            res.render("login", {error:err.message}); 
        }
        return res.redirect('/blog');
    });
  })(req, res);
});

router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            var error = err.message;
            return res.send(error);
            //return res.render("register", {error:error});
        }
        newUser.isAdmin = req.body.isAdmin;
        newUser.save();
        passport.authenticate("local")(req, res, function(){
            res.send("Successfully registered + logged in as " + req.user.username);
        });
    }); 
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/blog");
});

// Checks if user is logged in 
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

// Checks if user is an admin user 
function isAdmin(req, res, next){
    if(req.isAuthenticated() && req.user.isAdmin ==="1"){
            return next();
    }
    res.send("User Not Authorized")
    //res.redirect("/blog");
}

module.exports = router;