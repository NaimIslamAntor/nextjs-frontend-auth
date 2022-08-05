import { useState, useContext } from 'react'
import { context } from '../context/contextProvider'



//for redirection purpose
const useLocalAuth = () => {
    return () => JSON.parse(localStorage.getItem('auth'))
}


const useAuth = () => {
    const auth = useContext(context)
    return auth
}

export { useLocalAuth, useAuth }