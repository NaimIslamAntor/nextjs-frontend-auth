import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { ContextProvider } from '../context/contextProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function MyApp({ Component, pageProps }) {
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
