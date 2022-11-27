import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageContext } from '../context/UserContext'

export const Logout = () => {
  const ctx = useContext( PageContext )
  if ( ctx.user.loginState === true ) ctx.dispatch({ type: 'LOGOUT_SUCCESS' })
  useNavigate()( '/login' )

  // display message if there is an error
  return (
    <>
      You are being logged out. This text should go away... any second now... Okay, if you're still reading this, an error occured. <Link to='/'>Return Home</Link>
    </>
  )
}