import React, { useContext } from 'react'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'

export const Withdraw = () => {
  const ctx = useContext( PageContext )
  if ( ctx.user.url !== '/withdraw' ) {
    ctx.dispatch({ type: 'CHANGE_PAGE', data: {
      url: window.location.pathname
    } })
  }
  console.log( ctx.user )
  console.log( window.location.pathname )
  return (
    <MainCard
      title='Make a Withdrawal'
      content={
        <>
          Withdraw Page
        </>
      }
    />
  )
}