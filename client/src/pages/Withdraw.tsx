import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { TransactionForm } from '../components/TransactionForm'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Withdraw = () => {
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
      title='Make a Withdrawal'
      content={
        <TransactionForm
          fromAccount={[{
            type: 'user',
            id: 'user1234',
            name: 'My B.A.D. Account',
            balance: 50
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