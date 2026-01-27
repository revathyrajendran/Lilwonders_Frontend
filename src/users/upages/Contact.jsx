import React from 'react'
import Header from '../ucomponents/Header'
import Footer from '../../Components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faPaperPlane } from '@fortawesome/free-regular-svg-icons'




const Contact = () => {
  return (
    <>
    <Header/>
    <div className="md:px-40 p-5 bg-indigo-100">
    <div className=' text-center my-5'>  
      <h1 className="text-3xl font-bold mb-4">Contacts</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae veniam iste, vero magni cumque, dolor illo labore, expedita at asperiores ut! Velit odio dolores totam eius alias nostrum, hic ab. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor blanditiis voluptatibus atque non impedit commodi veritatis porro eligendi placeat culpa vitae eos accusamus ea, deserunt repudiandae corporis beatae, veniam nesciunt.</p>
      </div>
      {/* Location, phone */}
      <div className=" md:flex justify-evenly items-center my-10 ">
           <div className="flex items-center w-75 md:mt-0 mt-5">
            <div style={{width:'50px', height:'50px', borderRadius:'50%'}} className="bg-gray-200 flex justify-evenly items-center me-5">
                       <FontAwesomeIcon icon={faLocationDot}/>
          
            </div>
            <p>123 Main Street,Apt 4B,Anytown,CA 91234</p>
           </div>

            <div className="flex items-center w-75 md:mt-0 mt-5">
            <div style={{width:'50px', height:'50px', borderRadius:'50%'}} className="bg-gray-200 flex justify-evenly items-center me-5">
                       <FontAwesomeIcon icon={faPhone}/>
          
            </div>
            <p>+91 9457034556</p>
           </div>

            <div className="flex items-center w-75 md:mt-0 mt-5">
            <div style={{width:'50px', height:'50px', borderRadius:'50%'}} className="bg-gray-200 flex justify-evenly items-center me-5">
                       <FontAwesomeIcon icon={faEnvelope}/>
          
            </div>
            <p>lilwonder122@gmail.com</p>
           </div>
      
      </div>
      {/*Message bar */}
      <div className="grid grid-cols-2 gap-10 md:px-30">
        <div className="bg-gray-300 p-5 flex-col">
               <h1 className="text-center text-black font-bold">Send me Message</h1>
               <div className="my-2">
                <input placeholder='Name' type="text" className=" rounded w-full placeholder-gray-500 p-2 bg-white text-gray-500" />
               </div>
                <div className="my-2">
                <input placeholder='Email id' type="email" className=" rounded w-full placeholder-gray-500 p-2 bg-white text-gray-500" />
               </div>
               <div className="my-2">
                <textarea placeholder='Message' type="email" className=" rounded w-full placeholder-gray-500 p-2 bg-white text-gray-500" rows={'6'} />
               </div>
               <div>
                <button className="bg-black text-white p-2 my-2 text-center w-full">Send <FontAwesomeIcon className='ms-1' icon={faPaperPlane}/></button>
               </div>
        </div>
        {/*Map */}
        <div className='w-full'>
          <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62944.10386915149!2d76.47939238066833!3d9.59470799882809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02f68f8dd06e!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1762185647088!5m2!1sen!2sin" style={{border:"0", width:'100%', height:'400px' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

    </div>
    <Footer/>

    
    
    </>
  )
}

export default Contact