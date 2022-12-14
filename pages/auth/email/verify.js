import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLocalAuth, useAuth } from '../../../hooks/useAuth'

import NotVerified from '../../../components/NotVerified'
import Verified from '../../../components/Verified'


import { Toast } from 'react-toastify'

import Head from 'next/head'


const Verify = () => {

  const localAuth = useLocalAuth()
  const { auth } = useAuth()

  const router = useRouter()



  useEffect(() => {

    if (!localAuth()) {
      router.push('/')
    }

    console.log('running...')

  }, [localAuth])



  return (
    <>
     <Head>
      <title>Verify || Please verify your email</title>
     </Head>
    {
      auth ? auth.isVerified ? <Verified/> : <NotVerified/> : ''
    }
    </>
  )
}

export default Verify