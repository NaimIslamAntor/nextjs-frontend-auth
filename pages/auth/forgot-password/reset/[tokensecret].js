import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
// import { context } from '../../context/contextProvider'

import { useLocalAuth } from '../../../../hooks/useAuth'


import { toast } from 'react-toastify'
import Head from 'next/head'



const TokenSecret = () => {

    

  const localAuth = useLocalAuth()

    const [password, setPassword] = useState('')
  
    const [confirmPassword, setConfirmPassword] = useState('')
  
    const router = useRouter()

    const { tokensecret } = router.query
  
  
    useEffect(() => {
  
      if (localAuth()) {
        router.push('/auth/profile')
      }
  
      // console.log('running...')
  
    }, [localAuth])



    const resetPassword = async () => {

       const creds = {
        password,
        confirmPassword,
       }

       try {
        const request = await axios.patch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/forgot-password/reset/${tokensecret}`, creds)
        const { message } = request.data

        toast(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })

          setTimeout(() => {

            router.push('/auth/login')

          }, 2000);
        
       } catch (error) {
        // console.log(error)

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
    <div>
          <div className="w-5/6 mx-auto py-12">

              {/* <!-- password input --> */}

      <Head>
      <title>Reset password || Reset your password</title>
     </Head>

              <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter a new  password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>


              {/* <!-- password input --> */}

              <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Confirm Password"
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>

            <button onClick={resetPassword} className="btn-primary">Reset Password</button>


   </div>
    </div>
  )
}

export default TokenSecret