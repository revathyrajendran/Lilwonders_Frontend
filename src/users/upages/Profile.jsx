import React, { useContext, useEffect, useState } from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { ToastContainer,toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import SERVERURL from '../../Services/ServerURL'
import Edituserprofile from '../ucomponents/Edituserprofile'
import { userProfileDetailsUpdateContext } from '../../../Context/ContextShare'


import { useNavigate } from 'react-router-dom'
import { getAllPurchasedProductsOfAUserApi, ReturnProductByUserApi } from '../../Services/allApis'


const Profile = () => {
  //styles for three status
  //navigation
  const navigate = useNavigate()

  

  //Token of the user
  const[token,setToken]=useState("")

  //in profile, users can see their profile pic as well as their name
  const[loggedInUserName,setLoggedInUserName]=useState("")

  //to store DP of logged in user from profile key of user object(parsed)
  const[loggedInUserDP,setLoggedInUserDp]=useState("")


//data to be shared using context, it must be an object. Only state is needed.Data from ContextApi.jsx.
    const{userEditedProfile}=useContext(userProfileDetailsUpdateContext)


//state to store purchased product status, so array
const[purchasedProductList,setPurchasedProductList]=useState([])
  //every loggedin users will have a token stored in sessionstorage, so it must checked before hand also, useeffect is used for that purpose.
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      //user was an object with username as a key , but is stored in sessionstorage as string, it must be converted to object to use it here, so JSON.parse is used.
      const LoggedInUser = JSON.parse(sessionStorage.getItem("user"))
      setLoggedInUserName(LoggedInUser.username)
      //Excisting DP of logged in user
      setLoggedInUserDp(LoggedInUser.profile)
    }
  },[userEditedProfile])

  //useEffect for getting all products for a logged in user
  useEffect(()=>{
   if(token){
     getAllPurchasedProductsOfAUser()
   }

  },[token])

  //Function to get all products purchased by user
  const getAllPurchasedProductsOfAUser=async()=>{
    const reqHeader={
      "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await getAllPurchasedProductsOfAUserApi(reqHeader)
      if(result.status==200){
        setPurchasedProductList(result.data)

      }else{
        console.log(result);
        

      }

    }catch(err){
      console.log(err);
      
    }
  }

  

  //function to return a product,product here is just a parameter
  const ReturnAproduct=async(product)=>{
          if(token){
          const reqHeader={
            "Authorization" : `Bearer ${token}`
            }
            const reqBody={
          _id:product._id,name:product.name,productcode:product.productcode,brand:product.brand,ageGroup:product.ageGroup,color:product.color,price:product.price,discountPrice:product.discountPrice,description:product.description,occasion:product.occasion,idealFor:product.idealFor,fabrictype:product.fabrictype,fabricCare:product.fabricCare,uploadImg:product.uploadImg
        }
        try{
          const result =  await ReturnProductByUserApi(reqBody,reqHeader)
          if(result.status==200){
            setTimeout(() => {
              navigate('/return-order')
            }, 1500);
          getAllPurchasedProductsOfAUser()
          }
        }catch(err){
          console.log(err);
          
        }
        }
   }

  
  

  return (
    <>
    <Header/>
         <div style={{height:'200px'}} className="bg-black">

         </div>
         <div style={{width:'230px', height:'230px',borderRadius:'50%',marginLeft:'70px',marginTop:'-130px'}} className="bg-white p-3"> 
          {/*If loggedinuserDp is empty or noyt is checked, if not then if users is logged in useing google login is checked, if yes then it is dp, not means google pic */}
          <img style={{width:'200px', height:'200px',borderRadius:'50%'}} src={ loggedInUserDP==""?"https://cdn-icons-png.flaticon.com/512/149/149071.png":loggedInUserDP.startsWith("https://lh3.googleusercontent.com/") ?loggedInUserDP:`${SERVERURL}/uploads/${loggedInUserDP}`} />
         </div>
         {/*name,blue tick ,edit button */}
         <div className="md:flex justify-between px-20 mt-5">
                  <div className="flex justify-center items-center">
                            <h1 className="font-bold md:text-3xl text-2xl">
                             {loggedInUserName}
                            </h1>
                            <FontAwesomeIcon className='text-blue-500 ms-3 ' icon={faCircleCheck} />
                  </div>
                  {/*EDit as a separate component */}
                  <div>
                    <Edituserprofile/>
                  </div>
         </div>
         <br />
         {/* paragraph */}
         <p className="md:px-20 px-5 my-2 text-justify text-2xl text-violet-700">
            We’re so happy to have you here! 💖
Browse adorable outfits, special deals, and new arrivals curated with love for your little ones.
         </p>

         {/*sections */}
         <div className="md:px-20">
            <div className="flex justify-center items-center my-5 font-medium text-lg">
                      
                     <h1 className="text-center text-blue-900 text-xl font-bold border border-2px border-dark p-3">Purchase History</h1>
            </div>
            {/*Contents */}
          
          
          
          {/* purchasestatus of a user */}
          {
            purchasedProductList?.length>0?
               purchasedProductList?.map((purchasedProduct,index)=>{
                

                 const RetButton =
                 purchasedProduct.status === 'sold' 
                
                
            return  ( <div key={index} className="p-10 my-20 shadow">
               {/* Products to be duplicated */}
               <div className="p-5 rounded mt-5 bg-gray-100">
                  <div className="md:grid grid-cols-[3fr_1fr]">
                    
                     {/* productstatus */}
                    <div className="px-3">
                      <h1 className="text-2xl">{purchasedProduct?.name}</h1>
                      
                       <h3 className="text-lg text-blue-400">$ {purchasedProduct?.discountPrice}</h3>
                       

                       {/*Product status :  sold  */ }
                       <div className="flex">
                          
                          {
                            purchasedProduct?.status == 'sold' ?
                             <img width={'100px'} height={'100px '} src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.svg" alt="purchased" />
                            :
                            <p className="text-red font-bold text-xl">{purchasedProduct?.status}</p>

                          }
                         

                           
                        
                         
                       </div>


                       
                    </div>
                    {/*  product image */}
                    <div className="px-4 mt-4 md:mt-0">
                      <img className='w-full' src={purchasedProduct?.uploadImg?.length>0?`${SERVERURL}/uploads/${purchasedProduct?.uploadImg[0]}`:"https://psdstamps.com/wp-content/uploads/2022/04/round-sold-stamp-png.png"} alt="user purchased product" />
                        {/* Cancel Button and Return button only if status is delivered or shiiped */}
                       <div className='flex'>
                         
                         { RetButton &&
                           <button onClick={()=>ReturnAproduct(purchasedProduct)}  className="bg-red-600 text-white p-3 my-3 float-end text-xl me-2 rounded" >Return</button>
                         }
                          
                          
                       </div>

                    </div>
          
                    
                     
                    
                    
                  </div>

               </div>
            </div>)})
            :
            <div className="text-center">
              <p className="text-center text-dark-800 text-2xl font-bold">No purchase yet? Start Purchasing From Today!</p>
             
            </div>
           
          }
          
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

export default Profile