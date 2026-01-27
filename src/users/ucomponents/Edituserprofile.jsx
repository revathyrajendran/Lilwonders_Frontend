import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faPen, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { userProfileDetailsUpdateContext } from '../../../Context/ContextShare'
import { loggedInUserProfileUpdateApi } from '../../Services/allApis'
import SERVERURL from '../../Services/ServerURL'


function Edituserprofile() {
    //steps For profile pic , Create a state to bring excisting profile from session storage of a logged in user.   Then create a preview state for URL creation

    //edit canvas status , initially false , becomes true onlyt when user clicks edit button.
    const[editUserProfileCanvas,setEditUserProfileCanvas]=useState(false)

    //to store details of inputs in edit component. profile is not for holding excisting pictue, but to hold updated picture. cpassword for confirm password
    const[userDetails,setUserDetails]=useState({username:"",password:'',cpassword:"",bio:"",profile:"",roles:""})
    //to hold excisting profile pic of the user. This was to avoid unnecessary confusion
  const[usersExcistingProfile,setUsersExcistingProfile]= useState("")

   //token
    const[token, setToken]=useState("")

    //to preview new picture once uploaded. To generate URL of image
    const[profilePreview,setProfilePreview]=useState("")

    //data to be shared using context, it must be an object. Only thr function to update is needed.Data from ContextApi.jsx.
    const{setUserEditedProfile}=useContext(userProfileDetailsUpdateContext)

    //to fetch values from session storage
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            const userToken = sessionStorage.getItem("token")
            setToken(userToken)
            //in edit form, users need to update already excisting data, so those datas we get from session storage is placed here from session storage.JSON parsing is done to convert dtring to object
            const user = JSON.parse(sessionStorage.getItem("user"))
            //user now below is an object . profile is not for holding excisting pictue, but to hold updated picture.
            setUserDetails({username:user.username,password:user.password,cpassword:user.password,bio:user.bio,roles:user.roles})
            //user's excisting profile picture before updation
            setUsersExcistingProfile(user.profile)
        }
    },[])


    //user defined functions must be after useeffect. This below function is for handling profile update of a logged in user. Image for uploading comes from an event , so e is needed in argument
    const handleProfilePicUpdate = (e)=>{
        setUserDetails({...userDetails,profile:e.target.files[0]})
        //to create url of image. URL is a class, createObjectURL is a method in URL class
        const profilePicUrl = URL.createObjectURL(e.target.files[0])
        setProfilePreview(profilePicUrl)
    }

    //reset function 
    const handleReset=()=>{
        //in edit form, users need to update already excisting data, so those datas we get from session storage is placed here from session storage.JSON parsing is done to convert dtring to object
        const user = JSON.parse(sessionStorage.getItem("user"))
        //user now below is an object . profile is not for holding excisting pictue, but to hold updated picture. Here there is no profile.Reset updated Details.
        setUserDetails({username:user.username,password:user.password,cpassword:user.password,bio:user.bio,role:user.roles})
        //uploaded pic for updating profile is deleted
        setProfilePreview("")
    }


    //Update function. It is an async function . Api call is made .
    const handleUpdateUserProfile = async()=>{
            //destructure userDetails 
        const {username,password,cpassword,bio,roles,profile} = userDetails
        //Profile updation is not mandatory, but all the other 4 fields other than eoles must contain either newly update dvalue or old value 
         if(!username || !password || !cpassword || !bio){
          toast.info("Please Fill The Form Completely!!!!")
      } 
      //if all values are there then,
      else{
         //check if password entered and confirm password are same, they must be same.
        if(password != cpassword){
          toast.warning("Password and Confirm Password must be same!!!!")

        }
        else{
            const reqHeader ={
                "Authorization":`Bearer ${token}`
            }
            const reqBody = new FormData()
            //if the user uploads image or profile, then it will bw stored in preview
            if(profilePreview){
                //userDetails has profile as a key in it
                for(let key in userDetails){
                    reqBody.append(key,userDetails[key])
                }
                //API call
                const result = await loggedInUserProfileUpdateApi(reqBody,reqHeader)
                if(result.status==200){
                    //users is stored as  string back  in session storage after updation if any updation is done
                    sessionStorage.setItem("user",JSON.stringify(result.data))
                    setUsersExcistingProfile(result.data.profile)
                    toast.success("Profile Updation successful!!!!")
                    handleReset()
                    setEditUserProfileCanvas(false)
                    setUserEditedProfile(result.data)

                }else{
                    toast.warning("Something went Wrong!!!")
                     console.log(result);
                }
            }
            //If no preview, or if user has not updated the profile picture
            else{
                //if user has not updated or edited the profile pic, then profile key will have excisting profile value.
                const result = await loggedInUserProfileUpdateApi({username,password,bio,roles,profile:usersExcistingProfile},reqHeader)
                //users is stored as  string in session storage
                if(result.status == 200){
                sessionStorage.setItem("user",JSON.stringify(result.data))
                handleReset()
                setEditUserProfileCanvas(false)
                
                }
            else{
                  toast.error("Something went wrong!!!!!")
                   console.log(result);
            
            }


            }

        }
      }
    }


  return (
     <>
    <button onClick={()=>setEditUserProfileCanvas(true)} className="text-blue-600 border border-blue-600 p-3 rounded hover:text-white hover:bg-blue-600"><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>

    {/*offcanvas , inset-0 gray color appears everywhere in the screen, 500/75 is the gradient */}
    
    {
      editUserProfileCanvas &&
      <div>
       <div className='fixed inset-0 bg-gray-500/75 w-full h-full transistion-opacity'>
       </div>

      <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
          {/*profile edit form for logged in users */}
            <div className='bg-gray-900 px-3 py-4 flex justify-between text-white  text-2xl'>
                <h1>Edit User Profile</h1>
                <FontAwesomeIcon onClick={()=>setEditUserProfileCanvas(false)} icon={faXmark} />
            </div>

            {/*profile edit form for logged in users Body Part */}
            <div className="flex justify-center items-center flex-col my-5">
                <label htmlFor="profilepicupdate">
                   <input onChange={e=>handleProfilePicUpdate(e)} type="file" id='profilepicupdate' style={{display:'none'}} />
                  {/* Conditional rendering for profile.If excisting picturer is an empty string, then dummy picture is displayed. Google image can be there , so it should also be checked. if no data in excisting picture, then dummy is placed and it is checked  if there is anyt google login image, if not then user uploaed iamge appears*/}
                  {
                    usersExcistingProfile==""?
                   <img  className='z-52' style={{height:'150px',width:'150px',borderRadius:'50%'}} src={profilePreview?profilePreview:"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="profile" />
                  : 
                  usersExcistingProfile.startsWith("https://lh3.googleusercontent.com/")?
                  <img className='z-52' style={{height:'150px',width:'150px',borderRadius:'50%'}} src={profilePreview?profilePreview:usersExcistingProfile} alt="profile" />
                  :
                    
                  <img className='z-52' style={{height:'150px',width:'150px',borderRadius:'50%'}} src={profilePreview?profilePreview:`${SERVERURL}/uploads/${usersExcistingProfile}`} alt="profile" />

                  }
                  
                  {/*Button edit pen */}
                  <button className="bg-yellow-300 z-53 fixed text-white py-3 px-4 rounded" style={{marginLeft:'85px' , marginTop:'-20px'}}> <FontAwesomeIcon icon={faPen}/></button>
                </label>

                  {/*Fields to edit */}
                  <div className='mt-15 mb-4 w-full px-5'>
                      <input value={userDetails.username} onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded text-dark' placeholder='Username' />
                  </div>

                  <div className='mb-4 w-full px-5'>
                      <input  value={userDetails.password} onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="text" className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded text-dark' placeholder='Password' />
                  </div>

                  <div className='mb-4 w-full px-5'>
                      <input value={userDetails.cpassword} onChange={e=>setUserDetails({...userDetails,cpassword:e.target.value})} type="text" className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded text-dark' placeholder=' Confirm Password' />
                  </div>

                  <div className='mb-4 w-full px-5'>
                      
                      <textarea value={userDetails.bio} onChange={e=>setUserDetails({...userDetails,bio:e.target.value})} name="" id="" className='w-full border border-gray-300 placeholder-gray-500 p-2 rounded text-dark'  placeholder='Bio' ></textarea>
                  </div>

                  {/*Submit update buttons */}
                  <div className="flex justify-end w-full px-5 mt-7">
                        {/*Handlereset and handleupdate have no argument */}
                    <button onClick={handleReset} className="bg-amber-500 text-dark py-4 px-4 rouned text-bold hover:text-white hover:border-amber-500 hover:bg-amber-800  ">
                           RESET
                    </button>

                     <button onClick={handleUpdateUserProfile} className="bg-green-500 text-dark py-4 px-4 rouned text-bold hover:text-white hover:border-green-500 hover:bg-green-800  ms-auto">
                           UPDATE
                    </button>
                  </div>
            </div>

      </div>


    </div>
    }

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

export default Edituserprofile