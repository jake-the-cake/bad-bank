import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { TransactionForm } from '../components/TransactionForm'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Withdraw = () => {
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
    if ( ctx.user.loginState !== true ) navigate( '/login' )  
  }, [])

  return (
    <MainCard
      title='Make a Withdrawal'
      content={
        <TransactionForm
          fromAccount={[{
            type: 'user',
            id: ctx.user.details.id || '1234',
            name: ctx.user.details.name,
            balance: ctx.user.details.balance
         }]}
          toAccount={[{
            type: 'cash',
            id: 'cash4321',
            name: 'Internet Cash Account',
            balance: 1000000000
          }]}
        />
      }
    />
  )
}