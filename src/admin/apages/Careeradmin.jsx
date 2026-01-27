import React, { useState } from 'react'
import Footer from '../../Components/Footer'
import Adminheader from '../../admin/acomponents/Adminheader'
import Adminsidebar from '../acomponents/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { Link } from 'react-router-dom'
import Addjob from '../acomponents/Addjob'
import { deleteAJobApi, seeAllJobsApi } from '../../Services/allApis'
import { useEffect } from 'react'


const Careeradmin = () => {
  //job list
  const[jobListStatus,setJobListStatus]=useState(true)
  //application : admin to see applications submitted by users
  const[listApplicationStatus,setListApplicationStatus]=useState(false)
  //state to store all the jobs
  const[allJobs,setAllJobs]=useState([])
  //to store searchKey
  const[searchKey,setSearchKey]=useState("")
  //whenever admin deletes a job, the rest of the jobs must be seen, so useeffect must render again for that the below state
  const[deleteAJobResponse,setDeleteAJobresponse]=useState({})

  //useeffect to see all jobs based on search also
  useEffect(()=>{
    if(jobListStatus==true){
      getAllJobsForAdmin()
    }
  },[searchKey,deleteAJobResponse])

  console.log(allJobs);
  


  //function to see all jobs applied by admin for admin
  const getAllJobsForAdmin = async()=>{
    try{
      const result = await seeAllJobsApi(searchKey)
      if(result.status==200){
        setAllJobs(result.data)
      }


    }catch(err){
      console.log(err);
      
    }
  }

  //function to delete a job by admin
  const removeAJobByAdmin = async(id)=>{
    //token is needeed beacuse only authorized admin can delete.
    const token = sessionStorage.getItem("token")
    const reqHeader={
      "Authorization":`Bearer ${token}`
    }
    try{
      const result = await deleteAJobApi(id,reqHeader) 
      if(result.status==200){
          setDeleteAJobresponse(result.data)
        }else{
          console.log(result);
          
        }


    }catch(err){
      console.log(err);
      
    }
  }

  return (
   <>
        <Adminheader/>
         <div className='bg-indigo-200'>
            <div className="md:grid grid-cols-5 gap-2 ">
                        <div className="col-span-1">
                          <Adminsidebar/>
                        </div>
                
                        <div className="col-span-4">
                           <div className="p-10">
                               <h1 className="text-center text-3xl font-bold">
                                 Careers
                               </h1> 
                               {/*two tabs */}
                                <div className="flex justify-center items-center my-5 font-medium text-lg ">
                                  <p onClick={()=>{setJobListStatus(true); setListApplicationStatus(false); }} className={jobListStatus ? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'} > Job Post</p>
                                  <p onClick={()=>{setListApplicationStatus(true); setJobListStatus(false)}} className={listApplicationStatus ? 'text-blue-500 p-4 border-1 border-gray-200 border-t border-1 border-r rounded cursor-pointer':'p-4 border-b border-gray-400 cursor-pointer'}> Applications</p>
                                  
                                 </div>
                    {/*Contents */}
                      {/*Job post  also duplication*/}
            
                        {          
                          jobListStatus &&
                      <div>
                       {/* search and apply button */}
                        <div className="flex my-5 justify-between items-center my-10">
            {/* search button */}
                    <div>
                      <input onChange={e=>setSearchKey(e.target.value)} type="text" className="p-2 rounded text-black border-gray-200 placeholder-gray-600 border w-100 shadow bg-white" placeholder='Search By Job Title' />
                      <button className="bg-blue-900 text-white p-2">Search</button>
                    </div>
            {/* Add  component as self closing tag */}
                    <Addjob/>
  
                         </div>
                         {/* job to be duplicated  based on allJobs array*/}
                         {
                          allJobs?.length>0?
                          allJobs?.map(job=>(
                             <div key={job?._id} className="border bg-white border-gray-200 p-5 shadow my-5">
                 <div className="flex mb-5 ">
                    <div className='w-full' >
                          <h1 className="text-xl font-bold">{job?.title}</h1>
                          <hr />
                    </div>
                     <button onClick={()=>removeAJobByAdmin(job?._id)} className="bg-red-700 text-white ms-5 p-2 flex items-center">Delete <FontAwesomeIcon className='ms-1' icon={faTrash} /></button>
                 </div>
                 {/*Job description */}
                 <p className='text-lg text-blue-700 my-2'> <FontAwesomeIcon  icon={faLocationDot} />{job?.location}</p>
                 <p className='text-lg my-2'> Job Type: {job?.type}</p>
                 <p className='text-lg my-2'> Salary : {job?.salary}</p>
                 <p className='text-lg my-2'> Qualification : {job?.qualification} </p>
                 <p className='text-lg my-2'> Experience : {job?.experience}</p>
                <p className='text-lg my-2'> Description : {job?.description} </p>
                  
  
                         </div>
                          ))
                          :
                          <p className="text-center text-bold text-black-500">No Current Openings!!!</p>
                         }
                        
             
                      </div> 
            
                        }   
                        {/*Applications */}
                     
                     {          
                          listApplicationStatus &&
                         <div className='p-10 overflow-x-hidden '>
                              {/*Applications table */}
                          <table className="my-5 shadow w-full bg-white">
                                <thead>
                                  <tr>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">SL No</th>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">Job Title</th>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">Name</th>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">Qualification</th>
                                      <th className= " p-3 text-white bg-blue-800 text-center border border-gray-600">Email id</th>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">Phone</th>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">Cover Letter</th>
                                      <th className=" p-3 text-white bg-blue-800 text-center border border-gray-600">Resume</th>
                                  </tr>
                                </thead>
  
                                <tbody>
                                  <tr>
                                    <td className="border border-gray-500 p-3 text-center">1</td>
                                    <td className="border border-gray-500 p-3 text-center">Front End Developer</td>
                                    <td className="border border-gray-500 p-3 text-center">Max Miller</td>
                                    <td className="border border-gray-500 p-3 text-center">BCA</td>
                                    <td className="border border-gray-500 p-3 text-center">max@gmail.com</td>
                                    <td className="border border-gray-500 p-3 text-center">9034567890</td>
                                    <td className="border border-gray-500 p-3 text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae delectus voluptates nihil sapiente, sed facere officia ea molestiae. Tempore voluptates voluptatem ut velit laborum perspiciatis eaque, neque expedita odit possimus!</td>
                                    <td className="border border-gray-500 p-3 text-center">
                                      <Link className='text-blue-600 underline'> resume</Link>
                                    </td>
                                    
                                  </tr>
                                </tbody>
                          </table>
  
                         </div>
                        }
            
                           </div>
                        </div>
                      </div>
         </div>
        <Footer/>
        </>
  )
}

export default Careeradmin