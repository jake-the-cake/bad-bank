import React, { Dispatch, useContext } from 'react'
import { Link } from 'react-router-dom'
import { PageContext } from '../context/UserContext'

interface NavLinkProps {
  url: string
  text: string
}

const publicLinks: NavLinkProps[] = [
  {
    url: '/signup',
    text: 'create an account'
  },{
    url: '/login',
    text: 'log in'
  }
]

const privateLinks: NavLinkProps[] = [
{
    url: '/deposit',
    text: 'make deposit'
  },{
    url: '/withdraw',
    text: 'widthdraw'
  },{
    url: '/transfer',
    text: 'transfer'
  },{
    url: '/transactions',
    text: 'account history'
  },{
    url: '/quit',
    text: 'quit'
  }
]

const NavLink = ({ text, url }: NavLinkProps ) => {
  const ctx = useContext( PageContext )

  const href = window.location.pathname
  let status = 'text'
  if ( href === `${ url }`) {
    status = 'active'
  }
  const splitText: string[] = text.split( ' ' )
  splitText.forEach(( frag: string, index: number ) => {
    splitText[ index ] = frag[0].toUpperCase() + frag.slice( 1 ).toLowerCase()
  })
  const returnValue = splitText.join( ' ' )

  // display correct text depending on current page
  return ( status === 'active'
    ? <div className='header__link--active'>{ returnValue }</div>
    : <Link className='header__link--text' to={ `.${ url }` }>{ returnValue }</Link> )
}

export const Navbar = () => {
  const ctx = useContext( PageContext )
  console.log( ctx.user )

  // show links based on login state
  const links = () => {
    return (
      ctx.user.loginState
        ? privateLinks
        : publicLinks
    )
  }

  return (
    <div className='header__container'>
      <Link to='./' className='header__title--container'>
        <div className='header__title--letters'>BAD</div>
        <div className='header__title--text'>Banking And Donuts</div>
      </Link>
      <div className='header__links--container'>
      {
        ( ctx.user.loginState ? privateLinks : publicLinks ).map(( link: NavLinkProps ) => (
          <NavLink 
            url={ link.url }
            text={ link.text }
          />
        ))
      }
      </div>
    </div>
  )
}