const mongoose = require('mongoose')

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber1: { type: String },
  firebaseUid: { type: String },
  dob:String,//YYYY-MM-DD
  age: Number,
  gender: { type: String },
  category: [String],
  experience: { type: String, default: "0 years" },
  bio: { type: String, default: "" },
  feePerClass: { type: Number, default: 300 },
  isActive: { type: Boolean },
  weeklySchedule:{
    "0": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
    "1": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
    "2": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
    "3": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
    "4": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
    "5": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
    "6": [{type:mongoose.Schema.Types.ObjectId, ref: "class", default: null}],
  },
  numberOfClasses: { type: Number, default: 0 },
}, { timestamps: true })

const Coach = mongoose.model('coach', coachSchema)
module.exports = Coach