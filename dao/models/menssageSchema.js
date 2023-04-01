import mongoose from 'mongoose'

const message = new mongoose.Schema({
  name: { type: String, require: true },
  mail: { type: String, require: true },
  message: { type: String, require: true }
}, { timestamps: true })

export default mongoose.model('Messages', message)