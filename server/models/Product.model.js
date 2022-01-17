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
    min: 0,
    default: 0,
  },
  state: {
    type: Number,
    min: 0,
    default: 0
  },
  owner: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    default: "http://localhost:4000/img/default/defaut.png",
  },
})

module.exports = mongoose.model("Product", productSchema)
