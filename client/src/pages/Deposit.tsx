import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Deposit = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )

  if ( ctx.user.loginState !== true ) navigate( '/login' )
  
  return (
    <MainCard
      title='Make a Deposit'
      content={
        <form className='form__container'>
          <label htmlFor='from'>From account</label>
          <select id='from' disabled>
            <option value='cash'>Internet Cash Account</option>
          </select>
          <label htmlFor='to'>To account</label>
          <select id='to' disabled>
            <option value='cash'>My B.A.D. Account</option>
          </select>
          <label htmlFor='password'>Deposit Amount</label><input id='password' placeholder='Enter amount' type="text" />
          <div className='buttons__horizontal'>
            <button>Make Deposit</button>
            <button className='button__secondary' onClick={ () => navigate( '/' ) }>Back</button>
          </div>
        </form>
      }
    />
  )
}