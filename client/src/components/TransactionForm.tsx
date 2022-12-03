import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { PageContext } from '../context/UserContext'

type AccountDetails = {
  type: string
  id: string
  name: string
  balance: number
}

interface TransactionFormProps {
  fromAccount: AccountDetails[]
  toAccount: AccountDetails[]
}

export const TransactionForm: ( props: TransactionFormProps ) => JSX.Element = ({ fromAccount, toAccount }) => {
  const ctx = useContext( PageContext )
  const navigate = useNavigate()

  // const [ selectedFrom, setSelectedFrom ] = useState( '' )

  console.log( fromAccount )

  const formObject: any = {}

  const returnTransterType = () => {
    formObject.type = 'Transfer'
    formObject.fromDisabled = false
    formObject.toDisabled = false
    formObject.onClick = ( event: Event ) => {
      event.preventDefault()
      console.log( formObject.type )
    }
  }

  if ( fromAccount.length === 1 ) {
    switch ( fromAccount[ 0 ].type ) {
      case 'cash':
        formObject.type = 'Deposit'
        formObject.fromDisabled = true
        formObject.toDisabled = true
        formObject.onClick = ( event: Event ) => {
          const toId: string = ( document.getElementById( 'to' ) as HTMLSelectElement ).value
          const amt: string = ( document.getElementById( 'amount' ) as HTMLInputElement ).value
          event.preventDefault()
          console.log( formObject.type )
          fetch( 'http://localhost:4200/transaction/deposit', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "id": toId,
              "amount": Number( amt )
            })
          })
          .then( res => res.json() )
          .then( data => {
            console.log( data )
            ctx.user.details.recentHistory.push( data.data )
          })
          .catch( err => console.error( err.message ))
        }
        break
      case 'user':
        formObject.type = 'Withdrawal'
        formObject.fromDisabled = true
        formObject.toDisabled = true
        formObject.onClick = ( event: Event ) => {
          event.preventDefault()
          console.log( formObject.type )
          fetch( 'http://localhost:4200/transaction/withdraw', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
          })
          .then( res => res.json() )
          .then( data => {
            console.log( data.statusCode )
            ctx.dispatch({ type: 'LOGIN_SUCCESS', data: data.data })        
          })
          .catch( err => console.error( err.message ))
        }
        break
      default:
        break
    }
  }
  else {
    returnTransterType()
  }
  if ( !formObject.balance ) formObject.balance = fromAccount[ 0 ]?.balance ?? '0'

  const Option = ({ id, name }) => {
    return (
      <option key={ id } value={ id }>{ `xx${ id.split( '' ).filter( char => char.match(/[0-9]/) ).join( '' ).slice( 5, 9 ) || 1234 } >> '${ name.toUpperCase() }'` }</option>
    )
  }

  return (
    <form className='form__container'>
      <label htmlFor='from'>From account</label>
      <select id='from' disabled={ formObject.fromDisabled }>
      {
        fromAccount.map( acct => (
              <Option
                id={ acct.id }
                name={ acct.name }
              />
            ))
          }
      </select>
      <label htmlFor='to'>To account</label>
      <select id='to' disabled={ formObject.toDisabled }>
      {
        toAccount.map( acct => (
          <Option
            id={ acct.id }
            name={ acct.name }
          />
        ))
      }
      </select>
      <label htmlFor='amount'>{ formObject.type } Amount</label>
      <input id='amount' placeholder={ `Current Balance: $ ${ formObject.balance }` } type="text" />
      <div className='buttons__horizontal'>
        <button onClick={ formObject.onClick }>Make { formObject.type }</button>
        <button className='button__secondary' onClick={ () => navigate( '/' ) }>Back</button>
      </div>
    </form>
  )
}