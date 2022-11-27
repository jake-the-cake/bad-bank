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
  switch ( action.type ) {
    case 'LOGOUT_SUCCESS':
      console.log( 'logout success' )
      return {
        loginState: false,
        details: undefined,
        errors: undefined
      }
    case 'LOGIN_SUCCESS':
      console.log( 'login success' )
      return {
        loginState: true,
        details: {
          name: 'jake',
          email: 'askjake331@gmail.com',
          password: '123456',
          recentHistory: []
        },
        errors: undefined
      }
    case 'LOGIN_404':
      console.log( 'login not found' )
      return {
        loginState: false,
        details: undefined,
        errors: {
          type: 'NotFound',
          message: 'User not found.'
        }
      }
    case 'LOGIN_DENIED':
      console.log( 'wrong password' )
      return {
        loginState: false,
        details: undefined,
        errors: {
          type: 'AuthErr',
          message: 'Invalid password entered.'
        }
      }
    default:
      console.log( 'default action: userReducer' )
      return {
        loginState: false,
        details: undefined,
        errors: {
          type: 'OppErr',
          message: `Invalid operation request '${ action.type }'.`
        }
      }
  }
}

// page context
export const PageContext: Context<any> = createContext( {} )