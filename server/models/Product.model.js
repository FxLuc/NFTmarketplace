const mongoose = require("mongoose")

let productSchema = mongoose.Schema({
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
})

module.exports = mongoose.model("Product", productSchema)
