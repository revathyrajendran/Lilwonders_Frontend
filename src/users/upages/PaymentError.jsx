import React from 'react'
import Header from '../ucomponents/Header' 
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

function PaymentError() {
  return (
    <>
   <Header/>
           {/**Content */}
           <div className="container my-10  min-h-80">
               <div className="md:grid grid-cols-2 px-20 justify-center items-center">
                   {/**Thank you part */}
                   <div className='text-center'>
                     <text className="yellow-700 text-xl font-bold">OOPS! </text>
                         <p className="text-center text-green-800 text-xl p-4">
                             OOPS! Sorry! Your Payment is unsuccessfull...!
                         </p>
                   </div>
                       
   
                       <div className='flex justify-center items-center '>
                               <img  className='img-fluid ' src="https://i0.wp.com/nrifuture.com/wp-content/uploads/2022/05/comp_3.gif?fit=800%2C600&ssl=1" alt="Payment Error" />
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

export default PaymentError