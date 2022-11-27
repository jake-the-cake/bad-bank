import React from 'react'

interface MainCardProps {
  title: string
  subtitle?: string
  content: JSX.Element
}

export const MainCard: ( props: MainCardProps ) => JSX.Element = ({ title, subtitle, content }) => {
  return (
    <div className='main__container'>
      <div className='main__container--title'>
        { title }
      </div>
      {
        subtitle
        && <div className='main__container--subtitle'>
          { subtitle }
        </div>
      }
      <div className='main__container--content'>
        { content }
      </div>
    </div>
  )
}