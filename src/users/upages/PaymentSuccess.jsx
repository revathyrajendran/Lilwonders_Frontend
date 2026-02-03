import React from 'react'
import Header from '../ucomponents/Header' 
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { ToastContainer,toast} from 'react-toastify'
import { reviewAProductByUserApi } from '../../Services/allApis'
import { useEffect } from 'react'



function PaymentSuccess() {
    //token state
     const[token,setToken]=useState("")

    //state to hold review details
    const[reviewDetails,setReviewDetails]=useState({
        customername:"", stars:"",rating:""
    })

    //token fetching for adding review
    //useeffect for token
     useEffect(()=>{
      if(sessionStorage.getItem("token")){
       const token = sessionStorage.getItem("token")
       setToken(token)
      }
    },[])

    //function to reset product upload form
 const handleResetForm = ()=>{
  setReviewDetails({
   customername:"", stars:"",rating:""
  })
  

}

    //function to handle a review
    const handleReviewSubmit=async()=>{
      //destructuring reviewDetails
      const{customername, stars,rating}=reviewDetails

       //checking if all fields are filled
        if(!customername || !stars || !rating){
             //alerting using toastify if  fields are not filled
             toast.warning("Please Fill The Form Completely!!!")
           }else{
            const reqHeader = {
            "Authorization" : `Bearer ${token}`
              }
         const reqBody = {
                customername,
                  stars,
                   rating
                }
           try{
            const result = await reviewAProductByUserApi(reqBody,reqHeader)
            if(result.status==200){
                    toast.success("Review Submitted Successfully!!!!!!!!")
                    // to clear all field of the form
                    handleResetForm()
                  }

           }catch(err){
            console.log(err);
            
           }
    }
}
  return (
    <>
    <Header/>
        {/**Content */}
        <div className="container my-10  min-h-80">
            <div className="md:grid grid-cols-2 px-20 justify-center items-center">
                {/**Thank you part */}
                    <p className="text-center text-green-800 text-2xl p-4">
                        Thank You For Shopping With Us!. Hope You had A great time with us!!
                    </p>
                    {/**Review Part */}

                    <div className='flex justify-center items-center'>
                            <img  className='img-fluid' src="https://i.pinimg.com/originals/0d/e4/1a/0de41a3c5953fba1755ebd416ec109dd.gif" alt="Payment Success" />
                    </div>
                    
                    

                    <Link to={'/all-products'} className='bg-blue-800 px-4 py-3 text-white my-5 me-4'>
                         <FontAwesomeIcon icon={faBackward}/> Explore More products!
                    </Link>
                   
                        <div className="shadow">
                             <p className="text-xl text-Yellow-800 text-center">
                        Leave us a Review! </p>
                            
                            <div  className=" p-3 rounded mx-3">
                                                
                                 <div className="flex flex-col justify-center align-center ">
                                     <input value={reviewDetails.customername} onChange={e=>setReviewDetails({...reviewDetails,customername:e.target.value})} type="text" className="mt-2 mb-2 p-3 bg-gray-300 text-dark placeholder-white" placeholder='Name' />
                                    
                                     <input value={reviewDetails.stars} onChange={e=>setReviewDetails({...reviewDetails,stars:e.target.value})} type="text" className=" mb-2 p-3 bg-gray-300 text-dark placeholder-white" placeholder='Rate us on 5' />             

                                     <input value={reviewDetails.rating} onChange={e=>setReviewDetails({...reviewDetails,rating:e.target.value})} type="text" className=" mb-2 p-3 bg-gray-300 text-dark placeholder-white" placeholder='Write Feedback'/>   

                                     <button onClick={handleReviewSubmit} className=" flex  justify-center align-center bg-green-400 text-white text-xl font-bold p-2 ">Submit</button>          

                                                 
                                                  
                                </div>
                            </div>
                       
                        </div>
                    
                    
                    
             </div>
             
        </div>
    <Footer/>
     {/*Toast for alert*/}
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        
        />
    
    </>
  )
}

export default PaymentSuccess