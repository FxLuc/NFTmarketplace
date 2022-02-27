const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    lenght: 42,
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
  deadline: {
    type: Number,
    min: 0,
    default: 0
  },
  seller: {
    type: String,
    lenght: 42,
    required: true,
    ref: 'Account'
  },
  purchaser: {
    type: String,
    lenght: 42,
    required: true,
    ref: 'Account'
  },
  itemContract: {
    type: String,
    lenght: 42,
    required: true,
    ref: 'Item'
  },
  from: {
    type: String,
  },
  to: {
    type: String,
  },
  nowIn: {
    type: String,
  }
}, {timestamps: true})

module.exports = mongoose.model("Order", orderSchema)
