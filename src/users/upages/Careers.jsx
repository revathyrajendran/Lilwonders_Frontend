import React, { useEffect, useState } from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons/faLocationDot'
import { seeAllJobsApi, userApplyJobApi } from '../../Services/allApis'
import { ToastContainer,toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'





const Careers = () => {
  //navigation hook
  const navigate = useNavigate()
 
  
  //Application Form Status for applying to job
  const[modalstatus,setModalStatus]= useState(false)

  //To get All Jobs from Users
  const[allJobsForUsers,setAllJobsForUsers]=useState([])

  //searchKey for searching jobs by title
  const[searchKey,setSearchKey]=useState("")

  console.log(allJobsForUsers);

  //state to hold application details when user applies
  const[applicationDetails,setApplicationDetails]=useState({
    fullname:"",email:"", qualification:"",phone:"",coverletter:"",resume:""
  })
     //console.log(applicationDetails);

  //state to hold resume file,Date.now() to make it unique
  const[fileKey,setFileKey]=useState(Date.now())
  
  //states to store  Job id and Job title to store details of job we apply
  const[JobTitle,setJobTitle]=useState("")
  const[JobId,setJobId]=useState("")
  

  //useffect to fetch data soon as the page is opened
  useEffect(()=>{
    seeAllJobsForUsers()
  },[searchKey])


   //function to get job details title and id
  const handleApplyJob=(job)=>{
    //get job details and keep it in the state
    setJobId(job._id)
    setJobTitle(job.title)
     //after getting job details , open job application form
    setModalStatus(true)

  }

  //function to submit job application . This function is necessary to identify a particular job
  const handleSubmitApplication=async()=>{
     //Details given by users while applying jobs
     const {fullname,email, qualification,phone,coverletter,resume} = applicationDetails
     //only logged in users can apply for the job , so token is needed
     const token = sessionStorage.getItem("token")
     if(!token){
      toast.info("Please Login To Apply Jobs!!!")
      setTimeout(() => {
        navigate('/login')
      }, 2000);
     }else if(!fullname|| !email|| !qualification|| !phone|| !coverletter|| !resume || !JobTitle || !JobId){
      toast.info("Please fill the form completely!!")
     }else{
      //if we got every required details from application form , then
       const reqHeader={
        "Authorization" : `Bearer ${token}`
      }
      //FormData() because pdf is uploaded by user while applying for jobs.
      const reqBody = new FormData()
      for(let key in applicationDetails){
        reqBody.append(key,applicationDetails[key])
      }
      //JobTitle and JobId comes from state
      reqBody.append("JobTitle",JobTitle)
      reqBody.append("JobId",JobId)
      //API call
      const result = await  userApplyJobApi(reqBody,reqHeader)
      if(result.status == 200){
        toast.success("Application Submitted Successfully!!")
        //reset form values
        handleReset()
        //close application form modal
        setModalStatus(false)
      }else if(result.status == 409){
        //if application was already submitted, conflict!
        toast.warning(result.response.data)
        //reset form values
        handleReset()
      }
      else {
        //500 , internal server error
        toast.error("Something Went Wrong!!!")
        //reset form values
        handleReset()
        //close application form modal
        setModalStatus(false)
      }
     }
  }

  //function to reset form
  const handleReset=()=>{
      setApplicationDetails({
        fullname:"",email:"", qualification:"",phone:"",coverletter:"",resume:""
      })
      //reseting file
      setFileKey(Date.now())
      
  }

  //function to see all jobs 
  const seeAllJobsForUsers=async()=>{
    try{
      const result = await seeAllJobsApi(searchKey)
      if (result.status==200){
        setAllJobsForUsers(result.data)
      }

    }
    catch(err){
      console.log((err));
      
    }
  }
  return (
    <>
    <Header/>
   <div className='bg-indigo-100'>
      <div className='md:px-40 p-5 '>
        <div className=' text-center my-5'>  
        <h1 className="text-3xl font-bold mb-4 ">Careers</h1>
        <p className='text-xl'>Join us and shine in a role where your talent and dedication truly make a difference</p>
        </div>
  
        {/*Current openings and search */}
        <div className="my-5">
            
          <div>
            <h1 className="text-2xl font-bold text-center text-dark">Current Openings</h1>
          </div>
         
           {/*search bar */}
          <div className="flex justify-center items-center my-10">
            <div className="flex my-5">
             <input onChange={e=>setSearchKey(e.target.value)} type="text" className="p-2 rounded text-black border-gray-200 placeholder-gray-600 border w-100 shadow bg-white" placeholder='Job Title' />
             <button className="bg-green-900 text-white p-2">Search</button>
          </div>
  
          </div>
          {/*Jobs to be duplicated */}
          {
            allJobsForUsers?.length>0?
            allJobsForUsers?.map(job=>(
              <div key={job?._id} className="border border-gray-200 p-5 shadow my-5 bg-white">
                 <div className="flex mb-5 ">
                    <div className='w-full' >
                          <h1 className="text-xl">{job?.title}</h1>
                          <hr />
                    </div>
                     <button onClick={()=>handleApplyJob(job)} className="bg-green-900 text-white ms-5 p-2 flex items-center">Apply <FontAwesomeIcon className='ms-1' icon={faArrowUpRightFromSquare} /></button>
                 </div>
                 {/*Job description */}
                 <p className='text-lg my-2'> <FontAwesomeIcon  icon={faLocationDot} />{job?.location}</p>
                 <p className='text-lg my-2'> Job Type: {job?.type}</p>
                 <p className='text-lg my-2'> Salary : {job?.salary}</p>
                 <p className='text-lg my-2'> Qualification : {job?.qualification} </p>
                 <p className='text-lg my-2'> Experience : {job?.texperience}</p>
                <p className='text-lg my-2'> Description :{job?.description} </p>
                  
  
          </div>
            ))
            :
            <p className="text-center text-bold text-lg">No Current Openings!!!!</p>
          }
       
        </div>
  
      </div>
      {/*Modal */}
            {
              modalstatus &&
              <div className='relative z-10 overflow-y-auto' >
                      <div className="bg-gray-500/75 fixed inset-0 ">
                        <div className=" flex justify-center items-center min-h-screen scroll-auto">
                          <div  className=' bg-white rounded-2xl w-150  '>
                            {/*Modal header */}
                            <div className='bg-black text-white flex justify-between items-center p-3 text-xl'>
                              <h3>Application Form</h3>
                              <FontAwesomeIcon onClick={()=>setModalStatus(false)} icon={faXmark}/>
                            </div>
                             {/*Modal body */}
        
                              <div className='relative p-5'>
                                <div className="md:grid grid-cols-2 gap-x-3">
                                  <div className="mb-3">
                                    <input value={applicationDetails.fullname} onChange={e=>setApplicationDetails({...applicationDetails,fullname: e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder=' Full Name' />
                                  </div>
                                
                                  <div className="mb-3">
                                    <input value={applicationDetails.qualification} onChange={e=>setApplicationDetails({...applicationDetails,qualification:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Qualification' />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <input value={applicationDetails.email} onChange={e=>setApplicationDetails({...applicationDetails,email:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Email id' />
                                  </div>
                                  
                                  <div className="mb-3">
                                    <input value={applicationDetails.phone} onChange={e=>setApplicationDetails({...applicationDetails,phone:e.target.value})} type="text" className="border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Phone ' />
                                  </div>
  
                                  <div className="col-span-2">
                                    <textarea value={applicationDetails.coverletter} onChange={e=>setApplicationDetails({...applicationDetails,coverletter:e.target.value})} type="text" className=" mb-5 border placeholder-gray-600 bg-white p-2 rounded w-full text-black" placeholder='Cover Letter ' />
                                  </div>
  
                                   <div className="mb-3 col-span-2 flex flex-col text-gray-500">
                                    <label htmlFor="">Resume</label>
                                    <input key={fileKey} onChange={e=>setApplicationDetails({...applicationDetails,resume:e.target.files[0]})} type="file" className='w-full  border rounded file:bg-gray-400 file:p-2'  />
                                  </div>
                                  
                                </div>
                              </div>
                               {/*Modal footer */}
                                
                                <div className="bg-gray-200 p-3  w-full flex justify-end">
                                  <button onClick={handleReset} className="bg-gray-700 text-white py-2 px-3 mx-3">Reset</button>
  
                                  <button onClick={handleSubmitApplication} className="bg-blue-600 text-white py-2 px-3 mx-3">Submit</button>
                                     
                                </div>
                              
      
                          </div>
      
                        </div>
                      </div>
              </div>
            }
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

export default Careers