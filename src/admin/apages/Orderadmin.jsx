import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer'
import { ToastContainer,toast} from 'react-toastify'
import Adminheader from '../../admin/acomponents/Adminheader'
import Adminsidebar from '../acomponents/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward,  faForward } from '@fortawesome/free-solid-svg-icons'
import { approveCancelsByAdminApi, approveDeliveryAsSoldByAdminApi, approveReturnsByAdminApi, getAllOrdersForAdminApi, getReturnedAndCancelledProductsForAdminApi } from '../../Services/allApis'
import SERVERURL from '../../Services/ServerURL'

function Orderadmin() {
    //token of the logged in admin
    const[token,setToken]=useState("")
    //orderList state
    const[orderListStatus,setOrderListStatus]=useState(true)

    //Return list status 
    const[returnListStatus,setReturnListStatus]=useState(false)

    //Order List Array
    const[orderList,setOrderList]=useState([])

    //Returned Order Array
    const[returnOrderList,setReturnOrderList]=useState([])

                //PAGENATION {
       //pagenation states for current page, current page set to first page
        const[currentPage, setCurrentPage] = useState(1)
         //setting products per page
       const ordersPerPage = 3
        //lastproductindex  , eg: currentpage:1 , productsPerPage:8, indexOfLastproduct:8
        const indexOfLastOrder = currentPage * ordersPerPage
        //firstproductindex , eg: indexOfLastproduct:8 ,productsPerPage:8 , firstproductindex=0
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
        //array is sliced. Your orderList array contains all products fetched from the database.But for pagination, we only want to display 3 orders per page, not all at once.slice() helps us cut out a small portion of the array without changing the original array.Full array → remains unchanged . currentOrders → contains only orders for the current page . array.slice(startIndex, endIndex).startIndex → position where extraction starts (included).endIndex → position where extraction ends (excluded)
        const currentOrders = orderList.slice(
           indexOfFirstOrder,
           indexOfLastOrder
        )
        //Calculating Total Orders, If user  makes more orders,React automatically recalculates total pages.No manual change needed.
        const totalPages = Math.ceil(orderList.length / ordersPerPage)

      console.log(returnOrderList);
      

    //useffect to get orders: returnListStatus is added as an dependecy so that usereffect runs again to fetch returnd orders
    useEffect(()=>{
      const storedToken = sessionStorage.getItem('token')
        if(storedToken){
        setToken(storedToken)
         }
      if(orderListStatus == true){
        getAllOrders(token)
      }else if(returnListStatus == true){
        getAllReturnedAndCancelledOrders(token)
      }
    },[orderListStatus,returnListStatus])

    //function to fetch orders
    const getAllOrders = async(token)=>{
      const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
    try{
          const result = await getAllOrdersForAdminApi(reqHeader)
          if(result.status==200){
            setOrderList(result.data)
          }else{
            console.log(result);
            
          }
        }catch(err){
          console.log(err);
        }
    }

     //function to fetch orders
    const getAllReturnedAndCancelledOrders = async(token)=>{
      const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
    try{
          const result = await getReturnedAndCancelledProductsForAdminApi(reqHeader)
          if(result.status==200){
            setReturnOrderList(result.data)
          }else{
            console.log(result);
            
          }
        }catch(err){
          console.log(err);
        }
    }

    //function to approve returns
    const approveReturn = async(Idoforder)=>{
      if(token){
        const reqHeader = {
      "Authorization" : `Bearer ${token}`
          }
          try{
           const result =  await approveReturnsByAdminApi(Idoforder,reqHeader)
           if(result.status == 200){
            toast.success("Return  Request Approved Successfully!!!")
            //load after  return in process becomes  returned
            getAllReturnedAndCancelledOrders()
           }

          }catch(err){
            console.log(err);
            
          }
      }
    }

     //function to approve cancels
    const approveCancel = async(canelorderID)=>{
      if(token){
        const reqHeader = {
      "Authorization" : `Bearer ${token}`
          }
          try{
            const result = await approveCancelsByAdminApi(canelorderID,reqHeader)
            if(result.status == 200){
              toast.success("Cancel Request Approved Successfully!!!")
              //load after cancel in process becomes canceleld 
            getAllReturnedAndCancelledOrders()
            }

          }catch(err){
            console.log(err);
            
          }
      }
    }


     //function to approve deliveries
    const approveSold = async(soldID)=>{
      if(token){
        const reqHeader = {
      "Authorization" : `Bearer ${token}`
          }
          try{
            const result = await approveDeliveryAsSoldByAdminApi(soldID,reqHeader)
            toast.success("Product Delivered Successfully")
            //ordered becomes sold, reload again
            getAllOrders()

          }catch(err){
            console.log(err);
            
          }
      }
    }

    //PAGENATION{
//to go to previous page
const goToPreviousPage =()=>{
  if(currentPage>1){
      setCurrentPage( currentPage - 1)
  }

}
//to go to next Page
const goToNextPage = () =>{
   if(currentPage<totalPages){
      setCurrentPage( currentPage + 1)
  }
}
//  }

  return (
    <>
         <Adminheader/>
             <div className='md:grid grid-cols-5 gap-2 '> 
                 
                  <div className="col-span-1">
                     <Adminsidebar/>
                 </div>

                 <div className="col-span-4 ">
                       <div className="p-10">
                        <h1 className="text-center text-3xl font-bold">
                               Orders,Returns And Cancels
                       </h1> 
                       {/*two tabs */}
                        <div className='flex justify-center items-center my-5 font-medium text-lg'>
                            <p onClick={()=>{setOrderListStatus(true);setReturnListStatus(false)}} className={orderListStatus? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'} >Orders</p>
                          <p onClick={()=>{setReturnListStatus(true);setOrderListStatus(false)}} className={returnListStatus? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'} > Returns And Cancels</p>
                        </div>
                        {/*Contents */}
                         {/*Admins to see orders based on orderListStatus*/}
                         {
                          orderListStatus &&
                         
                         <div className="md:grid grid-cols-3 mt-5 w-full">


                            
                           {
                                    currentOrders?.length>0?
                                       currentOrders?.map((order,index)=>{
                                        const deliveryButton = order?.orderstatus == 'ordered'
                                        return(

                              <div key={index} className="shadow p-3 rounded m-4 bg-gray-200">

                         <p className="text-red-700 font-bold text-lg">ID : {order?._id}</p>
                
                <div className='flex mt-5 items-center'>
                   
                    <div className="flex flex-col  text-lg ml-6">
                      <img className='text-center' src={`${SERVERURL}/uploads/${order?.productimg}`} width={'80px'}
                      height={'80px'} alt="Ordered Product Image" />
                      <p className="text-blue-700  text-xl font-bold">Product Code : {order?.productcode}</p>
                      <p className="text-blue-800  ">Product Name : {order?.productname}</p>
                      <p className="text-green-600 text-2xl  ">Address Details : </p>
                      <p className='text-blue-800'>{order?.customername}</p>
                      <p className='text-blue-800'>{order?.buildingname}</p>
                      <p className='text-blue-800'>{order?.locality}</p>
                      <p className='text-blue-800'>{order?.pincode}</p>
                      <p className='text-dark'>Contact Details :</p>
                      <p className='text-blue-800'>{order?.phonenumber}</p>
                      <p className='text-blue-800'>{order?.alternatenumber}</p>
                      <p className='text-blue-800'>{order?.Home}</p>
                      <p>{order?.usermail}</p>
                      
                        <p className='text-red-800 text-xl font-bold'>Order Details : {order?.orderstatus}</p>
                        
                        <div className='justify-between'>
                              
                             { deliveryButton &&
                              <button onClick={()=>approveSold(order?._id)} className="p-2 mx-3 font-bold text-xl  bg-green-500 text-dark my-3 text-center">Approve Delivery</button>
                              }
                        </div>
                      
                     </div>
            
                  </div>
                </div>
                  

                     )})
                     :
                     <p className='text-center text-2xl text-dark'>No Orders!!!!!</p>
                      }


                       {/*Button to move previous and next pages  PAGENATION */}
                                           {
                                           orderListStatus && orderList?.length > ordersPerPage && (
                                            <div className='text-center mt-5'>
                                              {/*Backward button , only appears if currentpage is greater than 1 in UI*/}
                                            {
                                              currentPage > 1 &&(
                                                    <button onClick={goToPreviousPage} className='text-3xl'><FontAwesomeIcon icon={faBackward}/></button>
                                              
                                            )}
                      
                                            <p className="font-bold text-xl">Page {currentPage} of {totalPages}</p>
                                              {/*Forward button , only appears if currentpage is lesser than total pages in UI*/}
                                            {
                                              currentPage <  totalPages &&(
                                                   <button onClick={goToNextPage}  className=' text-3xl ms-2'><FontAwesomeIcon icon={faForward}/></button>
                                              
                                            )}
                                           
                                             
                                           </div>
                                          
                                          
                                          )}
                                          
                    
                

                
                          </div>
                         }
                                 



                                 {/*Admins to see returns based on returnListStatus*/}
                         {
                          returnListStatus &&
                         
                         <div className="md:grid grid-cols-3 mt-5 w-full">


                            
                           {
                                    returnOrderList?.length>0?
                                       returnOrderList?.map((returnedorder,index)=>{
                                        const approveRet = returnedorder?.orderstatus =='Return In Process'
                                         const approveCan = returnedorder?.orderstatus =='Cancel In Process'
                                        return(
                                          
                              <div key={index} className="shadow p-3 rounded m-4 bg-gray-200">

                         <p className="text-red-700 font-bold text-lg"> {returnedorder?._id}</p>
                
                <div className='flex mt-5 items-center'>
                   
                    <div className="flex flex-col  text-lg ml-6">
                      <img src={`${SERVERURL}/uploads/${returnedorder?.productimg}`} width={'80px'} height={'80px'} alt="returned Product Image " />
                      <p className="text-blue-800  "> {returnedorder?.name}</p>
                      <p className="text-blue-500  text-xl font-bold">Product Code : {returnedorder?.productcode}</p>
                      <p className="text-blue-500  text-lg">Product Name : {returnedorder?.productname}</p>
                      <p className='text-green-500 text-2xl'>Address Details : </p>
                      <p className='text-blue-800'>{returnedorder?.customername}</p>
                      <p className='text-blue-800'>{returnedorder?.buildingname}</p>
                      <p className='text-blue-800'>{returnedorder?.locality}</p>
                      <p className='text-blue-800'>{returnedorder?.pincode}</p>
                       <p className='text-dark'>Contact Details :</p>
                      <p className='text-blue-800'>{returnedorder?.phonenumber}</p>
                      <p className='text-blue-800'>{returnedorder?.alternatenumber}</p>
                      <p className='text-blue-800'>{returnedorder?.addresstype}</p>
                      <p className='text-dark'>{returnedorder?.usermail}</p>
                        <p className='text-red-800 font-bold text-xl'>Order Status : {returnedorder?.orderstatus}</p>
                      
                     
                      
                      
                        <div >
                             
                              {
                                approveRet &&
                                <button onClick={()=>approveReturn(returnedorder?._id)} className="p-2 mx-3 font-bold text-xl  bg-red-500 text-dark my-3">Approve Return</button>
                              }

                              {
                                approveCan &&
                                <button onClick={()=>approveCancel(returnedorder?._id)} className="p-2 mx-3 font-bold text-xl  bg-red-500 text-dark my-3">Approve Cancel</button>
                              }
                        </div>
                      
                     </div>
            
                  </div>
                </div>
                  

                       )})
                     :
                     <p className='text-center text-2xl text-dark'>No Returns!!!!!</p>
                    }
                          </div>
                         }

                      
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

export default Orderadmin