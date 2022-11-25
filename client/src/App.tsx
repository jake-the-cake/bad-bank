import React, { Context, createContext, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'


interface PageContextProps {
  reducer?: any[]
  loginState: boolean
}

// page reducer
const reducer = ( state, action ) => {
  switch ( action.type ) {
    case 'LOGIN_SUCCESS':
      console.log('success?')
      break
    default:
      return state
  }
}

// page context
export const PageContext: Context<PageContextProps> | Context<any> = createContext( {} )

export default () => {
  // const [ user, dispatch ] = useReducer( reducer, {
  //   state: {
  //     loginState: false
  //   },
  //   action: 'none'
  // } )

  // dispatch({type: 'LOGIN_SUCCESS'})


  // JSX Element to return
  return (
    <PageContext.Provider value={{
      // reducer: [ user, dispatch ],
      loginState: false
    }}>
      <Navbar />
      {
        'some sort of status bar'
      }
      <div className='content__container'>
        <div className=''>
          <PageContext.Consumer>
            {
              value => {
                return (
                  <button onClick={ ( e ) => {
                    e.preventDefault()
                    console.info( 'the left button was clicked' )
                    value.loginState = !value.loginState
                  }}>Button</button>
                )
              }
            }
          </PageContext.Consumer>
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