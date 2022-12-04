import Express from 'express'
import { TransactionModel } from '../models/TransactionModel'
import { UserModel } from '../models/UserModel'

const router = Express.Router()

router.get( '/viewall', async ( req, res ) => {
  const users = await UserModel.find()
  res.status( 200 ).json( users )
})

router.delete( '/deleteall', async ( req, res ) => {
  const accounts = Array.from( await UserModel.find() )
  accounts.forEach( acct => acct.delete() )
  res.send( 'gone?' )
})

router.post( '/transactions', async ( req, res ) => {
  const { id } = req.body
  const transactions = await TransactionModel.find()
  const userTransactions = transactions.filter( t => t.to.id === id || t.from.id === id )
  res.status( 200 ).json( userTransactions ?? null )
})

router.post( '/add', ( req, res ) => {
  const { username, email, password } = req.body
  console.log( req.body )
  const newUser = new UserModel({
    username,
    email,
    password,
    balance: 0
  })
  newUser.save()
  res.status( 201 ).json( newUser )
})

router.post( '/one', async ( req, res ) => {
  const { _id } = req.body
  const user = await UserModel.findOne({ _id })
  res.status( 200 ).json( user )
})

export { router as UserRouter }