"use client"

import React from 'react'
import CountUp from 'react-countup'

const AnimatedCountUp = ({amount}:{amount:number}) => {
  return (
      <div className='w-full'>
        <CountUp
            decimalPlaces={2}
            duration={2.75}
            decimal=','
            prefix='$' 
            end={amount}
        />
      </div>
  )
}

export default AnimatedCountUp
