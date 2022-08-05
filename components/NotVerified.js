import useResendVerifyMail from "../hooks/useResendVerifyMail"

const NotVerified = () => {
    
    const sendVerifyMail = useResendVerifyMail()

  return (
    <div className="py-20 grif place-items-center">
              <div className="">
                 <h1 className="text-center text-3xl">
                  You are one step ahead from being a verified user
                 </h1>
                 <p className="text-2xl text-center">
                  Please check your email address or <a  className="text-blue-500 cursor-pointer" 
                  onClick={sendVerifyMail}>Click here</a> if you didnot get an email
                 </p>
              </div>
    </div>
  )
}

export default NotVerified