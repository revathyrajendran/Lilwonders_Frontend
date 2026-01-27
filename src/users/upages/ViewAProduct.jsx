import React, { useEffect, useState } from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera, faEye } from '@fortawesome/free-regular-svg-icons'
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { ToastContainer,toast} from 'react-toastify'
import { ViewASingleProductForUserShoppingApi } from '../../Services/allApis'
import SERVERURL from '../../Services/ServerURL'

const ViewAProduct = () => {
  //modal for viewing pictures using eye icon
  const[modalstatus,setModalStatus]= useState(false)
  //To view a single book, we need the id of the particular book : <Route path='product/:id/view' element={<ViewAProduct/>} /> this id value. So destructuring id value . Useparams is used to get dynamic Id.
  const {id} = useParams()
  //state to hold product details - only one product , otherwise array of many objects for multiple books.
  const[aProductDetail,setAProductDetail]=useState({})

  console.log(aProductDetail);
  

  //useeffect to load product details. Empty dependency : Call viewAProduct() only once , when the component loads for the first time.
  useEffect(()=>{
    viewAProduct()
  },[])


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
              {/*buttons */}
              <div className="flex justify-end">
                 <Link to={'/all-products'} className="bg-blue-900 text-white p-2 rounded me-3"><FontAwesomeIcon icon={faBackward}/>Back</Link>
                  <Link className="bg-green-900 text-white p-2 ms-5 rounded">Buy $ {aProductDetail?.
discountPrice}</Link>
              </div>

            </div>
        </div>
      </div>
    </div>

      {/*Modal */}
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