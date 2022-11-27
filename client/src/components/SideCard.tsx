import React from 'react'
import { Login404Button, LoginDeniedButton, LoginToggleButton } from '../dev/LoginToggle'

interface SideCardProps {
  side: string
}

const LeftSide = () => {
  return (
    <>
      Left
    </>
  )
}

const RightSide = () => {
  return (
    <>
      <LoginToggleButton /><br />
      <Login404Button /><br />
      <LoginDeniedButton />
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