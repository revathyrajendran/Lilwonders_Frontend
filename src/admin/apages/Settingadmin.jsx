import React from 'react'
import Footer from '../../Components/Footer'
import Adminheader from '../../admin/acomponents/Adminheader'
import Adminsidebar from '../acomponents/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { adminProfileDetailsUpdateContext } from '../../../Context/ContextShare'
import { useState } from 'react'
import { useEffect } from 'react'
import SERVERURL from '../../Services/ServerURL'
import { updateAdminProfileApi } from '../../Services/allApis'
import { toast, ToastContainer } from 'react-toastify'


const Settingadmin = () => {
  //value from context Api, it was shared as object inside provider.
  const{adminEditedProfile,setAdminEditedProfile}=useContext(adminProfileDetailsUpdateContext)

  //state to store username, password, confirm password of Admin. We have stored user details in session storage as object ,so here also object. In frontend there is no field for bio and roles, but backend has so it is used here
  const[adminDetails,setAdminDetails] = useState({
    username:"",password:"",cpasssword:"",profile:""
  })

  //state to hold excisting profile picture of admin
  const[excistingAdminProfilePic,setExcistingAdminProfilePic]=useState("")

  //preview of the picture updated by the user
  const[adminUpdatedProfilePicPreview, setAdminUpdatedProfilePicPreview]=useState("")


  //user while registering, user will also be kept in session storage. While logging in , the token will of the logged in user's token will be stored in session storage. But this must happen as soon as the user takes this page.
   useEffect(()=>{
    if(sessionStorage.getItem("user")){
      //in session storage, it is stored as string, so convert it to object using parse method
      const user = JSON.parse(sessionStorage.getItem("user"))
      //now user is object and we needc to use data from there in here
      setAdminDetails({...adminDetails,username:user.username,password:user.password,cpasssword:user.password})
      //excisting profile, not updated.
      setExcistingAdminProfilePic(user.profile)
    }
  },[adminEditedProfile])

  //function to update profile picture of admin
  const handleUpdateAdminProfilePic=(e)=>{
    //to get url of profile
    setAdminDetails({...adminDetails,profile:e.target.files[0]})
    const url = URL.createObjectURL(e.target.files[0])
    setAdminUpdatedProfilePicPreview(url)

  }

  //if the admin does'nt want to update any details, reset must be clicked
  const handleAdminProfileReset=()=>{
      //in session storage, it is stored as string, so convert it to object using parse method
      const user = JSON.parse(sessionStorage.getItem("user"))
      //now user is object and we needc to use data from there in here
      setAdminDetails({profile:"",username:user.username,password:user.password,cpasssword:user.password})
      //excisting profile, not updated.
      setExcistingAdminProfilePic(user.profile)
      setAdminUpdatedProfilePicPreview("")
  }


  //to update admin profile : no argument
  const handleAdminProfileUpdate=async()=>{
    //destructuring adminDetails
    const {username,password,profile,cpasssword} = adminDetails
    //check if all the required fields has a value, either excisting or updated
    if(!username || !password || !cpasssword){
      toast.warning("Please fill the form completely!!!!")
    }
    else if(password != cpasssword){
      toast.warning("Password and Confirm Password must be the same!!!!")
      handleAdminProfileReset()
    }
    else{
      //we need token here. Be it admin token or user token , it is stored in session storage as token
    const adminToken = sessionStorage.getItem("token")
    const reqHeader={
      "Authorization":`Bearer ${adminToken}`
    }
    //reqBody has picture involved, so form data is used. Here formdata is a class and we use its instance here.
    const reqBody= new FormData()
    reqBody.append("username",username)
    reqBody.append("password",password)
    reqBody.append("bio","")
    //if only the admin has updated profile pic , then use append
    adminUpdatedProfilePicPreview?reqBody.append("profile",profile):reqBody.append("profile",excistingAdminProfilePic)
    try{
      const result = await updateAdminProfileApi(reqBody,reqHeader)
      if(result.status == 200){
        //update user in session storage, we need to store it in form of sreings, so stringify.
        sessionStorage.setItem("user",JSON.stringify(result.data))
        toast.success("Profile Updation Completed Successfully!!!!")
        setAdminEditedProfile(result.data)
         handleAdminProfileReset()
      }else{
        console.log(result);

        
      }

    }catch(err){
      console.log(err);
      toast.error("Something went wrong!!!!")
      
    }

    }
  }


  return (
    <>
    <Adminheader/>
     <div className='bg-indigo-200' >
        <div className="md:grid grid-cols-5 gap-2 ">
          <div className="col-span-1">
            <Adminsidebar/>
          </div>
  
          <div className="col-span-4">
            <h1 className="text-2xl font-bold text-center my-5">Settings</h1>
            <div className="md:grid grid-cols-2 gap-5 mx-5 items-center">
              <div>
                <p className='text-justify'>Welcome to the administration panel of our kids’ clothing website. This space allows you to manage products, users, and orders efficiently. The platform is designed to deliver unique, high-quality clothing for children up to five years old, ensuring smooth store operations and customer satisfaction.
                </p>
                 
                 
              </div>
              {/*Profile editing part */}
              <div className=" rounded bg-blue-100 p-10 flex justify-center items-center  flex-col md:mt-10 mt-0">
                 <input onChange={e=>handleUpdateAdminProfilePic(e)} type="file" id='adminpic' className='hidden' />
                     <label htmlFor="adminpic" className='mb-3'>
                       {
                      excistingAdminProfilePic?
                      <img style={{width:'200px', height:'200px', borderRadius:'50%'}} src={adminUpdatedProfilePicPreview?adminUpdatedProfilePicPreview:`${SERVERURL}/uploads/${excistingAdminProfilePic}`} alt="admin profile" />
                      :
                      <img style={{width:'200px', height:'200px', borderRadius:'50%'}} src={adminUpdatedProfilePicPreview?adminUpdatedProfilePicPreview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNPQxt8ZLNHXp6jkHGmadRYrCKGE53w9ufg&s"} alt="admin profile" />

                    }
                     
                     </label>
                     {/*Form  for updating admin profile*/}
                     <div className="mb-3 w-full">
                        <input value={adminDetails.username} onChange={e=>setAdminDetails({...adminDetails,username:e.target.value})} type="text" className="p-2 bg-white rounded text-black border-gray-200 placeholder-gray-600 border w-full shadow rounded" placeholder='Username' />
                     </div>
                     <div className="mb-3 w-full">
                        <input value={adminDetails.password} onChange={e=>setAdminDetails({...adminDetails,password:e.target.value})} type="text" className="p-2 bg-white rounded text-black border-gray-200 placeholder-gray-600 border w-full shadow rounded" placeholder='Password' />
                     </div>
                     <div className="mb-3 w-full">
                        <input value={adminDetails.cpasssword} onChange={e=>setAdminDetails({...adminDetails,cpasssword:e.target.value})} type="text" className="p-2 bg-white rounded text-black border-gray-200 placeholder-gray-600 border w-full shadow rounded" placeholder='Confirm password' />
                     </div>
                     <div className="mb-3 w-full flex justify-evenly">
                        <button onClick={handleAdminProfileReset} className="bg-orange-600 text-white py-2 px-4 rounded">RESET</button>
                        <button onClick={handleAdminProfileUpdate} className="bg-green-600 text-white py-2 px-4 rounded">UPDATE</button>
                     </div>
                    
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

export default Settingadmin