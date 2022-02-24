const mongoose = require("mongoose")
require('dotenv').config({path: '../.env'})
const defaultAddress = `http://${process.env.ADDRESS}/pictures/default.png`

const accountSchema = new mongoose.Schema({
  _id: {
    type: String,
    lenght: 42,
    required: true,
  },
  name: {
    type: String,
    default: 'Unnamed',
  },
  state: {
    type: Number,
    min: 0,
    default: 0
  },
  externaLink: {
    type: String,
  },
  avatar: {
    type: String,
    default: defaultAddress,
  },
}, {timestamps: true})

module.exports = mongoose.model("Account", accountSchema)
