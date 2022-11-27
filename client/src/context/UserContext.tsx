import { Context, createContext } from 'react'

export type TransactionDetails = {
  date: string
  type: string
  amount: number
  newBalance: number
}

export type UserDetails = {
  name: string
  email: string
  password: string
  recentHistory: TransactionDetails[]
}

export type ErrorDetails = {
  type: string
  message: string
}

export interface PageContextProps {
  loginState: boolean
  details?: UserDetails
  errors?: ErrorDetails
}

// page reducer
export const userReducer = ( state: PageContextProps, action: any ) => {
  state.details = undefined
  state.errors = undefined
  state.loginState = false

  switch ( action.type ) {
    case 'LOGOUT_SUCCESS':
      console.log( 'logout success' )
      return {
        ...state,
      }
    case 'LOGIN_SUCCESS':
      console.log( 'login success' )
      return {
        ...state,
        loginState: true,
        details: {
          name: 'jake',
          email: 'askjake331@gmail.com',
          password: '123456',
          recentHistory: []
        },
      }
    case 'LOGIN_404':
      console.log( 'login not found' )
      return {
        ...state,
        errors: {
          type: 'NotFound',
          message: 'User not found.'
        }
      }
    default:
      console.log( 'default action: userReducer' )
      return {
        ...state,
        errors: {
          type: 'OppErr',
          message: `Invalid operation request '${ action.type }'.`
        }
      }
  }
}

// page context
export const PageContext: Context<any> = createContext( {} )