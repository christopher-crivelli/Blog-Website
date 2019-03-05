var mongoose = require("mongoose");

var emailSchema = mongoose.Schema({
    email: String,
    created: {
      type: Date,
      default: Date.now
   }
});

module.exports = mongoose.model("Email", emailSchema);