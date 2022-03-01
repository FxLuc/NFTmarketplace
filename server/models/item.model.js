const mongoose = require("mongoose")
require('dotenv').config({path: '../.env'})
const defaultAddress = `http://${process.env.ADDRESS}/pictures/default.png`

const itemSchema = new mongoose.Schema({
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
  owner: {
    type: String,
    lenght: 42,
    required: true,
    ref: 'Account'
  },
  order: {
    type: String,
    lenght: 42,
    default: '0x0000000000000000000000000000000000000000',
    ref: 'Order'
  },
  description: {
    type: String,
  },
  specifications: {
    type: String,
    required: true,
  },
  externalLink: {
    type: String,
  },
  picture: {
    type: String,
    default: defaultAddress,
  },
  rawDataHash: {
    type: String,
    lenght: 66,
    default: '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
  state: {
    type: Number,
    min: 0,
    default: 4,
  }
}, {timestamps: true})

module.exports = mongoose.model("Item", itemSchema)
