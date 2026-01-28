import commonApi from "./commonAPI"
import SERVERURL from "./ServerURL"
//-----------------unauthorized API---------------------
      //-------admin and users---------------
 //1) to see All Jobs
 export const seeAllJobsApi = async(searchKey)=>{
   return await commonApi("GET",`${SERVERURL}/all-jobs?search=${searchKey}`)
 }
//2)register api - called by Auth component when register button is clicked
export const registerApi=async(reqBody)=>{
        return await commonApi("POST",`${SERVERURL}/register`,reqBody)//for register , no header needed.
}
   
//3)login api
export const loginApi=async(reqBody)=>{
        return await commonApi("POST",`${SERVERURL}/login`,reqBody)//for register , no header needed.
}
//4)google-login
export const googleLoginApi=async(reqBody)=>{
        return await commonApi("POST",`${SERVERURL}/google-login`,reqBody)//for register , no header needed.
}

//------------------Authorized------------------
    //---------------admin-----------------------------------
    //add job api BY admin
    export const addJobByAdminAPI = async(reqBody,reqHeader)=>{
       return await commonApi("POST",`${SERVERURL}/admin-addjob`,reqBody,reqHeader)
    }

    //delete A Job By Admin Authorized, jobID and reqHeaders is needed.
    export const deleteAJobApi=async(jobID,reqHeader)=>{
      return await commonApi("DELETE",`${SERVERURL}/job/${jobID}/remove`,{},reqHeader)

    }

    //users might have applied to various jobs, admin must see who all have applied in applications, called by admin Career component
    export const getAllUserApplicationsAPI = async(reqHeader)=>{
      return await commonApi("GET",`${SERVERURL}/all-application/admin`,{},reqHeader)
    }

    //admin to see all users of the application, authorization is required to get admin's mail id , admin is also a user, but admin must not see admin itself. ---To be Completed.
    export const getAllUsersForAdminApi = async(reqHeader)=>{
        return await commonApi("GET",`${SERVERURL}/admin-allusers`,{},reqHeader)
    }

    //add a product api
    export const addAProductByAdminApi= async(reqHeader,reqBody)=>{
        return await commonApi("POST",`${SERVERURL}/admin-addproduct`,reqBody,reqHeader)
    }
    //get all products for admin API
    export const getAllProductsForAdminApi=async(reqHeader)=>{
        return await commonApi("GET",`${SERVERURL}/admin-getallproducts`,{},reqHeader)
    }
    //update admin profile
    export const updateAdminProfileApi=async(reqBody,reqHeader)=>{
      return await commonApi("PUT",`${SERVERURL}/admin-profile/edit`,reqBody,reqHeader)

    }
    //delete  a product uploaded by admin, product is also uploaded by admin in the website
    export const deleteAProductByAdminApi=async(productID,reqHeader)=>{
      return await commonApi("DELETE",`${SERVERURL}/admin/${productID}/deleteproduct`,{},reqHeader)

    }
    
    //---------users---------------------
       //get all products for logged in user when user clicks shop menu in the header,for logged in
         export const getAllProductsForUserShoppingApi=async(search,reqHeader)=>{
                return await commonApi("GET",`${SERVERURL}/user-allproducts?search=${search}`,{},reqHeader)
         }
       //View A single Product for logged in users when user tries to view a single product
       export const ViewASingleProductForUserShoppingApi=async(productID,reqHeader)=>{
        return await commonApi("GET",`${SERVERURL}/product/${productID}/view`,{},reqHeader)
       }
       //Authorization not required here, any user who take the website can see these products
       export const getAllProductsInHomePageApi=async()=>{
        return await commonApi("GET",`${SERVERURL}/home-products`)
       }
       //Logged in user Profile updation
       export const loggedInUserProfileUpdateApi = async(reqBody,reqHeader)=>{
              return await commonApi("PUT",`${SERVERURL}/user-profile/edit`,reqBody,reqHeader)
       }
       //user purchased products
       export const getAllPurchasedProductsOfAUserApi = async(reqHeader)=>{
        return await commonApi("GET",`${SERVERURL}/user-bought/products`,{},reqHeader)
       }
       //logged in user to apply for a job, called by career component of users
    export const userApplyJobApi=async(reqBody,reqHeader)=>{
      return await commonApi("POST",`${SERVERURL}/user-application/add`,reqBody,reqHeader)

    }

