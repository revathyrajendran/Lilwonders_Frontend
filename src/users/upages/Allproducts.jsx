import React, { useContext, useEffect, useState } from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faBars, faForward } from '@fortawesome/free-solid-svg-icons'
import { searchProductContext } from '../../../Context/ContextShare'
import { getAllProductsForUserShoppingApi } from '../../Services/allApis'
import { ToastContainer,toast} from 'react-toastify'
import SERVERURL from '../../Services/ServerURL'


const Allproducts = () => {
  const [liststatus,setListStatus]=useState(false)
  //token state : only logged in users can see the products also .
  const[token,setToken]=useState("")

  //to search products 
  const{searchKey,setSearchKey}=useContext(searchProductContext)

  //state to store all products for users.
  const[allProducts,setAllProducts]=useState([])

  //just to see if products are getting
  console.log(allProducts);

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
  const currentProducts = allProducts.slice(
    indexOfFirstProduct,
    indexOfLastproduct
  )
  //Calculating Total Products, If admin adds more products,React automatically recalculates total pages.No manual change needed.
  const totalPages = Math.ceil(allProducts.length / productsPerPage)
         //     }

//State to store products temporarily for filtering
const[tempProducts, setTempProducts]=useState([])

//array to keep categories for filtering : because writing code for all categories is a difficut task here
const[allAgesBasedFiltering,setAllAgesBasedFiltering]=useState([])

  //useeffect to get user Token
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      //userToken is limitted to this function alone
      const userToken = sessionStorage.getItem("token")
      setToken(sessionStorage.getItem("token"))
      getAllProductsForShoppingForUsers(userToken)
    }
  },[searchKey])

  //function to get all products
  const getAllProductsForShoppingForUsers = async(userToken)=>{
    //user must be logged in , so token is needed.
    const reqHeader = {
      "Authorization" : `Bearer ${userToken}`
    }
    try{
      const result = await getAllProductsForUserShoppingApi(searchKey,reqHeader)
      
      if(result.status==200){
      //storing the products in array state
      setAllProducts(result.data)
      //temp array for filtering
      setTempProducts(result.data)
       //so inside allAgesBasedFiltering , Which is a variable , we need to hold categories , because otherwise all these categories will appear in the sidebar : eg: fiction fiction .
        const allAgesBasedFiltering= result.data.map(item=>item.ageGroup)

        //temparray, which is a variable to hold temporaray category or categories of products sold by admin
         const tempArray = [...new Set(allAgesBasedFiltering)]

         //tempArray 
         setAllAgesBasedFiltering(tempArray)
      }
      else{
        console.log(result);
        toast.warning(result.response.data)
        
      }

    }catch(err){
      console.log(err);
      
    }

    
  }

//To filter and see products sold based on their ageGroup , ageGroup is the argument here
const filterProducts =(ageGroup)=>{
   //filtered products must also be in the allProducts array, so filtering it because filter gives results that only satisfy a condition, each product in allProducts  is item here, lowercase to mak speelings of filter category and argument category the same. setProducts because we need to see filtered books in all products page itself and books were holding every books, now also filtered books. The page will display all books if user has not applied any filter. ageCategory is just a function scoped argument
   if(ageGroup == "No Filter"){
    setAllProducts(tempProducts)
   }else{
    setAllProducts(tempProducts?.filter(aproduct=>aproduct.ageGroup.toLowerCase().includes(ageGroup.toLowerCase())))
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
     <Header/>
     {/*Conditional Rendering based on token expolre more is no user is logged in */}

      {  
          token?
        <>    
     <div className='bg-indigo-100'>
        <div className="flex justify-center items-center flex-col ">
          <h1 className="text-3xl my-2"> Our Collections</h1>
          {/*Search */}
          <div className="flex my-5">
             <input value={searchKey} type="text" className="p-2 rounded text-black border-gray-200 placeholder-gray-600 border w-100 shadow bg-white" placeholder='Search by titles' onChange={e=>setSearchKey(e.target.value)} />
             <button className="bg-blue-900 text-white p-2 ">Search</button>
          </div>
        </div>
  
        {/*grid */}
        <div className="grid grid-cols-4 md:px-40 p-5">
          {/*Filter */}
          <div className="col-span-1 ">
            {/*Menu for small devices */}
            <div className="flex justify-between">
             <h1 className="font-semibold text-2xl">Filter</h1>
             <button onClick={()=>setListStatus(!liststatus)} className='md:hidden text-2xl'><FontAwesomeIcon icon={faBars} /></button>
            </div>
            {/*Filter options in 1 div */}
            

            <div className={liststatus?'block':'md:block hidden'}>

              {
                allAgesBasedFiltering?.length>0 &&
                allAgesBasedFiltering?.map((age,index)=>(
                <div key={index} className="mt-3">
                   <input type="radio" name='filter' id={age} onClick={()=>{filterProducts(age)}}/>
                   <label className='ms-3' htmlFor={age} >{age}</label>
               </div>
                ))

              }

              <div className="mt-3">
                <input type="radio" name='filter' id='nofilter' onClick={()=>{filterProducts("No Filter")}} />
                <label className='ms-3' htmlFor="nofilter" >No Filter</label>
              </div>
            </div>
          </div>
  
          {/*Product array to be duplicated. */}
          <div className="col-span-3">
            <div className="md:grid grid-cols-4 gap-1 mt-5 md:mt-0">
  
                {
                  currentProducts?.length>0?
                     currentProducts?.map(product=>(
                      <div key={product?._id}  className="shadow p-3 rounded mx-2">
                    <img width={'100%'} height={'300px'} src={product?.uploadImg?.length>0? `${SERVERURL}/uploads/${product?.uploadImg[0]}`
:"https://5.imimg.com/data5/SELLER/Default/2023/4/301623268/MD/GE/QU/41032088/screenshot-20221123-201106-patpat-500x500.png"} alt="" />
                    <div className="flex flex-col justify-center align-center">
                      <p className="text-blue-700 font-bold text-lg">{product?.name}</p>
                     
                      <p><del style={{transform: "translateY(-6px)"}} className='text-red-600'>{product?.price}</del><span className='text-black-500 ms-3'>{product?.discountPrice}</span></p>
                    <Link to={`/product/${product?._id}/view`} className='mt-2 text-center  bg-blue-800 text-white p-2 '>View </Link>
                    </div>
                  </div>
                     ))
                  :
                  <p className="text-center font-bold text-lg">No Products Found!!!!!!!!!!</p>

                }
                  
  
                  
                  
                  
            </div>

              {/*Button to move previous and next pages  PAGENATION */}
                                 {
                                  allProducts?.length > productsPerPage && (
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
  
        </div>
     </div>
      </>
        :

        <div className='my-10 flex justify-center items-center flex-col min-h-50'>
           <img className='w-75' src="https://cdn.pixabay.com/animation/2022/07/31/05/09/05-09-53-216_512.gif" alt="lock" />
           <p className="font-bold text-xl">Please <Link to={'/login'}
            className='text-blue-700 font-bold italic underline'>Login</Link> To Explore more.....!</p>
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

export default Allproducts