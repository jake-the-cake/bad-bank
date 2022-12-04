import React, { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'
import { UseFetch } from '../hooks/UseFetch'

export const Signup = () => {
  const [ isSubmitted, setIsSubmitted ]: [ boolean, Dispatch<SetStateAction<boolean>> ] = useState( false )
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )

  if ( ctx.user.loginState === true ) navigate( '/dashboard' )

  const [ errorMessage, setErrorMessage ]: [ any, Dispatch<SetStateAction<any>>] = useState( null )
  const [ nextUser, setNextUser ]: [ any, Dispatch<SetStateAction<any>>] = useState( null )

  const handleRegister =  ( event: any ) => {
    event.preventDefault()

    // put input values into variables
    const username = ( document.getElementById( 'username' ) as HTMLInputElement).value
    const email = ( document.getElementById( 'email' ) as HTMLInputElement ).value
    const password = ( document.getElementById( 'password' ) as HTMLInputElement ).value

    // make call to database
    UseFetch( 'POST', '/users/add', { body: { username, email, password }})
      .then( res => res.json() )
      .then( ({ data, errors }) => {
        !data ? null : setNextUser({
          id: data._id,
          username: data.username,
          balance: 0,
          transactions: []
        })
        errors
          ? setErrorMessage( errors )
          : setIsSubmitted( true )
      })
      .catch( err => console.error( err.message ))
  }

  return (
    <>
    {
      isSubmitted
      ? <MainCard
          title="Success"
          subtitle="Your account has been added"
          content={
            <>
              <div className='form__container'>
                What would you like to do now?
              </div>
              <div className='buttons__horizontal'>
                <button onClick={ () => {
                  setErrorMessage( null )
                  setIsSubmitted( false )
                }}>Create Another Account</button>

                <button onClick={ () => {
                  ctx.dispatch({ type: 'LOGIN_SUCCESS', data: nextUser })
                }} className='button__secondary'>Start Banking</button>
              </div>
            </>
          }
        />
      : <MainCard
          title='Create An Account'
          subtitle='Fill in the form below. All fields are required.'
          content={
            <form className='form__container'>
              <label htmlFor='username'>Username</label>
              <input id='username' placeholder='Choose a user name' type="text" />
              {
                !errorMessage ? null : (
                  !errorMessage.username ? null : <div className='form__error'>{ errorMessage.username.message }</div>
                )
              }
              <label htmlFor='email'>Email</label>
              <input id='email' placeholder='Enter a valid email address' type="text" />
              {
                !errorMessage ? null : (
                  !errorMessage.email ? null : <div className='form__error'>{ errorMessage.email.message }</div>
                )
              }
              <label htmlFor='password'>Password</label>
              <input id='password' placeholder='Create a password' type="password" />
              {
                !errorMessage ? null : (
                  !errorMessage.password ? null : <div className='form__error'>{ errorMessage.password.message }</div>
                )
              }
              <div className='buttons__horizontal'>
                <button onClick={ handleRegister }>Create Account</button>
                <button onClick={ () => navigate( '/login' )} className='button__secondary'>Login Instead</button>
              </div>
            </form>
          }
        />
      }
    </>
  )
}