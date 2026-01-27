import React from 'react'
import { Link } from 'react-router-dom'


const Pnf = () => {
  return (
    <div className='min-h-screen flex-col w-full flex justify-center items-center '>
     
      <img  className='w-100 ' src="https://cdn.svgator.com/images/2024/04/electrocuted-caveman-animation-404-error-page.gif" alt="page not found" />
     
      <p>Oh No!</p>
      <h1 className='text-3xl font-semibold'>Looks like you are lost </h1>
      <p>The page you are looking for is not available</p>
      <Link to={'/'} className="bg-blue-800 text-white rounded p-2 my-2">Back to home</Link>
    </div>
  )
}

export default Pnf