import React, { Dispatch, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { MainCard } from './components/MainCard'
import { Navbar } from './components/Navbar'
import { SideCard } from './components/SideCard'
import { PageContext, PageContextProps, userReducer } from './context/UserContext'
import { Deposit } from './pages/Deposit'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Logout } from './pages/Logout'
import { Signup } from './pages/Signup'
import { Transfer } from './pages/Transfer'
import { Withdraw } from './pages/Withdraw'


const initialContext: PageContextProps = {
  loginState: false,
  details: undefined,
  errors: undefined
}

export default () => {
  const [ user, dispatch ]: [ PageContextProps, Dispatch<PageContextProps> ] = useReducer( userReducer, initialContext )

  // JSX Element to return
  return (
    <PageContext.Provider value={{
      user, dispatch
    }}>
      <Navbar />
      <div className='content__container'>
        <SideCard side='left' />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/deposit' element={ <Deposit /> } />
          <Route path='/withdraw' element={ <Withdraw /> } />
          <Route path='/transfer' element={ <Transfer/> } />
          <Route path='/transactions' element={ <History /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/signup' element={ <Signup /> } />
          <Route path='/quit' element={ <Logout /> } />
        </Routes>
        <SideCard side='right' />
      </div>
      <Footer />
    </PageContext.Provider>
  )
}