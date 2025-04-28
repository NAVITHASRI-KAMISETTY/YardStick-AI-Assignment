import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  category: { 
    type: String, 
    enum: ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other'],
    default: 'Other'
  },
  date: { type: Date, default: Date.now }
})

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema)