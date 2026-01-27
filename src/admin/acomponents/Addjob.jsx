import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import { ToastContainer,toast} from 'react-toastify'



function Addjob() {
  //Modal to add Job by admin, whether modal is open or not
  const[addJobmodalStatus,setAddJobModalStatus]=useState(false)

  //state to hold job details 
  const[newJobDetails,setNewJobDetails]=useState({
    title:"",location:"",type:"",salary:"", qualification:"",experience:"",description:""
  })

   //Reset Button Function
  const handleReset=()=>{
    setNewJobDetails({
      title:"",location:"",type:"",salary:"", qualification:"",experience:"",description:""
    })
  }

  return (
    <div>

<button onClick={()=>setAddJobModalStatus(true)} className="bg-green-900 text-white ms-5 p-2 flex items-center" ><FontAwesomeIcon className='ms-1' icon={faPlus} />Add Jobs</button>

 {/*Modal for adding job by admin*/}
            {
             addJobmodalStatus &&
              <div className='relative z-10 overflow-y-auto' >
                      <div className="bg-gray-500/75 fixed inset-0 ">
                        <div className=" flex justify-center items-center min-h-screen scroll-auto">
                          <div  className=' bg-white rounded-2xl w-150  '>
                            {/*Modal header */}
                            <div className='bg-black text-white flex justify-between items-center p-3 text-xl'>
                              <h3>New Job Opening Form</h3>
                              <FontAwesomeIcon onClick={()=>setModalStatus(false)} icon={faXmark}/>
                            </div>
                             {/*Modal body */}
        
                              <div className='relative p-5'>
                                <div className="mb-3">
                                    <input value={newJobDetails.title} onChange={e=>setNewJobDetails({...newJobDetails,title:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Job Title' />
                                  </div>
                                 
                                  <div className="mb-3">
                                    <input value={newJobDetails.location} onChange={e=>setNewJobDetails({...newJobDetails,location:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Job Location' />
                                  </div>

                                  <div className="mb-3">
                                    <input value={newJobDetails.type} onChange={e=>setNewJobDetails({...newJobDetails,type:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Job Type' />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <input value={newJobDetails.salary} onChange={e=>setNewJobDetails({...newJobDetails,salary:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Salary' />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <input value={newJobDetails.qualification} onChange={e=>setNewJobDetails({...newJobDetails,qualification:e.target.value})}  type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Qualification ' />
                                  </div>
  
                                  <div className="col-span-2">
                                    <textarea value={newJobDetails.experience} onChange={e=>setNewJobDetails({...newJobDetails,experience:e.target.value})} type="text" className=" mb-5 border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Experience' />
                                  </div>

                                  <div className="col-span-2">
                                    <textarea value={newJobDetails.description} onChange={e=>setNewJobDetails({...newJobDetails,description:e.target.value})} type="text" className=" mb-5 border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Job Description' />
                                  </div>
  
  
                                  
                              </div>
                               {/*Modal footer */}
                                
                                <div className="bg-gray-200 p-3  w-full flex justify-end">
                                  <button onClick={handleReset} className="bg-orange-500 text-white py-2 px-3 mx-3">Reset</button>
  
                                  <button className="bg-green-600 text-white py-2 px-3 mx-3">Add</button>
                                     
                                </div>
                              
      
                          </div>
      
                        </div>
                      </div>
                      
    
              </div>
            }

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

    </div>
  )
}

export default Addjob