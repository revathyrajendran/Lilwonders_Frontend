import React from 'react'
import Footer from '../../Components/Footer'
import Adminheader from '../../admin/acomponents/Adminheader'
import Adminsidebar from '../acomponents/Adminsidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook,faUsers } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-regular-svg-icons'
//Graph import from recharts
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer ,Pie, PieChart} from 'recharts';



const Admindashboard = () => {
  //data of bar graph
  const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
  },
];
//data of pie chart
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];
const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9300 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];
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
  
                 <div className="md:grid grid-cols-2 my-10 p-5">
                  <div className='my-10 md:my-0 '>
                    {/*Bar graph */}
                <ResponsiveContainer width="100%" height="100%">
                     <BarChart  responsive data={data}>
                       <CartesianGrid strokeDasharray="3 3" />
                         <XAxis dataKey="name" />
                          <YAxis  />
                          <Tooltip />
                          <Legend />
                       <Bar dataKey="pv" fill="#8884d8"  />
                      <Bar dataKey="uv" fill="#82ca9d"  />
                       
                    </BarChart>
               </ResponsiveContainer>
                  </div>
                  <div className='my-5 md:my-0 w-100 h-80'>

                     {/*Pie graph */}
          <ResponsiveContainer width="100%" height="100%">
             <PieChart>
                <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius="50%" fill="#8884d8" />
               <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius="60%" outerRadius="80%" fill="#82ca9d" />
     
            </PieChart>
          </ResponsiveContainer>
                  </div>
  
                 </div>
              </div>
            </div>
          </div>
        <Footer/>
        </>
  )
}

export default Admindashboard