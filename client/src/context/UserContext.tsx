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
  url?: string
}

// page reducer
export const userReducer = ( state: PageContextProps, action: any ) => {
  const newUrl = action.data?.url ?? state.url

  switch ( action.type ) {
    case 'LOGOUT_SUCCESS':
      console.log( 'logout success' )
      return {
        loginState: false,
        details: undefined,
        errors: undefined,
        url: state.url
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
        errors: undefined,
        url: state.url
      }
    case 'LOGIN_404':
      console.log( 'login not found' )
      return {
        loginState: false,
        details: undefined,
        errors: {
          type: 'NotFound',
          message: 'User not found.'
        },
        url: state.url
      }
    case 'LOGIN_DENIED':
      console.log( 'wrong password' )
      return {
        loginState: false,
        details: undefined,
        errors: {
          type: 'AuthErr',
          message: 'Invalid password entered.'
        },
        url: state.url
      }
    case 'CHANGE_PAGE':
      console.log( `navigated to ${ newUrl }` )
      return {
        loginState: state.loginState,
        details: state.details,
        errors: state.errors,
        url: newUrl
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