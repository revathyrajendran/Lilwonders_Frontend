import React, { Children, useState } from 'react'
import { createContext } from 'react'

//this is created outside function to make it available to all different component. createContext is used
export const searchProductContext = createContext("")

//the profile of the user in header as well as profile page has to be updated at the same time .The updated profile must load automatically without the user refreshing the page.
export const userProfileDetailsUpdateContext = createContext("")

//admin profile edit data, beacuse in sidebars also in every admin components, the edited data must be seen
export const adminProfileDetailsUpdateContext = createContext("")

//children is predefined attribute
function ContextShare({children}) {
  //searchKey for searching products
   const[searchKey,setSearchKey]=useState("")

  //the data to be shared to header and profile page from edit page
  const[userEditedProfile,setUserEditedProfile]=useState({})

  //the data needs to be common angong side bars of all admin pages
  const[adminEditedProfile,setAdminEditedProfile]=useState({})

//value here accepts only objects, so yellow braces, now since the state is a part of js,blue braces so two braces {{}}  {children}
  return (
    <>
     <searchProductContext.Provider value= {{searchKey,setSearchKey}}>
          <userProfileDetailsUpdateContext.Provider value = {{userEditedProfile,setUserEditedProfile}}>
                <adminProfileDetailsUpdateContext.Provider value={{adminEditedProfile,setAdminEditedProfile}}>
                                   {children}
                </adminProfileDetailsUpdateContext.Provider>
           </userProfileDetailsUpdateContext.Provider>         
      </searchProductContext.Provider>

       
    
    </>
  )
}

export default ContextShare