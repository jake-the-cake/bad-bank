import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { TransactionForm } from '../components/TransactionForm'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Deposit = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  // update context with current url pathname
  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )

  // redirect to login if not logged in
  if ( ctx.user.loginState !== true ) navigate( '/login' )  

  return (
    <MainCard
      title='Make a Deposit'
      content={
        <TransactionForm
          fromAccount={[{
            type: 'cash',
            id: 'cash',
            name: 'Internet Cash Account',
            balance: 1000000000
          }]}
          toAccount={[{   
            type: 'real',
            id: ctx.user.details._id || '1234',
            name: ctx.user.details.username,
            balance: ctx.user.details.balance
          }]}
        />
      }
    />
  )
}