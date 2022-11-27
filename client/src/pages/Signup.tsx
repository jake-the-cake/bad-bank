import React, { MouseEvent, useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Signup = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )

  if ( ctx.user.loginState === true ) navigate( '/dashboard' )
  
    const handleRegister = ( event: any ) => {
      event.preventDefault()
      const username = document.getElementById( 'username' )
      const email = document.getElementById( 'email' )
      const password = document.getElementById( 'password' )
    }

  return (
    <MainCard
      title='Create An Account'
      subtitle='Fill in the form below. All fields are required.'
      content={
        <form className='form__container'>
          <label htmlFor='username'>Username</label>
          <input id='username' placeholder='Choose a user name' type="text" />
          <label htmlFor='email'>Email</label>
          <input id='email' placeholder='Enter a valid email address' type="text" />
          <label htmlFor='password'>Password</label>
          <input id='password' placeholder='Create a password' type="text" />
          <div className='buttons__horizontal'>
            <button onClick={ handleRegister }>Create Account</button>
            <button onClick={ () => navigate( '/login' )} className='button__secondary'>Login Instead</button>
          </div>
        </form>
      }
    />
  )
}