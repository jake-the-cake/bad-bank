import Mongoose from 'mongoose'

const User = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  transactions: [{
    type: Object
  }],
  balance: {
    type: Number,
    required: true
  }
}, { timestamps: true })

export const UserModel = Mongoose.model( 'User', User )