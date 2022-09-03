import { useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useLocalAuth, useAuth } from '../../../../hooks/useAuth'


const userToken = ({ user }) => {

  console.log(user)

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
    <div>

    </div>
  )
}

export default userToken



export async function getServerSideProps(context) {

  const { id, userToken } = context.params
 

  const config = {
    headers: {
       "Authorization": `Bearer ${userToken}`,
    }
  }
 
  try {

      const request = await axios.get(`${process.env.NEXT_PUBLIC_API_ORIGIN}/api/auth/profile/${id}`, config)
      const user = request.data


      return {
        props: {user}, // will be passed to the page component as props
      }

  } catch (error) {

      if (error) {

      return {
        notFound: true,
      }
}

  }


 
}