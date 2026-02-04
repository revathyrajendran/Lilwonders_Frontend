import React, { useEffect, useState } from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEye } from '@fortawesome/free-regular-svg-icons'
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer,toast} from 'react-toastify'
import { makePaymentByUserApi, userAddAddressApi, ViewASingleProductForUserShoppingApi } from '../../Services/allApis'
import SERVERURL from '../../Services/ServerURL'
//buying a product import
import {loadStripe} from '@stripe/stripe-js';

const ViewAProduct = () => {
  //modal for viewing pictures using eye icon
  const[modalstatus,setModalStatus]= useState(false)

  //modal for users to enter their address while buying a product
  const[addressModalStatus,setAddressModalStatus]= useState(false)

  //state to hold address details entered by users
  const[addressDetail,setAddressDetail]=useState({
          customername:"",buildingname:"",locality:"",pincode:"", phonenumber:"",alternatenumber:"",addresstype:"",productcode:"",productname:"", productprice:"",productimg:""
  })
  
  //To view a single book, we need the id of the particular book : <Route path='product/:id/view' element={<ViewAProduct/>} /> this id value. So destructuring id value . Useparams is used to get dynamic Id.
  const {id} = useParams()
  //state to hold product details - only one product , otherwise array of many objects for multiple books.
  const[aProductDetail,setAProductDetail]=useState({})

  console.log(aProductDetail);
  

  //useeffect to load product details. Empty dependency : Call viewAProduct() only once , when the component loads for the first time.
  useEffect(()=>{
    viewAProduct()
  },[])


  //function to reset form
  const handleReset=()=>{
      setAddressDetail({
         customername:"",buildingname:"",locality:"",pincode:"", phonenumber:"",alternatenumber:"",addresstype:""
      })
     setAddressModalStatus(false)
      
  }

   //payment option, loadStripe is synchronous
  const handlePayment=async()=>{
       console.log("Inside handlePayment!");
       //stripe object , pk_test_ is copied from stripe.com after sign in
    const stripe = await loadStripe('pk_test_51SvCnM2FRWxWdt4UC5xocClYRIm6mL14l8FaFtgCRXnPSp8YVxtz640bOsu40clG9Wk16XT9kys1hF2toxtJTv1100OpxpzSuk');
    console.log(stripe);
    //token
    const token = sessionStorage.getItem("token")
    if(token){
      //defining reqheader
       const reqHeader = {
        "Authorization" : `Bearer ${token}`
       } 
       //error prone
       try{
        //aProductDetail holds the detail of the book user is viewing
        const result = await makePaymentByUserApi(aProductDetail,reqHeader)
        console.log(result);
           //redirectToCheckout is a predefined method in stripe
        //stripe.redirectToCheckout({
          //in axios server response is always in result.data
          //sessionurl:result.data.checkoutSessionURL
        //})
        const checkoutSessionURL = result.data.checkoutSessionURL
        if(checkoutSessionURL){
          //redirect
          window.location.href = checkoutSessionURL
        }

       }catch(err){
        console.log(err);
        
       }
    }
  }


  //handle place order only after address details are filled.
  const handlePlaceOrder = async()=>{
    if(!addressDetail.customername || !addressDetail.buildingname || !addressDetail.locality ||!addressDetail.phonenumber || !addressDetail.alternatenumber || !addressDetail.pincode || !addressDetail.addresstype){
      toast.warning("Enter All the address Details!!!!!!!!!!")
    }
    else{
      const token = sessionStorage.getItem('token')
      if(token){
        //defining reqheader
       const reqHeader = {
        "Authorization" : `Bearer ${token}`
       } 
       try{
        const result = await userAddAddressApi(addressDetail,reqHeader)
        if(result.status==200){
          toast.success("Address Details submitted successfully")
          handleReset()
          //after 2 seconds
          setTimeout(() => {
             handlePayment()
          }, 2000);
        }

       }catch(err){
        console.log(err);
        
       }
      }
    }
  }


  //to view a book , this function does not need to use id as an argument because, already we have declared the variable using use params, so can be accessed anywhere in the component.
  const viewAProduct = async()=>{
    //Here usestate is not used for token , instead just if else statement is used. This is to make sure if user is logged in by getting token
     const token = sessionStorage.getItem("token")
     if(token){
      const reqHeader = {
        "Authorization":`Bearer ${token}`
      }
    
     
     try{
      const result = await ViewASingleProductForUserShoppingApi(id, reqHeader)
      console.log(result);
      
      if(result.status == 200){
          setAProductDetail(result.data)
      }
      else if(result.status == 401){
        // 401 is defined in jwtmiddleware, invalid token
        toast.warning(result.response.data)

      }

     }catch(err){
      console.log(err);
      
     }
    }
    
  }

  return (
    <>
    <Header/>
    <div className="md:m-10 m-5">
      <div className="border p-5 shadow border-gray-200">
        <div className="md:grid grid-cols-4 gap-5">
            <div className="col-span-1">
              < img className='w-full'  src={aProductDetail?.uploadImg?.length>0?`${SERVERURL}/uploads/${aProductDetail?.uploadImg[0]}` : <p className="font-bold ">No Image To Display!</p> }  alt="book" />
            </div>

            <div className="col-span-3">
              <div className='flex justify-between'>
                <h1 className="text-2xl font-bold text-center">{aProductDetail?.name}</h1>
                <div className='flex '>
                  <p className="text-blue-600">View More Images</p>
                  <button onClick={()=>setModalStatus(true)} className='text-gray-500 mx-3'><FontAwesomeIcon icon={faEye}/></button>
                </div>
                </div>
              <p className=" my-10 text-violet-800">{aProductDetail?.idealFor}</p>
              <div className="md:grid grid-cols-3 gap-5 my-10">
                <p className="font-bold ">Product Code  : <span className='text-violet-800'>{aProductDetail?.productcode}</span></p>
                <p className="font-bold ">Age-group : {aProductDetail?.ageGroup} </p>
                <p className="font-bold ">Color : {aProductDetail?.color} </p>
                <p className="font-bold ">Occasion : {aProductDetail?.occasion}</p>
                
                <p className="font-bold ">Fabric Type : {aProductDetail?.fabrictype}</p>
                <p className="font-bold ">Fabric Care : {aProductDetail?.fabricCare}</p>
               
              </div>
              <div className="md:my-10 my-4">
                <p className="font-bold text-lg">
                  {aProductDetail?.description}
                </p>
              </div>
              {/*buttons {aProductDetail?.
discountPrice} */}
              <div className="flex justify-end">
                 <Link to={'/all-products'} className="bg-blue-900 text-white p-2 rounded me-3"><FontAwesomeIcon icon={faBackward}/>Back</Link>
                  <Link  onClick={()=>{setAddressDetail({...addressDetail,productcode: aProductDetail?.productcode,
      productname: aProductDetail?.name,
      productprice: aProductDetail?.discountPrice,
      productimg: aProductDetail?.uploadImg?.[0]});setAddressModalStatus(true)}}  className="bg-green-900 text-white p-2 ms-5 rounded">Buy $ {aProductDetail?.
discountPrice}</Link>
              </div>

            </div>
        </div>
      </div>
    </div>

      {/*Modal to view products */}
      {
        modalstatus &&
        <div className='relative z-10 overflow-y-auto' >
                <div className="bg-gray-500/75 fixed inset-0 ">
                  <div className=" flex justify-center items-center min-h-screen scroll-auto">
                    <div  className=' bg-white rounded-2xl w-100 md:w-250 '>
                      <div className='bg-black text-white flex justify-between items-center p-3'>
                        <h3>Product Images</h3>
                        <FontAwesomeIcon onClick={()=>setModalStatus(false)} icon={faXmark}/>
                      </div>
  
                        <div className='relative p-5'>
                           <p className='text-blue-600 '>
                           <FontAwesomeIcon  className='me-2' icon={faCamera}/> Camera clicks of the Product!
                           </p>
                           
                           <div className="md:flex flex-wrap my-4">
                            {/*images to be duplicated uploadImg in aProductDetail */}
                            
                             { aProductDetail?.uploadImg?.length>0?
                                    aProductDetail?.uploadImg?.map(img=>(<img width={'250px'} height={'250px'} className='mx-3 '  src={`${SERVERURL}/uploads/${img}`} alt="Product images" />

                                    ))
                                    :
                              <p className='text-xl font-bold'>The seller has not uploaded any images!</p>
                              
                            }
                             

                           
                          </div>
                        </div>
                        

                    </div>

                  </div>
                </div>
        </div>
      }


      {/*Modal to provide address */}
      {
        addressModalStatus &&
        <div className='relative z-10 overflow-y-auto'>
          <div className='bg-gray-500/75 fixed inset-0'>
             <div className='flex justify-center items-center min-h-screen scroll-auto'>
                 <div className='bg-white rounded-2xl w-150'>
                   
                    {/*Modal header */}
                <div className='bg-black text-white flex justify-between items-center p-3 text-xl'>
                                <h3>Add Your Address</h3>
                      <FontAwesomeIcon onClick={()=>setAddressModalStatus(false)} icon={faXmark}/>
                </div>
                 {/*Modal body */}
        
                              <div className='relative p-5'>
                                <div className="md:grid grid-cols-2 gap-x-3">

                                 
                                    {/*Product Details */}
                                   
                                  <div className="mb-3">
                                         {
                                          aProductDetail?.uploadImg?.length > 0 &&
                                              <img width={"70px"} height={"70px"} className="mb-2 rounded"
                                            src={`${SERVERURL}/uploads/${addressDetail?.productimg}`}
                                            alt="Product Image"
                                              />
                                                }
                                    </div>
                                             
                                             <div className='mb-3'>
                                               <p className="text-violet-500 text-xl font-bold "> {addressDetail?.productcode}</p>
                                              </div>
                                            
                                           <div className='mb-3'>
                                             <p className="font-bold">{addressDetail?.productname}</p>
                                          </div>
                                           
                                            <div className='mb-3'>
                                              <p className="text-violet-500 text-2xl font-bold">₹ {addressDetail?.productprice}</p>
                                            </div>
                                 
                                 
                                  

                                  <div className="mb-3">
                                    <input value={addressDetail.customername} onChange={e=>setAddressDetail({...addressDetail,customername:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder=' Full Name' />
                                  </div>
                                
                                  <div className="mb-3">
                                    <input value={addressDetail.buildingname} onChange={e=>setAddressDetail({...addressDetail,buildingname:e.target.value})}  type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Building Name' />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <input value={addressDetail.locality} onChange={e=>setAddressDetail({...addressDetail,locality:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Locality' />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <input value={addressDetail.pincode} onChange={e=>setAddressDetail({...addressDetail,pincode:e.target.value})}  type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Pincode' />
                                  </div>
  
                                  <div className="mb-3">
                                     <input value={addressDetail.phonenumber} onChange={e=>setAddressDetail({...addressDetail,phonenumber:e.target.value})}  type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Phone Number ' />
                                  </div>

                                  <div className="mb-3">
                                     <input value={addressDetail.alternatenumber} onChange={e=>setAddressDetail({...addressDetail,alternatenumber:e.target.value})}  type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Alternate Phone Number ' />
                                  </div>

                                  <div className="mb-3">
                                     <input value={addressDetail.addresstype} onChange={e=>setAddressDetail({...addressDetail,addresstype:e.target.value})}  type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Address Type ' />
                                  </div>


                                  
                                  
                                </div>
                              </div>
                               {/*Modal footer */}
                                
                                <div className="bg-gray-200 p-3  w-full flex justify-end">
                                  <button onClick={handleReset} className="bg-gray-700 text-white py-2 px-3 mx-3">Cancel</button>
  
                                  <button onClick={handlePlaceOrder} className="bg-blue-600 text-white py-2 px-3 mx-3">Place Order</button>
                                     
                                </div>

                 </div>

             </div>

          </div>
                
        </div>
      }

    <Footer/>

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

export default ViewAProduct