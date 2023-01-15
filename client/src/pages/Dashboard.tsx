import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Dashboard = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  useEffect(() => {
    // update context with current url pathname
    changeActiveLink(
      window.location.pathname,
      ctx.user.url,
      ctx.dispatch
    )
  
    // redirect to login if not logged in
    if ( ctx.user.loginState !== true ) navigate( '/' )  
  }, [])
  
  return (
    <MainCard
      title='Account Overview'
      content={
        <>
          Thank you for your continued trust in B.A.D. Bank. select a function to continue.
          <div className='buttons__horizontal'>  
            <button onClick={ () => navigate( '/deposit' ) }>Deposit</button>
            <button onClick={ () => navigate( '/withdraw' )}>Withdraw</button>
            <button onClick={ () => navigate( '/transfer' )}>Transfer</button>
            <button onClick={ () => navigate( '/transactions' )} className='button__secondary'>Account Balance</button>
          </div>  
        </>
      }
    />
  )
}