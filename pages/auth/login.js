import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLocalAuth, useAuth } from '../../hooks/useAuth'
import axios from 'axios'


import { toast } from 'react-toastify'
import Head from 'next/head'

const Login = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const localAuth = useLocalAuth()
  const { setAuth } = useAuth()

  const router = useRouter()


  useEffect(() => {

    if (localAuth()) {
      router.push('/')
    }

    // console.log('running...')

  }, [localAuth])


  const submitLogin = async e => {
    e.preventDefault()

    const creds = {
      email,
      password,
    }

   

    try {
      const request = await axios.post(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/login`, creds)
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


  return(
    <section className="h-screen">

<Head>
      <title>Login || Stay logged in</title>
</Head>

    <div className="container px-6 py-12 h-full">
      <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="w-full"
            alt="Phone image"
          />
        </div>
        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
          <form>
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
  
            {/* <!-- Password input --> */}
            <div className="mb-6">
              <input
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
  
  
            {/* <!-- Submit button --> */}
            <button
              onClick={submitLogin}
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Sign in
            </button>
  
           
          </form>
        </div>
      </div>
    </div>
  </section>
  )
  
}

export default Login