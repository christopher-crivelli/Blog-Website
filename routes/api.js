var express = require("express");
var router = express.Router(); 
var Category = require("../models/category");
var Email   = require("../models/email");

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


module.exports = router;