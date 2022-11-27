import React, { useContext } from 'react'
import { PageContext } from '../context/UserContext'

export const LoginToggleButton = () => {
  const ctx = useContext( PageContext )
  return (
    <button onClick={ ( e ) => {
      e.preventDefault()
      switch ( ctx.user.loginState ) {
        case false:
          ctx.dispatch({ type: 'LOGIN_SUCCESS', data: {
            username: 'jake'
          } })
          break
        case true:
          ctx.dispatch({ type: 'LOGOUT_SUCCESS' })
          break
        default:
          break
      }
      ctx.user.loginState = !ctx.loginState
    }}>
      Toggle Login State
    </button>
  )
}

export const Login404Button = () => {
  const ctx = useContext( PageContext )
  return (
    <button onClick={ ( e ) => {
      e.preventDefault()      
      ctx.dispatch({ type: 'LOGIN_404' })
    }}>
      Login Not Found
    </button>
  )
}

export const LoginDeniedButton = () => {
  const ctx = useContext( PageContext )
  return (
    <button onClick={ ( e ) => {
      e.preventDefault()      
      ctx.dispatch({ type: 'LOGIN_DENIED' })
    }}>
      Login Denied
    </button>
  )
}