import Express from 'express'
import { UserModel } from '../models/UserModel'

export interface ResponseObjectProps {
  statusCode: number
  data?: any,
  error?: any
}

const router = Express.Router()

router.post( '/login', async ( req, res ) => {
  const { email, password } = req.body
  const resObj: ResponseObjectProps = { statusCode: 500 }

  const foundUser = await UserModel.findOne().where({ email })

  switch ( !foundUser ) {
    case false:
      if ( password === foundUser!.password ) {
        resObj.statusCode = 201
        resObj.data = foundUser
      }
      else {
      resObj.statusCode = 401
      resObj.error = {
        type: 'AuthErr',
        message: 'Invalid password entered.'
      }        
      }
      break
    default:
      resObj.statusCode = 403
      resObj.error = {
        type: 'NotFound',
        message: 'User not found.'
      }
      break
  }

  if ( resObj.statusCode === 500 ) resObj.error = {
    type: 'SysErr',
    message: 'Server error occurred.'
  }

  res.status( resObj.statusCode ).json( resObj )
})

export { router as AuthRouter }