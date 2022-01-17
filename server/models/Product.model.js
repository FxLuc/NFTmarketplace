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
  purchaser: {
    type: String,
    default: '0x0000000000000000000000000000000000000000'
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    default: "http://localhost:4000/img/default/defaut.png",
  },
}, {timestamps: true} )

module.exports = mongoose.model("Product", productSchema)
