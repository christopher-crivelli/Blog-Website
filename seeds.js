var mongoose = require("mongoose");
var Blog = require("./models/blog");
var Category = require("./models/category");

var data = [
    {
        title: "Blog Post 1",
        isFeatured: "1",
        image: "https://farm1.staticflickr.com/638/23279417435_e925d1098c.jpg",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        title: "Blog Post 2",
        image: "https://farm6.staticflickr.com/5145/5734731040_4cb65037d2.jpg",
        body: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"    },
    {
        title: "Blog Post 3",
        image: "https://farm5.staticflickr.com/4769/39584615865_cdced3ced2.jpg",
        body: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    },
    {
        title: "Blog Post 4",
        image: "https://farm5.staticflickr.com/4769/39584615865_cdced3ced2.jpg",
        created: "2018-09-15T22:16:09.359Z",
        body: "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
    }
]

var categoryData = [
    { 
        name: "Industry Research"
    },
    {
        name: "Strategy"
    },
    { 
        name: "Personal"
    },
    {
        name: "Public Relations"
    },
]

function seedDB(){
    // removeCollection(Blog);
    // removeCollection(Category);
    addCategories();
    // addBlogs();
    // addBlogs();
}

function removeCollection(col){
    col.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("Removed " + col.modelName + "s!");
    })
}

function addBlogs(){
    data.forEach(function(seed){
        Blog.create(seed, function(err, blog){
            if(err){
                console.log(err)
            } else {
                console.log("added a post");
                var foundCategory = Category.find({name: "Strategy"});
                blog.category.push(foundCategory._id);   
                blog.save();
            }
        });
    });
}

function addCategories(){
    categoryData.forEach(function(seed){
       Category.create(seed, function(err, category){
           if(err){
               console.log(err);
           } else {
               console.log("Added Category");
           }
       }); 
    });
}

module.exports = seedDB;