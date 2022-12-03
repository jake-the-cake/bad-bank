import Express from 'express'
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
  const account = await UserModel.find().where({ _id: id })
  res.status( 200 ).json( account[ 0 ]?.transactions ?? null )
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

export { router as UserRouter }