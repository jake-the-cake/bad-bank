import Mongoose from 'mongoose'

const Transaction = new Mongoose.Schema({
  from: {
    type: Object,
    required: true,
  },
  to: {
    type: Object,
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