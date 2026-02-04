import React from 'react'
import Header from '../ucomponents/Header' 
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

function CancelOrder() {
  return (
    <>
   <Header/>
           {/**Content */}
           <div className="container my-10  min-h-80">
               <div className="md:grid grid-cols-2 px-20 justify-center items-center">
                   {/**Thank you part */}
                   <div className='text-center'>
                     <text className="yellow-700 text-xl font-bold">Your Cancel request has been successfully placed!!! </text>
                         <p className="text-center text-green-800 text-xl p-4">
                            Your request has been submitted successfully. The refund will be initiated shortly. The amount will be credited within 2 business days through the original payment method.

                           
                         </p>
                   </div>
                       
   
                       <div className='flex justify-center items-center '>
                               <img  className='img-fluid ' src="https://cdn.dribbble.com/users/2185205/screenshots/7886140/media/90211520c82920dcaf6aea7604aeb029.gif" alt="request submitted" />
                       </div>
                       
                       
   
                       <Link to={'/all-products'} className='bg-blue-800 px-4 py-3 text-white my-2 md:my-1'>
                            <FontAwesomeIcon icon={faBackward}/> Explore More products!
                       </Link>
                       
                       
                       
                </div>
                
           </div>
       <Footer/>
    </>
  )
}

export default CancelOrder