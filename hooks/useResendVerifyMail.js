
import axios from 'axios'

import { useAuth } from './useAuth'


import { toast } from 'react-toastify'




const useResendVerifyMail = () => {

    const { auth } = useAuth()

      const resend = async () => {

        const creds = {
            sendMail: true
        }

        const config = {
            headers: {
               "Authorization": `Bearer ${auth.token}`,
            }
          }
    
        try {
            const request = await axios.post(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/resendverificationemail`, creds, config)
            const  { message } = request.data

            toast(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })


        } catch (error) {
            // console.log(error)

        const { status, data } = error.response

        if (status === 429) {
          
            toast.warn('You have to wait 5 mins to get a new email', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
  
              return
    
          }
  
          data.errors.forEach(err => {
    
            toast.warn(err, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })
    
            })
  

        }
    }
        
      
  

    return resend

}

export default useResendVerifyMail