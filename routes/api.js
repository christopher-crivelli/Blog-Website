var express = require("express");
var router = express.Router(); 
var Category = require("../models/category");
var Email   = require("../models/email");
var middleware = require("../middleware")

// Subscribe user to email list 
router.post('/email', function(req, res){
    Email.find({email: req.body.email.email}, function(err, foundEmail){
        if(foundEmail.length > 0){
            res.send("duplicate");
        } else {
            Email.create(req.body.email, function(err, addedEmail){
                console.log(addedEmail);
                if(err){
                   console.log(err);
                   res.status("400");
                   res.send("error");
                } else {
                    res.send("success");
                }
            });    
        }
    });
});

router.post('/category', middleware.isAdmin, function(req, res){
    Category.find({name: req.body.category.name}, function(err, foundCategory){
        if(foundCategory.length > 0){
            res.send("duplicate");
        } else {
            Category.create(req.body.category, function(err, addedCategory){
                console.log(addedCategory);
                if(err){
                   console.log(err);
                   res.status("400");
                   res.send("error");
                } else {
                    res.send("success");
                }
            });    
        }
    });
});

module.exports = router;