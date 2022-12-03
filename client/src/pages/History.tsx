import React, { useContext, useEffect, useState } from 'react'
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

  const [ transactions, setTransactions ] = useState( [] )

  useEffect(() => {
    fetch( `http://localhost:4200/users/transactions`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'id': ctx.user.details._id
      })
    })
    .then( res => res.json() )
    .then( data => setTransactions( data ))
  }, [] )

  return (
    <MainCard
      title='Transaction History'
      content={
        <div className='history__container'>
          {
            transactions ?
            transactions.map(( h: any, i: number ) => {
              const key = `hist-${ i }`
              const date = new Date( h.createdAt ).toLocaleDateString()
              let newBal: number = 0
              let text: string = ''
              let historyBalanceClass = 'history__balance'

              switch ( h.type ) {
                case 'deposit':
                  newBal = h.amount + h.to.balance
                  text = `$${ h.amount.toFixed( 2 ) } deposit made.`
                  break
                case 'withdrawal':
                  newBal = h.from.balance - h.amount
                  text = `$${ h.amount.toFixed( 2 ) } withdrawal made.`
                  break
                case 'transfer':
                  if ( ctx.user.details.username === h.to.name ) {
                    newBal = h.amount + h.to.balance
                    text = `$${ h.amount.toFixed( 2 ) } transfer from ${ h.from.name.toUpperCase() }.`
                  }
                  else {
                    newBal = h.from.balance - h.amount
                    text = `$${ h.amount.toFixed( 2 ) } transfer to ${ h.to.name.toUpperCase() }.`
                  }
                  break
                default:
                  newBal = -1000000
                  text = 'something occurred'
                  break
              }

              if ( newBal < 0 ) {
                historyBalanceClass += ' history__balance--negative'
              }
              
              return (
                <div key={ key } id={ key }  className='history__row'>
                  <span className='history__date'>{ date }</span>
                  <span className='history__text'>{ text }</span>
                  <span className={ historyBalanceClass }>$ { newBal.toFixed( 2 ) }</span>
                </div>
              )
            }) : <>No data.</>
          } 
        </div>
      }
    />
  )
}