const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Product", productSchema);
