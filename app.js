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
    multer      = require('multer'),
    dotenv      = require('dotenv').config();
    
// ROUTES
var indexRoutes = require("./routes/index"),
    blogRoutes  = require("./routes/blog"),
    portfolioRoutes = require("./routes/portfolio");
    
// APP SETUP
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/portfolio", { useNewUrlParser: true });
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// Cloudinary setup 

var storage     = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

var upload = multer({storage: storage, fileFilter: imageFilter});

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dqszqcsyv', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


// PASSPORT CONFIGURATION 
app.use(require("express-session")({
    secret: "dYx0rmPSfYlxnhaZCFZU8YHrJlMHpj65",
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
//seedDB();

// ROUTES
app.use(indexRoutes);
app.use(blogRoutes);
app.use(portfolioRoutes);
app.use("/api", apiRoute); 


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
    //res.redirect("/blog");
}

// SET UP SERVER
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Kris' Portfolio is running!"); 
});