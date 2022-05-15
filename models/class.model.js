const mongoose = require('mongoose')
const classSchema = new mongoose.Schema({
  coachId: { type: mongoose.Schema.Types.ObjectId, ref: "coach", required: true },
  title: { type: String, default: "" },
  maxSize: { type: Number, default: 20 },
  startDate: { type: String },
  isCompleted: { type: Boolean, default: false },
  category: { type: String, default: "Not Specified" },
  equipmentRequired: { type: [String], default: null }
}, { timestamps: true })

const Class = mongoose.model('class', classSchema)
module.exports = Class