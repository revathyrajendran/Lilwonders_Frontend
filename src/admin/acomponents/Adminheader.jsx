import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Link, useNavigate } from 'react-router-dom'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'


const Adminheader = () => {
  //useNavigate for navigation
  const navigate = useNavigate()

  //admin logout function
  const logout=()=>{
    sessionStorage.clear()
    navigate('/')
    
  }
  return (
   <>
       <div className="flex justify-between items-center p-3 md:px-40">
         {/*Logo */}
         <div className='flex items-center'>
           <img width={'50px'} height={'50px'} src="https://static.vecteezy.com/system/resources/thumbnails/070/053/818/small/baby-cartoon-illustration-baby-sitting-on-the-floor-png.png" alt="logo" />
           <h1 className="text-2xl font-bold ms-2 ">LilWonder's</h1>
         </div >
          
           {/*logout*/}
           <button onClick={logout} className='border border-black rounded px-3 py-2 ms-3 hover:bg-black hover:text-white'>
            {" "}
            <FontAwesomeIcon icon={faPowerOff }  className='me-1'  />Logout{""}

           </button>
         
         
          
       </div>
   
       
      <div className='bg-indigo-300 rounded  p-3 w-full text-dark '>
       
      {/* Marquee tag for content in motion */}
      <marquee behavior="" direction="">Welcome Admin !  you are all set to manage and monitor the system. Lets get to work!</marquee>
     
      </div>
       </>
  )
}

export default Adminheader