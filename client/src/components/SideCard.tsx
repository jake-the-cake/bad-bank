import React, { useContext } from 'react'
import { PageContext } from '../context/UserContext'
import { Login404Button, LoginDeniedButton, LoginToggleButton } from '../dev/LoginToggle'

interface SideCardProps {
  side: string
}

const LeftSide = () => {
  const ctx = useContext( PageContext )
  return (
    <>
      {
        !ctx.user.loginState ? null : (
          <>
            <div className='side__card'>
              <div className='side__card--title'>Active User</div>
              <div className='side__card--text'>{ ctx.user.details.name.toUpperCase() }</div>
            </div>
            <div className='side__card'>
              <div className='side__card--title'>Current Balance</div>
              <div className='side__card--balance'>$ { ctx.user.details.balance.toFixed( 2 ) }</div>
            </div>            
            <div className='side__card'>
              <div className='side__card--title'>Recent Transactions</div>
              <div className='side__card--transactions'>{ ctx.user.details.transactions?.map( tran => {
                const displayObj: any = {
                  type: tran.type[ 0 ].toUpperCase() + tran.type.slice( 1 ),
                  amount: tran.amount,
                  className: 'side__balance--text'
                }
                switch ( tran.type ) {
                  case 'withdrawal':                    
                    displayObj.amount = tran.amount * -1
                    displayObj.className += ' history__balance--negative'
                    break
                  case 'transfer':
                    if ( ctx.user.details.name === tran.from.name ) {
                      displayObj.amount = tran.amount * -1
                      displayObj.className += ' history__balance--negative'
                    }
                    break
                  default:
                    break
                }

                return (
                  <>
                    <div>
                      { displayObj.type }
                    </div>
                    <div className={ displayObj.className }>
                      $ { displayObj.amount.toFixed( 2 ) }
                    </div>
                  </>
                )
              }) ?? null }</div>
            </div>
          </>
        )
      }
    </>
  )
}

const RightSide = () => {
  return (
    <>
      {/* <LoginToggleButton /><br />
      <Login404Button /><br />
      <LoginDeniedButton /> */}
    </>
  )
}

export const SideCard: ( props: SideCardProps ) => JSX.Element = ({ side }) => {
  return (
    <div className={`side__container side__container--${ side }`}>
      {
        side === 'left'
          ? <LeftSide />
          : <RightSide />
      }
    </div>
  )
}