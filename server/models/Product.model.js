const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let productSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    default: "default/defaut.png",
  },
});

module.exports = mongoose.model("Product", productSchema);
