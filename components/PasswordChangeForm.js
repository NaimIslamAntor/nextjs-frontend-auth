import {useState} from 'react'
import axios from 'axios'

import { useAuth } from '../hooks/useAuth'

import { toast } from 'react-toastify'

const PasswordChangeForm = () => {

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const { auth } = useAuth()

    const changePassword = async e => {

        e.preventDefault()

        const creds = {
          oldPassword,
          password,
          confirmPassword
        }
    
        const config = {
            headers: {
               "Authorization": `Bearer ${auth.token}`,
            }
          }
       
    
        try {
          const request = await axios.patch(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/password-change`, creds, config)
          console.log(request)
    
          const {message} = request.data
         
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
          // console.log(error.response)

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
    <form className='w-5/6 m-auto py-2'>
  
            {/* <!-- Old password input --> */}
            <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Type old password"
                onChange={e => setOldPassword(e.target.value)}
                value={oldPassword}
              />
            </div>


              {/* <!--New password input --> */}
              <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Type new password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
  
    {/* <!--Confirm new password input --> */}
    <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Confirm new password"
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
  
  
  
            {/* <!-- Submit button --> */}
            <button
              onClick={changePassword}
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Change Password
            </button>
            </form>
  )
}

export default PasswordChangeForm