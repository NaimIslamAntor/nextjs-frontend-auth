import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
// import { context } from '../../context/contextProvider'

import { useLocalAuth } from '../../../hooks/useAuth'


import { toast } from 'react-toastify'



const ForgotPassword = () => {

  const localAuth = useLocalAuth()
//   const { auth, setAuth } = useAuth()


  const [email, setEmail] = useState('')

  const [userInfo, setUserInfo] = useState(null)

  const router = useRouter()


  useEffect(() => {

    if (localAuth()) {
      router.push('/auth/profile')
    }

    // console.log('running...')

  }, [localAuth])



  const searchUser = async () => {
    try {

        const request = await axios.get(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/forgot-password/search?email=${email}`)
        console.log(request.data)

        setUserInfo(request.data)

        toast('User found!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          })

    } catch (error) {
        setUserInfo(null)

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



  const sendForgotEmailVerify = async () => {

    const creds = {
        email: userInfo?.email
    }

    try {
        const request = await axios.post(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/forgot-password/sendforgot/verify`, creds)
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

        
    } catch (error) {
        console.log(error)

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


  return (
    <div>
          <div className="w-5/6 mx-auto py-12">
              {/* <!-- Email input --> */}
              <div className="mb-6">
              <input
                type="email"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Email address"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <button onClick={searchUser} className="btn-primary">Search</button>


           {
            userInfo && <div className="py-4">
            <h1 className="text-xl">Is this yours account? then <button 
            disabled={userInfo?.fName && userInfo?.lName && userInfo?.email ? false : true}
            onClick={sendForgotEmailVerify}
             className="btn-primary">Click here </button> 

            to get a verification email</h1>
                <h1>Name: {userInfo?.fName || 'oops '} {userInfo?.lName || 'Somethings wrong'}</h1>
                <h1>Email: {userInfo?.email || 'Somethings wrong'}</h1>
            </div>
           } 



          </div>
    
    </div>
  )
}

export default ForgotPassword