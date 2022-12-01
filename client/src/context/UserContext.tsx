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
  balance: number
  recentHistory: TransactionDetails[]
}

export type ErrorDetails = {
  type: string
  message: string
}

export interface PageContextProps {
  loginState: boolean
  details?: UserDetails | undefined
  errors?: ErrorDetails | undefined
  url?: string | undefined
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
      console.log( action.data )
      return {
        loginState: true,
        details: action.data,
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