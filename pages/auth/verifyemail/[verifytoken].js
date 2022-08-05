import { useEffect } from 'react'
import { useLocalAuth, useAuth } from '../../../hooks/useAuth'

import { useRouter } from 'next/router'
import axios from 'axios'


const VerifyToken = () => {


    
  const localAuth = useLocalAuth()
  const { auth, setAuth } = useAuth()

  const router = useRouter()
  const { verifytoken } = router.query


    useEffect(() => {

        if (!localAuth()) {
          return router.push('/')
        }
    
        // console.log('running...')

        if (!localAuth().isVerified) {
            verifyRequest()
        }
    
      }, [localAuth])


    async function verifyRequest(){

      const creds = {
        verifyEmail: true
      }

        const config = {
            headers: {
               "Authorization": `Bearer ${localAuth().token}`,
            }
          }

          const preValue = localAuth()
    

        try {
            const request = await axios.put(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/verifyemail/${verifytoken}`, creds, config)

            const data = request.data

            console.log(request)

            const authCreds = {
              fName: preValue.fName,
              lName: preValue.lName,
              email: preValue.email,
              isVerified: data.isVerified,
              token: data.token,
            }

            localStorage.setItem('auth', JSON.stringify(authCreds))
            setAuth(localAuth())

            alert('You are now a verified user')
        } catch (error) {
            console.log(error.message)
        }
    }

      
  return (
    <div>[verifytoken]</div>
  )
}

export default VerifyToken