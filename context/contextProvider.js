import React, { useState,useEffect } from 'react'

let authInfo = null


export const context = React.createContext(authInfo);

export const ContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(authInfo)


    useEffect(() => {

        setAuth(JSON.parse(localStorage.getItem('auth')))

      },[])

   return(
    <context.Provider value={{auth, setAuth}}>
    {children}
    </context.Provider>
   )
}