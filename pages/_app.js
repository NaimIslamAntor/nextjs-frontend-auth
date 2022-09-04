import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { ContextProvider } from '../context/contextProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'



function MyApp({ Component, pageProps }) {


  const router = useRouter()

  
  useEffect(() => {
    const handleStart = (url) => {
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])


  return(
    <>
    <ContextProvider>
         {/* toast container */}
 <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/> 

      <Navbar/>
      <Component {...pageProps} />
    </ContextProvider>
    </>
    )
    
}

export default MyApp
