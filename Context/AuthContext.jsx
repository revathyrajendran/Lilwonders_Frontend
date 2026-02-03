import React, { createContext, useEffect, useState } from 'react'



export const userAuthContext = createContext()

function AuthContext({children}) {
    //state to see if admin or user
    const[role,setRole]  =useState("")
    //tate to decide authorized or not
    const[authorizedUser,setAuthorizedUser]=useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("user") && sessionStorage.getItem("token")){
            const user = JSON.parse(sessionStorage.getItem("user")) 
            //roles was from schema as is defined
            setRole(user.roles)
            setAuthorizedUser(true)
        }
    },[role,authorizedUser])
  return (
    <>
       <userAuthContext.Provider value={{role,authorizedUser,setAuthorizedUser}}>
          {children}
          </userAuthContext.Provider>
    </>
  )
}

export default AuthContext