var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
    title: String,
    image: 
        {
        type: String, 
        default: ""
        },  
    body: String, 
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    category: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },
        name: String
    }],
    isFeatured: {
        type: String,
        default: "0"
    },
    created: 
        {type: Date, default: Date.now}
})   

module.exports = mongoose.model("Blog", blogSchema);