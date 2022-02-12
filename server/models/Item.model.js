const mongoose = require("mongoose")

let itemSchema = mongoose.Schema({
  _id: {
    type: String,
    lenght: 42,
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
    lenght: 42,
    required: true,
  },
  purchaser: {
    type: String,
    lenght: 42,
    default: '0x0000000000000000000000000000000000000000'
  },
  description: {
    type: String,
  },
  img: {
    type: String,
    default: "http://localhost:4000/pictures/defaut.png",
  },
}, {timestamps: true} )

module.exports = mongoose.model("Item", itemSchema)
