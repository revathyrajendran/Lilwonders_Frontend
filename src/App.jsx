
import { Route, Routes } from 'react-router-dom'
import Home from './users/upages/Home'
import Preloader from './Components/Preloader'
import Auth from './Pages/Auth'
import Allproducts from './users/upages/Allproducts'
import ViewAProduct from './users/upages/ViewAProduct'
import Profile from './users/upages/Profile'
import Careers from './users/upages/Careers'
import Contact from './users/upages/Contact'
import Admindashboard from './admin/apages/Admindashboard'
import Careeradmin from './admin/apages/Careeradmin'
import Resourceadmin from './admin/apages/Resourceadmin'
import Settingadmin from './admin/apages/Settingadmin'


import Pnf from './Pages/Pnf'
import './App.css'
import { useContext, useEffect, useState } from 'react'
import { userAuthContext } from '../Context/AuthContext'
import PaymentSuccess from './users/upages/PaymentSuccess'
import PaymentError from './users/upages/PaymentError'

import ReturnedOrder from './users/upages/ReturnedOrder'
import Orderadmin from './admin/apages/Orderadmin'




function App() {
  //preloadrer
  const[loading,setloading]=useState(true)
   //role and authorized state
  const{role,authorizedUser,setAuthorizedUser}=useContext(userAuthContext)
  
 useEffect(()=>{
   setTimeout(() => {
     setloading(false)
  },4000);
 })
 

  return (
    <>
      <Routes>

        <Route path='/' element={loading?<Preloader/>:<Home/>}/> 
        <Route path='/login' element={<Auth/>}/> 
        <Route path='/register' element={<Auth register/>} />
        <Route path='/all-products' element={<Allproducts/>} />
         <Route path='/careers' element={<Careers/>} />
         <Route path='/contact' element={<Contact/>} />
                       {/*Users conditional rendering based on if role is user,react fragments are to avoid error*/}
          
          { role == "user" &&
         <>
            <Route path='product/:id/view' element={<ViewAProduct/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/payment-success' element={<PaymentSuccess/>} />
            <Route path='/payment-error' element={<PaymentError/>} />
             
              <Route path='/return-order' element={<ReturnedOrder/>} />
         </>
                      
          }
                        {/*Admin conditional rendering based on if role is admin , react fragments are to avoid error*/}
        {  role == "admin" &&
          <>
            <Route path='/admin-dashboard' element={loading?<Preloader/>:<Admindashboard/>}/> 
           <Route path='/admin-career' element={<Careeradmin/>} />
           <Route path='/admin-resource' element={<Resourceadmin/>} />
            <Route path='/admin-orders' element={<Orderadmin/>} />
           <Route path='/admin-setting' element={<Settingadmin/>} />
          </>
         }


         <Route path='/*' element={<Pnf/>} />


      </Routes>
    </>
  )
}

export default App
