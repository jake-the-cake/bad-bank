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

router.post( '/add', async ( req, res ) => {
  const { username, email, password } = req.body
  const resObj: any = { statusCode: 500, errors: undefined, data: undefined }

  console.log( username )

  // validate username
  if ( username === '' ) {
    resObj.errors= { ...resObj.errors, username: {
      type: 'Required',
      message: 'Username is required.'
    }}
    resObj.statusCode = 403
  }
  else if ( Array.from( await UserModel.find({ username })).length > 0 ) {
    resObj.errors = { ...resObj.errors, username: {
      type: 'Taken',
      message: 'This username has been taken.'
    }}
    resObj.statusCode = 403
  }

  // validate username
  if ( email === '' ) {
    resObj.errors = { ...resObj.errors, email: {
      type: 'Required',
      message: 'Email is required.'
    }}
    resObj.statusCode = 403
  }
  else if ( Array.from( await UserModel.find({ email })).length > 0 ) {
    resObj.errors = { ...resObj.errors, email: {
      type: 'Taken',
      message: 'This email has been taken.'
    }}
    resObj.statusCode = 403
  }

  // validate password
  if ( password === '' ) {
    resObj.errors = { ...resObj.errors, password: {
      type: 'Required',
      message: 'Password is required.'
    }}
    resObj.statusCode = 403
  }
  else if ( password.length < 6 ) {
    resObj.errors = { ...resObj.errors, password: {
      type: 'PassErr',
      message: 'Must be at least 6 characters.'
    }}
    resObj.statusCode = 403
  }

  // validate password
  password
  ? null
  : null

  if ( resObj.errors === undefined ) {
    const data = new UserModel({
      username,
      email,
      password,
      balance: 0,
      transactions: []
    })
    data.save()
    resObj.data = data
    resObj.statusCode = 201
  }
  
  console.log( resObj.errors )
  console.log( resObj.data )

  res.status( resObj.statusCode ).json( resObj )
})

router.post( '/one', async ( req, res ) => {
  const { _id } = req.body
  const user = await UserModel.findOne({ _id })
  res.status( 200 ).json( user )
})

export { router as UserRouter }