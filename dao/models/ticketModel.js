import mongoose from 'mongoose'

const ticket = new mongoose.Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: Number,
    purchaser: { type: String, ref: 'User' },
}, { timestamps: true });
  
export default mongoose.model('Ticket', ticket);