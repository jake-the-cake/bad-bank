import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Transfer = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )

    console.log( ctx.user.loginState )

  if ( ctx.user.loginState !== true ) navigate( '/login' )
  
  return (
    <MainCard
      title='Transfer Money'
      subtitle='Select the destination account from the dropdown below.'
      content={
        <>
          Transfer Page 
        </>
      }
    />
  )
}