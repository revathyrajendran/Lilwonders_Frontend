
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
import { useEffect, useState } from 'react'


function App() {
  //preloadrer
  const[loading,setloading]=useState(true)
  
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
         <Route path='product/:id/view' element={<ViewAProduct/>} />
         <Route path='/profile' element={<Profile/>} />
         <Route path='/careers' element={<Careers/>} />
         <Route path='/contact' element={<Contact/>} />

         <Route path='/admin-dashboard' element={loading?<Preloader/>:<Admindashboard/>}/> 
         <Route path='/admin-career' element={<Careeradmin/>} />
         <Route path='/admin-resource' element={<Resourceadmin/>} />
         <Route path='/admin-setting' element={<Settingadmin/>} />


         <Route path='/*' element={<Pnf/>} />


      </Routes>
    </>
  )
}

export default App
