import Mongoose from 'mongoose'

const Transaction = new Mongoose.Schema({
  from: {
    type: Mongoose.Types.ObjectId || String,
    required: true,
  },
  to: {
    type: Mongoose.Types.ObjectId || String,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: Number
  }
}, { timestamps: true })

export const TransactionModel = Mongoose.model( 'Transaction', Transaction )