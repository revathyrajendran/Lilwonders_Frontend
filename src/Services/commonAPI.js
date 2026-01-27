import axios from "axios"

const commonApi= async(httpRequest,url,reqBody,reqHeader)=>{//reqHeader because files are to  be uploaded from my system
               
    //request configuration 
    const requestConfigure={  // is an object with axios keys
           method:httpRequest,
           url,//axios key is same as value we pass
           data:reqBody,
           headers:reqHeader?reqHeader:{}//if there is reqHeader, then it is present as an object


    }
    //creating axios instance
    //since this function returns a response , it must be awaited and then returned the output
      return await axios(requestConfigure).then(res=>{
        return res
      }).catch(err=>{
        return err
      })
           
            
}
export default commonApi