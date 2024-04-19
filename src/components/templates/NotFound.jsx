import React from 'react'
import error from '/error.gif'

function NotFound() {
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-black'>
    <img className='h-[80%] object-cover' src={error} alt="" />
  </div>
  )
}

export default NotFound
