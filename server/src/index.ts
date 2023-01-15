import Express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { UserRouter } from './routes/UserRoutes'
import { AuthRouter } from './routes/AuthRoutes'
import { TransactionRouter } from './routes/TransactionRoutes'

const app = Express()
dotenv.config()

app.use( cors() )
app.use( Express.json() )
app.use( Express.urlencoded({ extended: true }))

// routes
app.use( '/users', UserRouter )
app.use( '/auth', AuthRouter )
app.use( '/transaction', TransactionRouter )

// default page
app.get( '/', (req,res) => {
  res.send('home')
})

Mongoose
  .connect( process.env.MONGO as string )
  .then(() => {
    console.log( 'database connected' )
  })


const port = process.env.PORT || 8080
app.listen( port, () => {
  console.log( `server connected on ${ port }`)
})