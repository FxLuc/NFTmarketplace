const mongoose = require("mongoose")

let personSchema = mongoose.Schema({
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
    default: "http://localhost:4000/pictures/default.png",
  },
}, {timestamps: true})

module.exports = mongoose.model("Person", personSchema)
