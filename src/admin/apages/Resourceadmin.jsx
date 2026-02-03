import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer'
import { ToastContainer,toast} from 'react-toastify'
import Adminheader from '../../admin/acomponents/Adminheader'
import Adminsidebar from '../acomponents/Adminsidebar'
import { faBackward,  faForward, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addAProductByAdminApi, deleteAProductByAdminApi, getAllProductsForAdminApi, getAllUsersForAdminApi } from '../../Services/allApis'
import SERVERURL from '../../Services/ServerURL'


const Resourceadmin = () => {
  //token state
  const[token,setToken]=useState("")

 //product list
  const[productliststatus,setProductListStatus]=useState(true)

  //users list, when admin clicks user's tab
  const[usersliststatus,setUsersListStatus]=useState(false)

  //add product status
  const[addproductstatus,setAddProductStatus]=useState(false)

  //userList holding status---to be continued
  const[userList,setUserList]=useState([])

  //state to fetch all products for admin
  const[productsForAdmin,setProductsForAdmin]= useState([])

  console.log(userList);
  console.log(productsForAdmin);
  
  


         //PAGENATION {
  //pagenation states for current page, current page set to first page
  const[currentPage, setCurrentPage] = useState(1)
  //setting products per page
  const productsPerPage = 8
  //lastproductindex  , eg: currentpage:1 , productsPerPage:8, indexOfLastproduct:8
   const indexOfLastproduct = currentPage * productsPerPage
  //firstproductindex , eg: indexOfLastproduct:8 ,productsPerPage:8 , firstproductindex=0
  const indexOfFirstProduct = indexOfLastproduct - productsPerPage
  //array is sliced. Your productsForAdmin array contains all products fetched from the database.But for pagination, we only want to display 8 products per page, not all at once.slice() helps us cut out a small portion of the array without changing the original array.Full array → remains unchanged . currentProducts → contains only products for the current page . array.slice(startIndex, endIndex).startIndex → position where extraction starts (included).endIndex → position where extraction ends (excluded)
  const currentProducts = productsForAdmin.slice(
    indexOfFirstProduct,
    indexOfLastproduct
  )
  //Calculating Total Products, If admin adds more products,React automatically recalculates total pages.No manual change needed.
  const totalPages = Math.ceil(productsForAdmin.length / productsPerPage)

  //State to hold deleted product status
  const[deletedProductStatus,setDeletedProductStatus]=useState(false)
  

  //state for Product uploading by admin , it has many fileds ,  and uploadImges from POSTMAN ,uploadImges:[] because it has multiple images.
  const[productDetails,setProductDetails]=useState({
    name:"", productcode:"",brand:"",ageGroup:"",color:"",price:"",discountPrice:"",description:"", occasion:"",idealFor:"" ,fabrictype:"",fabricCare:"",uploadImges:[]
  })
 //there is an icon showing to upload image , on uploading image, this has tochange to uploaded image.
 const[preview,setPreview] = useState("")
 //to keep urls of all images
 const [previewList,setPreviewList]=useState([])


 //useeffect for token
 useEffect(()=>{
  if(sessionStorage.getItem("token")){
   const token = sessionStorage.getItem("token")
   setToken(token)
   if(productliststatus== true){
    
     getProductsForAdmin(token)
   }else if(usersliststatus==true){
    getUsersForAdmin(token)
   }
  }

 },[usersliststatus])

 //function to add product Images in the form
 const handleUploadProductImage=(e)=>{
  //url is a predefined library in JS, the image url is given to url variable , fileArray is to get all imgaes, not just one image replacing other image and so on.
  const fileArray = productDetails.uploadImges
  //puhing values from uploadImges to fileArray
  fileArray.push(e.target.files[0])
  setProductDetails({...productDetails,uploadImges:fileArray})
  //URL is a class, createObjectURL is a method
  const url = URL.createObjectURL(e.target.files[0])
  setPreview(url)
  const productImgArray = previewList
  productImgArray.push(url)
  setPreviewList(productImgArray)
 }

 //function to submit to add the product
 const handleSubmitToAddProduct=async()=>{
    //destructuring productDetails
    const {name, productcode,brand,ageGroup,color,price,discountPrice,description, occasion,idealFor ,fabrictype,fabricCare,uploadImges} = productDetails

    //checking if all fields are filled
    if(!name || !productcode || !brand || !ageGroup || !color || !price || !discountPrice || !description || !occasion || !idealFor || !fabrictype || !fabricCare || !uploadImges){
      //alerting using toastify if  fields are not filled
      toast.warning("Please Fill The Form Completely!!!")
    }else{
      //since only admin has the power to add a product , no need admin mail here, no in schema also , but since it is an authorized feature, it is needed here.
        const reqHeader = {
            "Authorization" : `Bearer ${token}`
        }
        //FormData is a predefined class in JS
        const reqBody = new FormData()
        //data in productDetails has to be kept in from data, append method can be used , but it is not recommeneded here because productDetails have many fields, calling append that many  times is difficult. so since productDetails is an object, so everything in it can be accessed using key , and here for in loop is used fo this purpose.
        for(let key in productDetails){
          //this step is done because uploadimages was an array
          if(key != "uploadImges"){
            reqBody.append(key,productDetails[key])
          }else{
            productDetails.uploadImges.forEach(img=>{
              reqBody.append("uploadImges",img)
            })
          }
        }
    
    try{
      //API call
      const result = await addAProductByAdminApi(reqHeader,reqBody)
      if(result.status == 401){
        toast.warning(result.response.data)
           // to clear all field of the form
        handleResetForm()
      }else if(result.status==200){
        toast.success("Product Added Successfully!!!!!!!!")
        // to clear all field of the form
        handleResetForm()
        getProductsForAdmin(token)
        
      }else{
        toast.error('Something went wrong!!!')
        // to clear all field of the form
        handleResetForm()
      }
      

    }catch(err){
      console.log(err);
      
    }
  }
 }

 //function to reset product upload form
 const handleResetForm = ()=>{
  setProductDetails({
    name:"", productcode:"",brand:"",ageGroup:"",color:"",price:"",discountPrice:"",description:"", occasion:"",idealFor:"" ,fabrictype:"",fabricCare:"",uploadImges:[]
  })
  //prieveiw of one image and array of 3 images alsp empty
    setPreview("")
    //array which had 3 images
    setPreviewList([])

}

//function to display all prducts for admin to update delivery status of products
const getProductsForAdmin = async(token)=>{
   const reqHeader = {
            "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await getAllProductsForAdminApi(reqHeader)
      if(result.status==200){
           setProductsForAdmin(result.data)
           setCurrentPage(1)
      }

    }catch(err){
      console.log(err);
      
    }
}

//function to get all users list for admin , token there is user token here.
const getUsersForAdmin = async(token)=>{
  const reqHeader = {
      "Authorization" : `Bearer ${token}`
    }
    try{
      const result = await getAllUsersForAdminApi(reqHeader)
      if(result.status==200){
        setUserList(result.data)
      }else{
        console.log(result);
        
      }
    }catch(err){
      console.log(err);
    }
}

//function to delete a product by Admin
const deleteAProductByAdmin=async(productID)=>{
  const reqHeader={
     "Authorization" : `Bearer ${token}`
  }
  try{
    const result = await deleteAProductByAdminApi(productID,reqHeader)
    if(result.status==200){
      toast.success(result.data)
      setDeletedProductStatus(true)
    }else{
      console.log(result);
      
    }

  }catch(err){
    console.log(err);
    
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
          <div className="md:grid grid-cols-5 gap-2 ">
            <div className="col-span-1">
              <Adminsidebar/>
            </div>
    
            <div className="col-span-4">
               <div className="p-10">
                   <h1 className="text-center text-3xl font-bold">
                      All  Collections
                   </h1> 
                   {/*three tabs */}
                    <div className="flex justify-center items-center my-5 font-medium text-lg">
                      <p onClick={()=>{setAddProductStatus(true);setProductListStatus(false); setUsersListStatus(false); }} className={addproductstatus ? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'} >Add  Products</p>
                      <p onClick={()=>{setProductListStatus(true);setAddProductStatus(false); setUsersListStatus(false);  }} className={productliststatus ? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'} > All Products</p>
                      
                      <p onClick={()=>{setUsersListStatus(true); setProductListStatus(false);setAddProductStatus(false)}} className={usersliststatus ? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'}> Users</p>
                      
                     </div>
        {/*Contents */}

         
          {/*sell Products by admin based on addProductStatus*/}
          {
           addproductstatus &&
            <div>
              <div className="p-10 my-20 mx-5 bg-gray-200">
                 <div className="text-center text-3xl font-medium">Product Details</div>
                 {/*Form */}
       <div className="md:grid grid-cols-2 mt-10 w-full">
              <div className='px-3'>
                                
                 <div className="mb-3 ">
                      <input value={productDetails.name} onChange={e=>setProductDetails({...productDetails,name:e.target.value})} type="text" placeholder='Name' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>

                    <div className="mb-3 ">
                      <input value={productDetails.productcode} onChange={e=>setProductDetails({...productDetails,productcode:e.target.value})} type="text" placeholder='Product Code' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>
  
                 
  
                  <div className="mb-3 ">
                        <input value={productDetails.brand} onChange={e=>setProductDetails({...productDetails,brand:e.target.value})} type="text" placeholder='Brand' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                   </div>
  
                  
  
                    <div className="mb-3 ">
                        <input value={productDetails.ageGroup} onChange={e=>setProductDetails({...productDetails,ageGroup:e.target.value})}  type="text" placeholder='Age Group' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                    </div>
  
                  
  

                  
                  <div className="mb-3 ">
                        <input value={productDetails.color} onChange={e=>setProductDetails({...productDetails,color:e.target.value})}  type="text" placeholder='Color' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>

                  
                  <div className="mb-3 ">
                        <input value={productDetails.price} onChange={e=>setProductDetails({...productDetails,price:e.target.value})}  type="text" placeholder='Price' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>

                   <div className="mb-3 ">
                        <input value={productDetails.discountPrice} onChange={e=>setProductDetails({...productDetails,discountPrice:e.target.value})}  type="text" placeholder='Discount Price' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>

                  
                  <div className="mb-3 ">
                        <textarea value={productDetails.description} onChange={e=>setProductDetails({...productDetails,description:e.target.value})}  rows={'6'} type="text" placeholder='Description' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>

                 
                        
            </div>{/*input boxes div end */}

         <div className=" px-3">

              <div className=" mb-3">
                        <input value={productDetails.occasion} onChange={e=>setProductDetails({...productDetails,occasion:e.target.value})}  type="text" placeholder='Occasion' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                   </div>

                   <div className=" mb-3">
                         <input value={productDetails.idealFor} onChange={e=>setProductDetails({...productDetails,idealFor:e.target.value})}  type="text" placeholder='Ideal For' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>
                    <div className=" mb-3">
                         <input value={productDetails.fabrictype} onChange={e=>setProductDetails({...productDetails,fabrictype:e.target.value})}  type="text" placeholder='Fabric Type' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                   </div>
                  <div className=" mb-3">
                        <input value={productDetails.fabricCare} onChange={e=>setProductDetails({...productDetails,fabricCare:e.target.value})}  type="text" placeholder='Fabric Care' className='w-full p-2 border rounded placeholder-gray-400 text-black bg-white' />
                  </div>     

                  {/*product image  */}
                  <div className="mb-3 mt-10 flex justify-center items-center">
                     <label htmlFor="productImage">
                      {/*e means uploading images */}
                      <input onChange={e=>handleUploadProductImage(e)} type="file" id='productImage' className='hidden' 
                      />
                       {/*Conditional rendering using preview ,if not a single image uploaded, upload image with symbol will appear, if uploaded, that uploaded image will come*/}
                     { 
                         !preview?
                      <img src="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png" width={'200px'} height={'200px'}  alt="product image" />
                      :
                      <img src={preview} width={'80px'} height={'80px'}  alt="product Image" />
                    }
                     </label>
                  </div>
                   {/*product image square icon , if one image is uploaded, uploadsymbol image will vanuish and uploaded image will be appearing.PreviewList holda all three images */}
                  { preview && <div className=" flex justify-center items-center">
                    {
                      previewList?.map((imgUrl,index)=>(
                        <img key={index} src={imgUrl} width={'80px'} height={'80px'}  alt="product Image" className='mx-3' />
                      ))
                    }
                   { previewList?.length<3 && <label htmlFor="productImage">
                        {/*e means uploading images from frontend */}
                    <input onChange={e=>handleUploadProductImage(e)} type="file" id='productImage' className='hidden' 
                      />
                       {/*button to upload more than 1 image */}
                       <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3 text-gray-500'/>
                   </label>}

                   </div>}
                                  
          </div>
          

                                      
        </div>{/*form main div end */}
        {/*Keys in footer  */}
        <div className="bg-gray-200 p-3  w-full flex justify-end mt-5">
                                <button onClick={handleResetForm} className="bg-gray-700 text-white py-2 px-3 mx-3 hover:bg-white hover:text-black hover:border">Reset</button>

                                <button onClick={handleSubmitToAddProduct} className="bg-blue-600 text-white py-2 px-3 mx-3 hover:bg-white hover:text-black hover:border hover:border-blue-700">Submit</button>
                                   
                              </div>

       </div>
             </div>
          }

                    {/*Products added by admin for admin based on productsForAdmin state */}

            {          
              productliststatus &&
              
               <div className="md:grid grid-cols-4 mt-5 w-full">
                   {/*To be duplicated!!! product image is also conditional rendering */}
                    { 
                     currentProducts?.length>0?
                       currentProducts?.map(product=>(
                          <div key={product?._id}  className="shadow p-3 rounded m-4">
                            <button onClick={()=>deleteAProductByAdmin(product?._id)} className="text-center text-2xl my-1 text-red-600"><FontAwesomeIcon icon={faTrash}/></button>
                  <img width={'100%'} height={'300px'} src={product?.uploadImg?.length>0?
                  `${SERVERURL}/uploads/${product?.uploadImg[0]}`
                  :
                  "https://png.pngtree.com/png-vector/20221125/ourlarge/pngtree-no-image-available-icon-flatvector-illustration-pic-design-profile-vector-png-image_40966566.jpg"
                  }  />
                  <div className="flex flex-col justify-center align-center">
                    <p className="text-blue-700 font-bold text-lg">{product?.name}</p>
                    <p>$ {product?.discountPrice}</p>
                  </div>
                  {/* if product status based icons */}
                   <div >
                    
                  </div>

                      </div>
                      
                       ))
                       :
                      <p className="text-center text-lg font-bold">No Produts yet!!!!!!!!</p>
                      
                    }

                </div>    
            }
                       {/*Button to move previous and next pages  PAGENATION */}
                     {
                     productliststatus && productsForAdmin?.length > productsPerPage && (
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
                    
                    
                     {/*Users */}

                      {/*To be duplicated */}

            {          
              usersliststatus &&
                 
              
               <div className="md:grid grid-cols-3 mt-5 w-full">
              
               {
                userList?.length>0?
                     userList?.map((user,index)=>(
                      <div key={index} className="shadow p-3 rounded m-4 bg-gray-200">

                <p className="text-red-700 font-bold text-lg">ID : {user?._id}</p>
                
                <div className='flex mt-5 items-center'>
                   <img width={'100px'} height={'100px'} style={{borderRadius:'50%'}} src={user?.profile?`${SERVERURL}/uploads/${user?.profile}`:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRNPQxt8ZLNHXp6jkHGmadRYrCKGE53w9ufg&s"}  alt="user profile pic" />
                    <div className="flex flex-col  text-lg ml-6">
                      
                      <p className='text-blue-800'>{user?.username}</p>
                      <p>{user?.email}</p>
                      
                     </div>
            
                  </div>
                </div>
                     ))
                     :
                     <p className='text-center text-2xl text-dark'>No Users!!!!!</p>
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

export default Resourceadmin