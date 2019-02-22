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
        console.log(err);
        res.render("login")
    }
    if (!user) { 
        return res.redirect('/login'); 
    }
    req.logIn(user, function(err) {
        if (err) { 
            console.log(err);
            res.render("login", {page_name: 'login'}); 
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
            return res.render("register");
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

module.exports = router;