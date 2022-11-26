const mongoose = require("mongoose")
const defaultPicture = 'default.jpg'

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
    default: defaultPicture,
  },
}, {timestamps: true})

module.exports = mongoose.model("Account", accountSchema)
