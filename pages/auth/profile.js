import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { useLocalAuth, useAuth } from '../../hooks/useAuth'

import PasswordChangeForm from '../../components/PasswordChangeForm'



const Profile = () => {



  const localAuth = useLocalAuth()
  const { auth } = useAuth()

  const router = useRouter()
   
  const [showPasswordForm, setShowPasswordForm] = useState(false)



  useEffect(() => {

    if (!localAuth()) {
      router.push('/')
    }

    console.log('running...')

  }, [localAuth])



  const showForm = () => {
 setShowPasswordForm(!showPasswordForm)
  }



  return (
    <div className="mt-20">
    {
      auth ? <div className=''>
         <h1 className="text-center text-2xl">{auth.fName} {auth.lName}</h1>

       <center>
       <button className="btn-primary mt-4" onClick={showForm}>Password change</button>
       </center>
         { showPasswordForm && <PasswordChangeForm/> }
      </div>
      :
      <h1 className="text-center text-red-500 text-2xl">You are not authenticated</h1>
    }
     
    </div>
  )
}

export default Profile

