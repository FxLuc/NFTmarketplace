const mongoose = require("mongoose")

let productSchema = mongoose.Schema({
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
})

module.exports = mongoose.model("Product", productSchema)
