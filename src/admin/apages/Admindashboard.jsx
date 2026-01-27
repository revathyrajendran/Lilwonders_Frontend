import React from 'react'
import Footer from '../../Components/Footer'
import Adminheader from '../../admin/acomponents/Adminheader'
import Adminsidebar from '../acomponents/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faUsers } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'



const Admindashboard = () => {
  return (
    <>
        <Adminheader/>
          <div className='bg-indigo-200'>
            <div className="md:grid grid-cols-5 gap-2 ">
              <div className="col-span-1">
                <Adminsidebar/>
              </div>
      
              <div className="col-span-4 p-10">
                 <div className="md:grid grid-cols-3">
                    <div className="md:px-5 my-5 md:my-0">
                      <div className="bg-blue-900 items-center text-5xl text-white p-4 flex rounded">
                              <FontAwesomeIcon  icon={faBook}/>
                        <div className='text-center ms-10 md:ms-0'>
                        <h3 className="text-xl"> Total Number Of Products</h3>
                        <h3 className="text-2xl"> 100+</h3>
  
                        </div>
                          
                      </div>
                      
                      
                    </div>
  
                    <div className="md:px-5  my-5 md:my-0">
                      <div className="bg-green-700 items-center text-5xl text-white p-4 flex rounded">
                              <FontAwesomeIcon  icon={faUsers}/>
                        <div className='text-center ms-10 md:ms-0'>
                        <h3 className="text-xl"> Total Number Of Employees</h3>
                        <h3 className="text-2xl"> 100+</h3>
  
                        </div>
                          
                      </div>
                      
                      
                    </div>
  
                    <div className="md:px-5  my-5 md:my-0">
                      <div className="bg-yellow-500 items-center text-5xl text-white p-4 flex rounded">
                              <FontAwesomeIcon  icon={faUser}/>
                        <div className='text-center ms-10 md:ms-0'>
                        <h3 className="text-xl"> Total Number Of Users</h3>
                        <h3 className="text-2xl"> 100+</h3>
  
                        </div>
                          
                      </div>
                      
                      
                    </div>
  
                 </div>
  
                 <div className="md:grid grid-cols-2 my-10">
                  <div>Bar Chart</div>
                  <div>Pie Chart</div>
  
                 </div>
              </div>
            </div>
          </div>
        <Footer/>
        </>
  )
}

export default Admindashboard