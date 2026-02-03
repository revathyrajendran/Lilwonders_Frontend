import React from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { getAllProductsInHomePageApi, getAllReviewsInHomePageApi } from '../../Services/allApis'
import { searchProductContext } from '../../../Context/ContextShare'
import SERVERURL from '../../Services/ServerURL'
import { useContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'


const Home = () => {
  //state to hold products in Home page
  const[homeProducts,setHomeProducts] = useState([])

  //state to hold reviews in Home page
  const[homeReviews,setHomeReviews] = useState([])

  //For Navigation
  const navigate = useNavigate()

  //{searchkey,setSearchKey} and searchBookContext are defined as an object in ContextShare.jsx to search products , same as is used in All Products Page.
  const {searchKey,setSearchKey} = useContext(searchProductContext)

   console.log(homeReviews);
   

  //to load recent 4 books uploaded by users as a side effect 
  useEffect(()=>{
     getHomeProducts()
     getHomeReviews()
  },[])

  //Function for searhing Products
  const homeSearchProduct = async()=>{
    if(!searchKey){
      toast.warning("Please Tell Us About The Product You Wish👀")
    } else if(! sessionStorage.getItem("token")){
      toast.warning("Please Login In To Search Products!")
      setTimeout(()=>{
         //go to login
         navigate('/login')
      },2000)
    }else if(sessionStorage.getItem("token") && searchKey){
      //navigate to all products if there is token and searchkey
      navigate('/all-products')
    }else{
      toast.error("Something Went Wrong!!")
    }
  }

  //Function to display Products in Home page
  const getHomeProducts = async()=>{
    try{
      const result = await getAllProductsInHomePageApi()
      if(result.status == 200){
        setHomeProducts(result.data)
      }

    }catch(err){
      console.log(err);
      
    }
  }

    //Function to display Products in Home page
  const getHomeReviews = async()=>{
    try{
      const result = await getAllReviewsInHomePageApi()
      if(result.status == 200){
        setHomeReviews(result.data)
      }

    }catch(err){
      console.log(err);
      
    }
  }


  return (
    <>
    <Header/>
  <div className='bg-indigo-100'>
        {/*Landing */}
        <div style={{height:'500px'}}  className="  flex flex-col text-white  bg-center text-white justify-center items-center bg-[url(/Elephant.jpeg)] bg-center bg-no-repeat">
         
             <div  style={{height:'500px', backgroundColor:'rgba(0,0,0,0.5'}} className=" p-5 w-full flex flex-col justify-center items-center">
               <h1 className='text-6xl font-bold '>Welcome To LilWonder's </h1>
               <p className='font-bold'>Where every tiny smile deserves something unique and  special❤️✨!</p>
            
                   {/*search Product based on searchKey */}
                 <div className="mt-9">
                    <input type="text" onChange={e=>setSearchKey(e.target.value)} className='bg-white p-3 w-100 rounded-3xl placeholder-gray-500 text-black' placeholder='Search Products' />
                    <FontAwesomeIcon onClick={homeSearchProduct} icon={faMagnifyingGlass} style={{marginLeft:'-40px'}} className='text-gray-500' />
                   </div>
             </div>
       
        </div>
  
  
        {/*Arrival */}
       <section className=' md:px-40 p-5 flex flex-col text-center'>
             <h1 className=" text-2xl  font-bold">NEW ARRIVALS</h1>
             <h1 className=" text-3xl ">Explore Our Latest Unique Collections</h1>
             
             {/*Books  in latest collections */}
             <div className="md:grid grid-cols-4 mt-5 w-full">
                    {/*Products of home page as latest collections based on homeProducts array */}
                 {
                  homeProducts?.length>0?
                    homeProducts?.map((product,index)=>(
                      <div key={index} className="shadow p-3 rounded mx-2">
                    <img width={'100%'} height={'300px'} src={`${SERVERURL}/uploads/${product?.uploadImg[0]}`} alt="Product Image" />
                    <div className="flex flex-col justify-center align-center">
                      {/*product Name*/}
                      <p className="text-blue-700 font-bold text-lg">{product?.name}</p>
                      
                      <p>$ {product?.discountPrice}</p>
                      
              
                    </div>
                  </div>
  
                    ))
                    :
                    <p className="text-center text-blue-900">No Products To Show!!!!!!!!!!!!</p>
                 }
                  
             </div>
  
             {/*Explore more button */}
             <div className="text-center my-8">
              <Link to={'/all-products'} className='p-3 border rounded text-xl font-bold text-white bg-blue-800'> Explore More...</Link>
             </div>
     
       </section>
        
        {/* Author*/}
        <section className='md:grid grid-cols-2 my-5 md:px-40 p-5 gap-10'>
            <div className="text-center mt-5">
              <h1 className='text-lg font-medium text-bold'>About Us</h1>
              <h2 className='text-xl mb-5'>Where every tiny smile deserves something special❤️✨!</h2>
              <p className='text-justify'>We bring you a delightful collection of baby dresses essentials for littles ones aged up to 5 years, whether its for your boy or girl.  </p>
              <br />
              <p className='text-justify'>From every comfort to charming outfits for specil moments , everything here is created with love and care.  </p>
              <br />
              <p className='text-justify'>Enjoy great deals and exclusive discounts on baby products that make parenting a little easier and a lot more joyful.  </p>
             
            </div>
  
            <div className='p-5 flex justify-center items-center'>
              <img  style={{height:'400px', width:'400px'}}   src="https://cdn.shopaccino.com/ajoobaa/products/handmade-crochet-self-design-baby-dress---yellow-100271_l.jpg?v=627" alt="author" />
            </div>
        </section>
        
        
        {/*Reviews*/}
        <section className='md:px-40 p-5 flex flex-col text-center'>
           <h1 className=" text-3xl  font-bold"> Our Customer Reviews....</h1>
            
  
             <div className="my-5 flex flex-col justify-center items-center ">
              
              {
                homeReviews?.length>0?
                   homeReviews?.map((review,index)=>(
                  <div key={index}  className="shadow mb-3 p-2 text-dark ">
                     <h2 className=" font-medium ">{review?.customername}</h2>
                      <div className='flex  '>
                     <p className='  text-xl font-bold'>{review?.rating}</p>
                   <h2 className='ms-3 font-bold text-xl'>{review?.stars}⭐</h2>
                    </div>
                 </div>
                   ))
                   :
                    <p className="text-xl font-bold text-center">No Reviews Yet!</p>
              }
             
              <br />
  
             
  
             </div>
  
        </section>
  </div >
      
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

export default Home