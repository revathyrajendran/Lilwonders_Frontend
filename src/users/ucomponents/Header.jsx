import React, { useEffect, useState,useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faXTwitter  } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { faAddressCard, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/faUser';
import { userProfileDetailsUpdateContext } from '../../../Context/ContextShare'
import SERVERURL from '../../Services/ServerURL'





const Header = () => {
  const [liststatus,setListStatus]=useState(false)
  //state for profile icon instead of login button , token is a string
  const [token,setToken] = useState("")
  //state for userdp
  const [userDp,setUserDp] = useState("")
  //dropdown while clicking dp
  const[dropdown,setDropDown]= useState(false)
  //navigate
    const navigate = useNavigate();

  //shareddata coming from edit . here I need state .
  const{userEditedProfile}=useContext(userProfileDetailsUpdateContext)


  //to get  user details on opening the page itself 
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      setToken(token)
      //it was stored as string, we need here as object
      const user = JSON.parse(sessionStorage.getItem("user"))
      //console.log(user.profile);
      
      setUserDp(user.profile)
    }

  },[token,userEditedProfile])
  //logout
  const logout = ()=>{
    sessionStorage.clear()
    setToken("")
    setUserDp("")
    setDropDown(false)
    navigate('/')
  }
  return ( 
    <>
    <div className="grid grid-cols-3 p-3 ">
      {/*Logo */}
      <div>
        {/*Logo */}
        <img width={'50px'} height={'50px'} src={"https://static.vecteezy.com/system/resources/thumbnails/070/053/818/small/baby-cartoon-illustration-baby-sitting-on-the-floor-png.png"} alt="logo" />
        <h1 className="text-2xl font-bold ms-2 md:hidden">LilWonder's</h1>
      </div >
       {/*title*/}
       <div className='md:flex justify-center items-center hidden'>
        <h1 className="text-2xl font-bold">LilWonder's</h1>
        </div>
      
      
        <div className='md:flex justify-end items-center hidden'>
            {/*Logos */}
        <FontAwesomeIcon icon={faInstagram} />
        <FontAwesomeIcon icon={faFacebook} />
        <FontAwesomeIcon icon={faXTwitter} />
         
          {/*Login link,user dp , logout button on condition rendering */}
         
       { !token?
        <Link to={'/login'}><button className='me-2 hover:bg-black hover:text-white px-3 py-2 border border-black ms-2 rounded'> <FontAwesomeIcon icon={faUser }  className='ms-2 ' /> Login</button></Link>
        :
        <div className='relative inline-block text-left'>
         <div >

          {/*!dropdown means opposite to current value on clicking */}
           <button onClick={()=>setDropDown(!dropdown)} className=' w-full  bg-white px-3 py-2 shadow-xs hover:bg-gray-500'>
            <img className='mx-2' width={"30px"} height={"30px"} style={{borderRadius:'50%'}} src={userDp==""?"https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small/profile-icon-design-free-vector.jpg":userDp.startsWith("https://lh3.googleusercontent.com/")?userDp:`${SERVERURL}/uploads/${userDp}`} alt="userdp" />
           </button>
           {/*dropdown */}
               { dropdown&& <div className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'>
                  <div className="py-1">
                    <Link className='block py-2 px-4 text-sm text-gray-700' to={'/profile'}>   <FontAwesomeIcon icon={faAddressCard} className='me-2' /> Profile  </Link>
                    {/*Logout */}
                    <button  onClick={logout} className='block py-2 px-4 text-sm text-gray-700' ><FontAwesomeIcon icon={faPowerOff} className='me-2' /> Logout</button>
                  </div>
                </div>}
         </div>
        </div>
        }
          
         
        
        </div>
    </div>

    {/*List of items */}
   <nav className='bg-indigo-300 p-3 w-full text-dark text-bold'>
    {/*Menubar & login only for mobike screen */}
    <div className="flex justify-between items-center text-xl md:hidden">
      <button onClick={()=>setListStatus(!liststatus)}><FontAwesomeIcon icon={faBars} /></button>
      {/*Login link */}
         
            <Link to={'/login'}><button className='me-2 hover:bg-black hover:text-white px-3 py-2 border border-black ms-2 rounded'> <FontAwesomeIcon icon={faUser }  className='ms-2 ' /> Login</button></Link>
    </div>

      <ul className={liststatus?'flex flex-col':'hidden md:flex justify-center items-center '}>
       <li className='mx-4 mt-3 md:mt-0'> <Link to={'/'} >HOME</Link></li>
        <li className='mx-4 mt-3  md:mt-0'><Link to={'/all-products'} >SHOP</Link></li>
        <li className='mx-4 mt-3  md:mt-0'><Link to={'/careers'} >CAREERS</Link></li>
       <li className='mx-4 mt-3  md:mt-0'> <Link to={'/contact'} >CONTACT</Link></li>
      </ul>
  
   </nav>
    </>
  )
}

export default Header