const mongoose = require("mongoose");
const BlogSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
  desc: {
    type: String,
    trim: true,
  },
});
let Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
