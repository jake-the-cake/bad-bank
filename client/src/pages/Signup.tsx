import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Signup = () => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )

  if ( ctx.user.loginState === true ) navigate( '/dashboard' )
  
  return (
    <MainCard
      title='Create An Account'
      subtitle='Fill in the form below. All fields are required.'
      content={
        <>
          Create Page 
        </>
      }
    />
  )
}