import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageContext } from '../context/UserContext'

export const Logout = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()
  useEffect(() => {
    navigate( '/login' )
    if ( ctx.user.loginState === true ) ctx.dispatch({ type: 'LOGOUT_SUCCESS' })
  }, [])

  // display message if there is an error
  return (
    <>
      You are being logged out. This text should go away... any second now... Okay, if you're still reading this, an error occured. <Link to='/'>Return Home</Link>
    </>
  )
}