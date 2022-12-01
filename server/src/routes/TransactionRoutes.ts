import Express from 'express'
import { UserModel } from '../models/UserModel'
import { ResponseObjectProps } from './AuthRoutes'

const router = Express.Router()

router.get( '/viewall', async ( req, res ) => {
  const users = await UserModel.find()
  res.status( 200 ).json( users )
})

router.post( '/deposit', async ( req, res ) => {
  const { id } = req.body
  const resObj: ResponseObjectProps = {
    statusCode: 500,
    data: {
      type: 'deposit'
    }
  }



  console.log( req.body )
  res.status( resObj.statusCode ).json( resObj )
})

export { router as TransactionRouter }