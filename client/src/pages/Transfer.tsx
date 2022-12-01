import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { TransactionForm } from '../components/TransactionForm'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Transfer = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()
  const [ accounts, setAccounts ] = useState( [] )
  
  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )
      
  if ( ctx.user.loginState !== true ) navigate( '/login' )

  useEffect(() => {
    fetch( 'http://localhost:4200/users/viewall', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then( res => res.json() )
    .then( data => {
      const arr: any = []
      Array.from( data ).forEach(( d: any ) => {
        arr.push({
          type: 'real',
          id: d._id,
          name: d.username,
          balance: d.balance
        })
      })
      setAccounts( arr )
    })
    .catch( err => console.error( err.message ))
  }, [])

  return (
    <MainCard
      title='Transfer Money'
      subtitle='Select the destination account from the dropdown below.'
      content={
        <TransactionForm
          fromAccount={ 
            /*[{
              type: 'user',
              id: 'user',
              name: 'My B.A.D. Account',
              balance: 50
            }] */
            accounts
          }
          toAccount={ accounts }
        />
      }
    />
  )
}