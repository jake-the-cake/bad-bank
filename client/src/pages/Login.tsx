import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'
import { UseFetch } from '../hooks/UseFetch'

export const Login = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )
  
  if ( ctx.user.loginState === true ) navigate( '/dashboard' )

  const [ errorMessage, setErrorMessage ] = useState( '' )

  /* 
    ::: LOGIN FUNCTION
  */
  const handleLogin = ( event: any ) => {
    event.preventDefault()

    // put input values into variables
    const email = ( document.getElementById( 'email' ) as HTMLInputElement ).value
    const password = ( document.getElementById( 'password' ) as HTMLInputElement ).value

    // make call to database
    UseFetch( 'POST', '/auth/login', { body: { email, password }})
    .then( res => res.json() )
    .then( data => {
      // set error message
      data.error ? setErrorMessage( data.error.message ) : null
      // change login state based on statusCode response
      switch ( data.statusCode ) {
        case 201:
          ctx.dispatch({ type: 'LOGIN_SUCCESS', data: data.data })    
          break
        case 403:
          ctx.dispatch({ type: 'LOGIN_404' })
          break
        case 401:
          ctx.dispatch({ type: 'LOGIN_DENIED' })
          break
        default:
          console.log( 'unknown statusCode' )
          break
      }    
    })
    .catch( err => console.error( err.message ))
  }

  return (
    <MainCard
      title='Login To Continue'
      subtitle='Please enter your credentials below.'
      content={
        <form className='form__container'>
          <label htmlFor='email'>Email</label>
          <input id='email' placeholder='Enter your email address' type="text" />
          <label htmlFor='password'>Password</label>
          <input id='password' placeholder='Enter your password' type="text" />
          {
            !errorMessage ? null : (
              <div className='form__error'>{ errorMessage }</div>
            )
          }
          <div className='buttons__horizontal'>
            <button onClick={ handleLogin }>Login</button>
            <button onClick={ () => navigate( '/signup' )} className='button__secondary'>Create Account Instead</button>
          </div>
        </form>
      }
    />
  )
}