import useResendVerifyMail from "../hooks/useResendVerifyMail"

const VerifyNotice = () => {

  const sendVerifyMail = useResendVerifyMail()

  return (
    <div className="bg-white border">
    <h1 className="text-xl text-center">Please verify your email 
    <a className="text-blue-500 cursor-pointer" onClick={sendVerifyMail}> Resend verification mail</a> </h1>
    </div>
  )
}

export default VerifyNotice