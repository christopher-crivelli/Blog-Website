var Blog = require("../models/blog"), 
    Comment = require("../models/comment");
    
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");    
};

middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated() && req.user.isAdmin ==="1"){
            return next();
    }
    res.render("login");
};

module.exports = middlewareObj;