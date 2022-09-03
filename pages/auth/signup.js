import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
// import { context } from '../../context/contextProvider'

import { useLocalAuth, useAuth } from '../../hooks/useAuth'


import { toast } from 'react-toastify'


const Signup = () => {


  const [fName, setFname] = useState('')
  const [lName, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  // const { auth, setAuth } = useContext(context)

  const localAuth = useLocalAuth()
  const { auth, setAuth } = useAuth()

  const router = useRouter()


  useEffect(() => {

    if (localAuth()) {
      router.push('/auth/email/verify')
    }

    // console.log('running...')

  }, [localAuth])


  //submit register
  const submitRegister = async e => {
    e.preventDefault()

    const creds = {
      fName,
      lName,
      email,
      password,
      confirmPassword,
    }

    // console.log(process.env.NEXT_PUBLIC_API_ORIGIN)

    try {
      const request = await axios.post(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/register`, creds)
      console.log(request)

      const {data} = request
      localStorage.setItem('auth', JSON.stringify(data))
      setAuth(data)

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


  const redirectForgotPage = e => {
    e.preventDefault()

    router.push('/auth/forgot-password')
  }


  return <div className="min-h-screen flex items-center justify-center flex-col lg:flex-row bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
 

 <img  style={{border:"20px", margin:"50px",float:"left", width:"500px",height: "500px"}} 
 className="object-cover" src="https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=htmlFormat&fit=crop&w=1327&q=80"/>
  <hr/>

 <div className="max-w-md w-full space-y-8">
     
   <div>
     <p className="mt-2 text-center text-sm text-gray-600">
       Create new account
     </p>
   </div>


   <form className="mt-8 space-y-6" action="#" method="POST">
   
     <div className="rounded-md shadow-sm -space-y-px">

     <div>
         <label htmlFor="fname" className="sr-only">First name</label>
         <input id="fname" type="text"
          autoComplete="email" required className="appearance-none 
          rounded-none relative block w-full px-3 py-2 border
           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
            placeholder="First name" onChange={e => setFname(e.target.value)} value={fName} />
       </div>


       <div>
         <label htmlFor="lname" className="sr-only">Last name</label>
         <input id="lname" type="text"
          autoComplete="email" required className="appearance-none 
          rounded-none relative block w-full px-3 py-2 border
           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Last name"
             onChange={e => setLname(e.target.value)} value={lName}  />
       </div>



       <div>
         <label htmlFor="email-address" className="sr-only">Email address</label>
         <input id="email-address" type="email"
          autoComplete="email" required className="appearance-none 
          rounded-none relative block w-full px-3 py-2 border
           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Email address"
            onChange={e => setEmail(e.target.value)} value={email}  />
       </div>

       <div>
         <label htmlFor="password" className="sr-only">Password</label>
         <input id="password" type="password" autoComplete="current-password"
          required className="appearance-none rounded-none relative block w-full px-3 py-2 border 
          border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
          focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Password"  
          onChange={e => setPassword(e.target.value)} value={password} 
          />
       </div>

       <div>
         <label htmlFor="confirm-password" className="sr-only">Confirm password</label>
         <input id="confirm-password" type="password"
          autoComplete="email" required className="appearance-none 
          rounded-none relative block w-full px-3 py-2 border
           border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm password"
            onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}  />
       </div>


     </div>

    
     

     <div>
       <button onClick={submitRegister} id="signin" type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-lightblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-50" aria-required="true">
         <span className="absolute left-0 inset-y-0 flex items-center pl-3">
           {/* <!-- Heroicon name: lock-closed --> */}
           <svg className="h-5 w-5 text-blue-50 group-hover:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
           </svg>
         </span>
         Signup
       </button>
     </div>
     <h1 className="text-center text-xl">Forgot password <button onClick={redirectForgotPage} className="btn-primary">Click here</button></h1>
   </form>
 </div>
</div>
  
}

export default Signup