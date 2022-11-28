import Express from 'express'
import Mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import { UserRouter } from './routes/UserRoutes'

const app = Express()
dotenv.config()

app.use( cors() )
app.use( Express.json() )
app.use( Express.urlencoded({ extended: true }))

// routes
app.use( '/users', UserRouter )

// default page
app.get( '/', (req,res) => {
  res.send('home')
})

Mongoose
  .connect( process.env.MONGO as string )
  .then(() => {
    console.log( 'database connected' )
  })

app.listen( 4200, () => {
  console.log( 'server connected on 4200' )
})