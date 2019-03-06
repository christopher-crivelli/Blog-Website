var express                 = require("express"),
    app                     = express(),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    LocalStrategy           = require("passport-local"),
    passport                = require("passport"),
    expressSession          = require("express-session"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    seedDB                  = require("./seeds"),
    Blog                    = require("./models/blog"),
    methodOverride          = require("method-override"),
    User                    = require("./models/user"),
    Comment                 = require("./models/comment"),
    Category                = require("./models/category"),
    apiRoute                = require("./routes/api"),
    moment                  = require('moment'),
    dotenv                  = require('dotenv').config(),
    flash                   = require('connect-flash');
    
// ROUTES
var indexRoutes = require("./routes/index"),
    blogRoutes  = require("./routes/blog"),
    commentRoutes = require("./routes/comment");
    
// APP SETUP
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect(process.env.databaseURL, { useNewUrlParser: true });
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.locals.moment = require('moment');
app.use(flash());


// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Sends user information with all routes 
app.use(function(req, res, next){
    res.locals.currentUser = req.user; 
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    Blog.find().sort({created: -1}).exec(function(err, blogs){
        if(err){
            console.log(err);
        } 
        app.locals.allBlogs = blogs;
    });
    res.locals.page_name = "";
    Category.find().sort({name:1}).exec(function(err, categories){
      if(err){
          console.log(err);
      }
      res.locals.categories = categories; 
  });
    // console.log(req.user);
    next();
});

// Database Seeding for removing + adding blog posts and portfolios 
// seedDB();

// ROUTES
app.use(indexRoutes);
app.use(blogRoutes);
app.use("/api", apiRoute); 
app.use("/blog/:id/comments", commentRoutes);

app.get('*', function(req, res){
    res.render('404');
})

// SET UP SERVER
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Kris' Portfolio is running!"); 
});