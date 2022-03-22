const mongoose = require('mongoose')

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber1: { type: String },
  firebaseUid: { type: String },
  age: Number,
  gender: { type: String },
  category: [String],
  experience: { type: String, default: "0 years" },
  bio: { type: String, default: "" },
  feePerClass: { type: Number, default: 300 },
  classes: [mongoose.Schema.Types.ObjectId],
  isActive: { type: Boolean },
  numberOfClasses: { type: Number, default: 0 },
}, { timestamps: true })

const Coach = mongoose.model('coach', coachSchema)
module.exports = Coach