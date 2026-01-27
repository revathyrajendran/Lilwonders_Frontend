import { faBook, faGear, faGraduationCap, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { adminProfileDetailsUpdateContext } from '../../../Context/ContextShare'
import { useState } from 'react'
import SERVERURL from '../../Services/ServerURL'
import { useEffect } from 'react'


const Adminsidebar = () => {
  //using shared state of profile update from context api
  const{adminEditedProfile}=useContext(adminProfileDetailsUpdateContext)

  //state to hold details for admin sidebar, in settings also admin profile picture updated or excisting  profile details was kept in a state shared using context api
  const[adminDP,setadminDP]= useState("")

  //state to hold admin name
  const[adminName,setAdminName]=useState("")

   //useeffect to load admin details whenever admin opens this page
  useEffect(()=>{
    if(sessionStorage.getItem("user")){
      const user = JSON.parse(sessionStorage.getItem("user"))
      setadminDP(user.profile)
      setAdminName(user.username)
    }
  },[adminEditedProfile])

  return (
    <div className='bg-blue-100 md:min-h-screen h-fit flex text-center flex-col py-10'>
      <div className='flex justify-center'>
                  {/* Conditional rendering based on adminDP, No google login for admin is used here */}
        <img style={{width:'100px', height:'100px', borderRadius:'50%'}} src={adminDP==""?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNPQxt8ZLNHXp6jkHGmadRYrCKGE53w9ufg&s":`${SERVERURL}/uploads/${adminDP}` }alt="admin profile" />
        </div>
     
      <h1 className="text-xl font-bold my-5">{adminName}</h1>
      {/*Filter */}

         <div className='md:text-left mx-auto mt-10' >
            <div className="mt-3">
              <Link to={'/admin-dashboard'}><FontAwesomeIcon icon={faHome} className='me-2' />Home</Link>
            </div>
  
            <div className="mt-3">
              <Link to={'/admin-resource'}> <FontAwesomeIcon icon={faBook} className='me-2' />Resources</Link>
              
              
            </div>
             <div className="mt-3">
               <Link to={'/admin-career'}> <FontAwesomeIcon icon={faGraduationCap} className='me-2' />Careers</Link>
              
            </div>
  
            <div className="mt-3">
               <Link to={'/admin-setting'}> <FontAwesomeIcon icon={faGear} className='me-2' /> Settings</Link>
              
             
            </div>
  
             
          </div>
   
   
    </div>
  )
}

export default Adminsidebar