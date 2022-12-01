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
  }

  if ( fromAccount.length === 1 ) {
    switch ( fromAccount[ 0 ].type ) {
      case 'cash':
        formObject.type = 'Deposit'
        formObject.fromDisabled = true
        formObject.toDisabled = true
        break
      case 'user':
        formObject.type = 'Withdrawal'
        formObject.fromDisabled = true
        formObject.toDisabled = true
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
      <label htmlFor='password'>{ formObject.type } Amount</label><
      input id='password' placeholder={ `Current Balance: $ ${ formObject.balance }` } type="text" />
      <div className='buttons__horizontal'>
        <button>Make { formObject.type }</button>
        <button className='button__secondary' onClick={ () => navigate( '/' ) }>Back</button>
      </div>
    </form>
  )
}