import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast} from 'react-toastify'
import { googleLoginApi, loginApi, registerApi } from '../Services/allApis'
import { GoogleLogin , GoogleOAuthProvider} from '@react-oauth/google';  
//import jwtdecode
import { jwtDecode } from "jwt-decode"
import { userAuthContext } from '../../Context/AuthContext'


//if register is true , {register} from App.jsx
const Auth = ({register}) => {

   //role and authorized state from context API, used in app.jsx also
  const{role,authorizedUser,setAuthorizedUser}=useContext(userAuthContext)

  //navigate
  const navigate = useNavigate();
    
  //eye for password
  const[viewpassword,setViewPassword]=useState(false)
  //register inputs storing
  const[userDetails,setUserDetails]=useState({username:"",email:"",password:''})
  //console.log(userDetails)
 
  //register button function (values stored in state, so no argument)
  const handleRegister=async()=>{
    console.log("Inside handleRegister ");
    //object destructuring,easy to access object values
    const{email,password}=userDetails
    //make sure these input values are present
    if( !email||!password){
      toast.info('Please enter all values!')
    }else{
       try{
        const result = await registerApi(userDetails)
       console.log(result);
       if(result.status==200){
          toast.success('Registration Successful')
          setUserDetails({username:"",email:"",password:''})

          navigate('/login')
       }else if(result.status==409){
        toast.warning(result.response.data)
        setUserDetails({username:"",email:"",password:''}) 
        navigate('/login')
       }else{
        console.log(result);
        toast.error("Something went wrong!!!!")
        setUserDetails({username:"",email:"",password:''}) 
        
       }


       }catch(err){
        console.log(err);
        
       }
       
      
    }
}

//login functionality
const handlelogin= async()=>{
  //object destructuring,easy to access object values
    const{username,email,password}=userDetails
    //make sure these input values are present
    if( !email||!password){
      toast.info('Please enter all values!')
    }else{
       try{
        const result = await loginApi(userDetails)
       console.log(result);
       if(result.status==200){
        toast.success("Login Successful !")
        //session storage to temporarily store login credentials, stringify is used to conver object to dtring becaise session storage can't handle objects.
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        //Also store token , token is already string , there no need for stringify
        sessionStorage.setItem("token",result.data.token)
         //context state
        setAuthorizedUser(true)
        //user and admin redirection, only after 2.5 secons
        setTimeout(() => {
          if(result.data.user.roles=="admin"){
            navigate('/admin-dashboard')
         }else{
            navigate('/')
         }
        }, 2500);
        }else if(result.status==401){ //entered credentials are incorrect , 400 series result comes in response.
        toast.warning(result.response.data)
        //clear form details in frontend
        setUserDetails({username:"",email:"",password:''}) 
       
       }else if(result.status==404){ //entered credentials are incorrect , 400 series result comes in response.
        toast.warning(result.response.data)
        //clear form details in frontend
        setUserDetails({username:"",email:"",password:''}) 
       
       }else{
        toast.error("Something Went Wrong!!!!")
        setUserDetails({username:"",email:"",password:''}) 
        
       }


       }catch(err){
        console.log(err);
        
       }

    }
}
 
//googlelogin
  //decoding or credentials
const handleGoogleLogin = async(credentialResponse)=>{
  console.log("Inside Google Login Api");
  
 const credential = credentialResponse.credential

 const details = jwtDecode(credential)
 //to decode wanted informations from google gmail account.
 console.log(details);
 try{
     const result = await googleLoginApi({username:details.name,email:details.email,password:'googlepswd',profile:details.picture})
     console.log(result);
     if(result.status==200){
      toast.success("Login Successfull !!!")
      //session storage to temporarily store login credentials, stringify is used to conver object to dtring becaise session storage can't handle objects.
        sessionStorage.setItem("user",JSON.stringify(result.data.user))
        //Also store token , token is already string , there no need for stringify
        sessionStorage.setItem("token",result.data.token)

        //user and admin redirection, only after 2.5 secons
        setTimeout(() => {
          if(result.data.user.role=="admin"){
            navigate('/admin-dashboard')
         }else{
            navigate('/')
         }
        }, 2500);
     }else{
      toast.error("Something Went Wrong!!!!")
        
     }
     
 
 }
 catch(err){
  console.log(err);
  
 }
}
return (
    <>
    
     <div  className=" w-full min-h-screen  bg-local bg-cover  flex flex-col justify-center items-center bg-[url(/Babiesloginregister.jpeg)] ">
             <div className="p-10">
             <h1 className="text-3xl text-center font-bold">
              LilWonder's
             </h1>
             {/* Login part */}
             <div style={{width:'500px'}} className="bg-black text-center text-white p-5 my-5 flex flex-col justify-center items-center ">
              {/*user logo */}
                <div style={{width:'100px', height:'100px', borderRadius:'50%'}} className='border mb-5 flex  justify-center items-center'>
                       <FontAwesomeIcon icon={faUser } className='text-3xl' /> 
                </div>
                <h1 className="text-2xl">{ register?"Register":"Login"}</h1>
                
                {/*Login or register form */}
                <form className='my-5  w-full'>
                  {register &&

                         <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Username ' className="placeholder-gray-600 rounded p-2 bg-white mb-3  w-full text-black"  />
                  
                  }

                       <input value={userDetails.email} onChange={e=>setUserDetails({...userDetails,email:e.target.value})} type="text" placeholder='Email Id ' className="placeholder-gray-600 rounded p-2 bg-white mb-3 w-full text-black" />
                        <div className='flex items-center'>
                           <input value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})}  type={ viewpassword?"text":"password"} placeholder='password ' className="placeholder-gray-600 rounded p-2 bg-white mb-3 w-full text-black"  />
                            {
                              !viewpassword?
                              <FontAwesomeIcon onClick={()=>setViewPassword(!viewpassword)} icon={faEye} style={{marginLeft:'-40px'}} className='text-gray-600 cursor-pointer'/>
                              :
                             <FontAwesomeIcon onClick={()=>setViewPassword(!viewpassword)}  icon={faEyeSlash} style={{marginLeft:'-40px'}} className='text-gray-600 cursor-pointer'/>
                            }
                        </div>
                        
                  {/* forgot password */}
                  <div className="flex justify-between mb-3">
                    <p className='text-sm text-orange-600'>*Never share your password with others</p>
                    <button className='text-sm underline'>Forgot Password?</button>
                  </div>

                  {/*Login Button */}
                  {/*button type is "button " so that form do not refresh */}
                   {/*button onclick is so because there is no arguments passed in both cases. */}
                 <div className='text-center'>
                   {register?
                     
                   <button type='button' onClick={handleRegister} className='rounded bg-green-600 p-2 w-full'>Register</button>
                   :
                   <button onClick={handlelogin} type='button' className='rounded bg-green-600 p-2 w-full'>Login</button>
                   }
                   </div>
                {/*google auth */}
                <div className="text-center">
                  {!register && <p className='mt-3'>--------------------------------------------------or--------------------------------------------------</p>}
                </div>
                {!register && 
                   <div className="mt-3 flex justify-center w-full">
                    {/*Copied from library , wrapeed in  GoogleOAuthProvider */} 
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        handleGoogleLogin(credentialResponse)
                               }}
                          onError={() => {
                         console.log('Login Failed');
                              }}
                      />

                   </div> }
               
               <div className="my-5 text-center">
                {
                  register?
                  <p className="text-blue-500">Are you an Excisting user?<Link className='underline ms-1' to={'/login'}>Login</Link></p>
                  :
                  <p className="text-blue-500">Are you a new user?<Link className=' ms-1 underline' to={'/register'}>Register</Link></p>
                }
               </div>
                </form>
             
             </div>
            
             </div>
             {/*ALert toastify */}
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
     </div>
    
    </>
  )
}

export default Auth