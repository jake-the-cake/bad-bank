import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const History = () => {
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
      title='Transaction History'
      content={
        <>
          {
            ctx.user.details.transactions.map( h => {
              const date = new Date( h.createdAt ).toDateString()
              return <p>{ `$${ h.amount } ${ h.type } on ${ date }` }</p>
            })
          }
        </>
      }
    />
  )
}