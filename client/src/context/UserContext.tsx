import { Context, createContext } from 'react'

export type TransactionDetails = {
  date: string
  type: string
  amount: number
  newBalance: number
}

export type UserDetails = {
  id: string
  name: string
  balance: number
  transactions: TransactionDetails[]
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

const updateUser = ( data: any ) => {
  return {
    id: data._id,
    name: data.username,
    balance: data.balance,
    transactions: data.transactions?.slice( 0, 5 ) ?? []
  }
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
        details: updateUser( action.data ),
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
    case 'UPDATE_USER':
      console.log( `updated user ${ state.details?.name }` )
      return {
        loginState: state.loginState,
        details: updateUser( action.data ),
        errors: undefined,
        url: state.url
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