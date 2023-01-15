import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Home = () => {
  const navigate = useNavigate()
  const ctx = useContext( PageContext )
  
  useEffect(() => {
    // update context with current url pathname
    changeActiveLink(
      window.location.pathname,
      ctx.user.url,
      ctx.dispatch
    )
  
    // redirect to login if not logged in
    if ( ctx.user.loginState === true ) navigate( '/dashboard' )  
  }, [])
  
  const handleButton = ( event: any ) => {
    event.preventDefault()
    switch (( event.target! as HTMLElement ).id ) {
      case 'loginbutton':
        navigate( '/login' )
        break
      case 'signupbutton':
        navigate( '/signup' )
        break
      default:
        break
    }
  }

  return (
    <MainCard
      title='B.A.D. Bank'
      subtitle='Security is like a window.'
      content={
        <>
          <div className='text'>
            Welcome to B.A.D. Bank. Please login or create a new account to being your banking simulation.
          </div>
          <div className='buttons__horizontal'>
            <button id='loginbutton' onClick={ handleButton }>Login</button> 
            <button id='signupbutton' onClick={ handleButton }>Create Account</button> 
          </div>
        </>
      }
    />
  )
}