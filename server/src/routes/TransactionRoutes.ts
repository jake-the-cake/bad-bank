import Express from 'express'
import { TransactionModel } from '../models/TransactionModel'
import { UserModel } from '../models/UserModel'
import { ResponseObjectProps } from './AuthRoutes'

const router = Express.Router()

router.get( '/viewall', async ( req, res ) => {
  const transactions = await TransactionModel.find()
  res.status( 200 ).json( transactions )
})

router.post( '/deposit', async ( req, res ) => {
  const { id, amount } = req.body
  const resObj: ResponseObjectProps = { statusCode: 500 }

  try {
    const toAccount = await UserModel.findOne({ _id: id })

    const newTransaction = new TransactionModel({
      from: {
        type: 'cash',
        id: 'cash',
        name: 'Internet Cash Account',
        balance: 1000000000
      },
      to: {
        "type": 'real',
        id,
        "name": toAccount?.username ?? 'My B.A.D. Account',
        "balance": toAccount?.balance ?? -1000000
      },
      amount,
      type: 'deposit'
    })
  
    resObj.data = newTransaction
    toAccount?.transactions.push( resObj.data )
    newTransaction.save()
    toAccount?.update({
      balance: toAccount.balance += amount
    })
    toAccount?.save()
    resObj.statusCode = 201
  }
  catch ( err: any ) {
    resObj.error = {
      type: 'SysErr',
      message: 'Server error occurred.'
    }
    console.error( err )
  }

  res.status( resObj.statusCode ).json( resObj )
})

export { router as TransactionRouter }