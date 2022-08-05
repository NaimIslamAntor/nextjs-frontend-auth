import '../styles/globals.css'
import Navbar from '../components/Navbar'
import { ContextProvider } from '../context/contextProvider'

function MyApp({ Component, pageProps }) {
  return(
    <>
    <ContextProvider>
      <Navbar/>
      <Component {...pageProps} />
    </ContextProvider>
    </>
    )
    
}

export default MyApp
