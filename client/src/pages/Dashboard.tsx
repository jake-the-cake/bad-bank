import React, { useContext } from 'react'
import { MainCard } from '../components/MainCard'
import { PageContext } from '../context/UserContext'
import { changeActiveLink } from '../functions/changeActiveLink'

export const Dashboard = () => {
  const ctx = useContext( PageContext )

  changeActiveLink(
    window.location.pathname,
    ctx.user.url,
    ctx.dispatch
  )
  
  return (
    <MainCard
      title='Account Overview'
      content={
        <>
          Dashboard Page 
        </>
      }
    />
  )
}