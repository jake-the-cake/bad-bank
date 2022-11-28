import Express from 'express'
import { UserModel } from '../models/UserModel'

const router = Express.Router()

router.get( '/viewall', async ( req, res ) => {
  const users = await UserModel.find()
  res.status( 200 ).json( users )
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