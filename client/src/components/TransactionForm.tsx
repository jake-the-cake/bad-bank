import React from 'react'
import { useNavigate } from 'react-router'

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
  const navigate = useNavigate()

  const formObject: any = {}

  if ( fromAccount.length === 1 ) {
    switch ( fromAccount[ 0 ].type ) {
      case 'cash':
        formObject.type = 'Deposit'
        formObject.fromDisabled = true
        formObject.toDisabled = true
        break
      case 'user':
        if ( toAccount.length === 1 ) {
          formObject.type = 'Withdrawal'
          formObject.fromDisabled = true
          formObject.toDisabled = true
        }
        else {
          formObject.type = 'Transfer'
          formObject.fromDisabled = true
          formObject.toDisabled = false
        }
        break
      default:
        break
    }
  }

  return (
    <form className='form__container'>
      <label htmlFor='from'>From account</label>
      <select id='from' disabled={ formObject.fromDisabled }>
      {
        fromAccount.map( acct => (
            <option key={ acct.id } value={ acct.id }>{ acct.name }</option>
            ))
          }
      </select>
      <label htmlFor='to'>To account</label>
      <select id='to' disabled={ formObject.toDisabled }>
      {
        toAccount.map( acct => (
          <option value={ acct.id }>{ acct.name }</option>
        ))
      }
      </select>
      <label htmlFor='password'>{ formObject.type } Amount</label><
      input id='password' placeholder={ `Current Balance: ${ 102.25 }` } type="text" />
      <div className='buttons__horizontal'>
        <button>Make { formObject.type }</button>
        <button className='button__secondary' onClick={ () => navigate( '/' ) }>Back</button>
      </div>
    </form>
  )
}