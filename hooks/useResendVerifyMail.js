
import axios from 'axios'

import { useAuth } from './useAuth'

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
            console.log(request)
        } catch (error) {
            console.log(error)
        }
    }
        
      
  

    return resend

}

export default useResendVerifyMail