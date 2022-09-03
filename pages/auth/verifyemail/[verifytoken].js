import { useEffect } from 'react'
import { useLocalAuth, useAuth } from '../../../hooks/useAuth'

import { useRouter } from 'next/router'
import axios from 'axios'

import { toast } from 'react-toastify'


const VerifyToken = () => {


    
  const localAuth = useLocalAuth()
  const { setAuth } = useAuth()

  const router = useRouter()
  const { verifytoken } = router.query


    useEffect(() => {

        if (!localAuth()) {
          return router.push('/')
        }
    
        // console.log('running...')

        if (!localAuth().isVerified) {

          if(verifytoken){
            verifyRequest()
          }
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

            
            toast('You are now a verified user', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              })


                setTimeout(() => {
      
                  router.push('/')
      
                }, 2000);



        } catch (error) {
            // console.log(error.message)

            const { errors } = error.response.data

            errors.forEach(err => {
      
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

      
  return (
    <div>[verifytoken]</div>
  )
}

export default VerifyToken