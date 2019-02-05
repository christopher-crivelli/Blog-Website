var express = require("express");
var router = express.Router(); 
var Category = require("../models/category");

router.get("/blog/categories", function(req, res){
    Category.find({}, function(err, categories){
       if(err){
           console.log(err);
       }
           res.json(categories);
    });
});

module.exports = router;