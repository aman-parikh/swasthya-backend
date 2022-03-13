const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber1: { type: String },
  age: Number,
  gender: { type: String },
  heightInCm: Number,
  weightInKg: Number,
  bloodGroup: { type: String },
  hasDiabetes: { type: Boolean },
  hasAsthma: { type: Boolean },
  isActive: { type: Boolean},
  numberOfClasses: { type: Number, default: 0 },
}, { timestamps: true })

const User = mongoose.model('user', userSchema)
module.exports = User