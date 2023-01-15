import React, { useContext, useEffect, useState } from 'react'
import { PageContext } from '../context/UserContext'
import { Login404Button, LoginDeniedButton, LoginToggleButton } from '../dev/LoginToggle'

interface SideCardProps {
  side: string
}

const TransactionChart = ({ displayObj }: { displayObj: any }) => {
  return (
    <>
      <div key={ displayObj.key }>
        { displayObj.type }
      </div>
      <div key={ displayObj.key + 'b' } className={ displayObj.className }>
        $ { displayObj.amount.toFixed( 2 ) }
      </div>
    </>
  )
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
              <div className='side__card--transactions'>{ ctx.user.details.transactions?.map((tran: any, i: number )=> {
                const displayObj: any = {
                  type: tran.type[ 0 ].toUpperCase() + tran.type.slice( 1 ),
                  amount: tran.amount,
                  key: `tally${ i }`,
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
                  <TransactionChart
                    key={ displayObj.key }
                    displayObj= { displayObj }
                  />
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
  const ctx = useContext( PageContext )
  const [ conversionRate, setConversionRate ] = useState( 1.99 )
  const [ isLoading, setisLoading ] = useState( false )

  const posNeg = () => {
    const switchVar = Math.floor( Math.random() * 2 )
    switch ( switchVar ) {
      case 0:
        return -1
      default:
        return 1
    }
  }
  useEffect(() => {
    if ( !isLoading ) {
      setInterval(() => {
        setisLoading( true )
        const rateChange = ( Math.random() * .00869 ).toFixed( 4 )
        setConversionRate( conversionRate + ( Number( rateChange ) * posNeg() ))
        setisLoading( false )
      }, 3000)
    }
  }, [] )

  return (
    <>
      {
        !ctx.user.loginState ? null : (
          <>
            <div className='side__card'>
              <div className='side__card--transactions' style={{ textAlign: 'center' }}>
                <span>We provide a live update on your <span style={{ fontStyle: 'italic' }}>Dollars To Donuts</span> balance. </span>
              </div>
            </div>
            <div className='side__card'>
              <div className='side__card--title'>Donuts</div>
              <div className='side__card--balance'>{( ctx.user.details.balance * conversionRate).toFixed( 3 )}</div>
            </div>
          </>
        )
      }
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