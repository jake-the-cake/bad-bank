import React, { Dispatch, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { PageContext, PageContextProps, userReducer } from './context/UserContext'
import { Login404Button, LoginDeniedButton, LoginToggleButton } from './dev/LoginToggle'


const initialContext: PageContextProps = {
  loginState: false,
  details: undefined,
  errors: undefined
}

export default () => {
  const [ user, dispatch ]: [ PageContextProps, Dispatch<PageContextProps> ] = useReducer( userReducer, initialContext )

  console.log( typeof user )

  // JSX Element to return
  return (
    <PageContext.Provider value={{
      user, dispatch
    }}>
      <Navbar />
      {
        'some sort of status bar'
      }
      <div className='content__container'>
        <div className=''>
          <LoginToggleButton />
          <Login404Button />
          <LoginDeniedButton />
        </div>
        <div className=''>
          <Routes>
            <Route path='/' element={ <>Home</> } />
            <Route path='/deposit' element={ <>deposit</> } />
            <Route path='/withdraw' element={ <>withdraw</> } />
            <Route path='/transfer' element={ <>transfer</> } />
            <Route path='/transactions' element={ <>transactions</> } />
            <Route path='/quit' element={ <>quit</> } />
          </Routes>
        </div>
        <div className=''>right</div>
      </div>
      <div className='footer__container'>
        <div className=''>left</div>
        <div className=''>middle</div>
        <div className=''>right</div>
      </div>
    </PageContext.Provider>
  )
}