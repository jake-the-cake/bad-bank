import Express from 'express'
import { TransactionModel } from '../models/TransactionModel'
import { UserModel } from '../models/UserModel'
import { ResponseObjectProps } from './AuthRoutes'

const router = Express.Router()

router.get( '/viewall', async ( req, res ) => {
  const transactions = await TransactionModel.find()
  res.status( 200 ).json( transactions )
})

router.delete( '/deleteall', async ( req, res ) => {
  const accounts = Array.from( await TransactionModel.find() )
  accounts.forEach( acct => acct.delete() )
  res.send( 'gone?' )
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

router.post( '/withdraw', async ( req, res ) => {
  const { id, amount } = req.body
  const resObj: ResponseObjectProps = { statusCode: 500 }

  try {
    const toAccount = await UserModel.findOne({ _id: id })

    const newTransaction = new TransactionModel({
      from: {
        "type": 'real',
        id,
        "name": toAccount?.username ?? 'My B.A.D. Account',
        "balance": toAccount?.balance ?? -1000000
      },
      to: {
        type: 'cash',
        id: 'cash',
        name: 'Internet Cash Account',
        balance: 1000000000
      },
      amount,
      type: 'withdrawal'
    })
  
    resObj.data = newTransaction
    toAccount?.transactions.push( resObj.data )
    newTransaction.save()
    toAccount?.update({
      balance: toAccount.balance -= amount
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

router.post( '/transfer', async ( req, res ) => {
  const { idTo, idFrom, amount } = req.body
  const resObj: ResponseObjectProps = { statusCode: 500 }

  try {
    const toAccount = await UserModel.findOne({ _id: idTo })
    const fromAccount = await UserModel.findOne({ _id: idFrom })

    const newTransaction = new TransactionModel({
      from: {
        "type": 'real',
        "id": idFrom,
        "name": fromAccount?.username ?? 'My B.A.D. Account',
        "balance": fromAccount?.balance ?? -1000000
      },
      to: {
        type: 'real',
        id: idTo,
        name:  toAccount?.username,
        balance: toAccount?.balance ?? -1000000
      },
      amount,
      type: 'transfer'
    })
  
    resObj.data = newTransaction
    toAccount?.transactions.push( resObj.data )
    fromAccount?.transactions.push( resObj.data )
    newTransaction.save()
    toAccount?.update({
      balance: toAccount.balance += amount
    })
    fromAccount?.update({
      balance: fromAccount.balance -= amount
    })
    toAccount?.save()
    fromAccount?.save()
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