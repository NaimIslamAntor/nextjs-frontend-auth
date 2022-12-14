import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../hooks/useAuth'


import VerifyNotice from './VerifyNotice'

const Navbar = () => {
    const [profilwMenuShow, setProfileMenuShow] = useState(false)

    const [mobileMenuShowHideState, setMobileMenuShowHideState] = useState(false)

    const { auth, setAuth } = useAuth()

    //for showing and hiding profile menu

    const showHideProfileMenu = () => {
        setProfileMenuShow(!profilwMenuShow)
    }


    //for showing and hiding mobile menu
    const mobileMenuShowHide = () => {
        setMobileMenuShowHideState(!mobileMenuShowHideState)
    }


    const logout = () => {
      localStorage.removeItem('auth')
      setAuth(null)
    }

  return( <>
  {
    auth ?
    !auth.isVerified ? 
     <VerifyNotice/>
    : ''
    
     : ''
  }
  <nav className="bg-gray-800">
  <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
    <div className="relative flex items-center justify-between h-16">
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        {/* <!-- Mobile menu button--> */}
        <button type="button" onClick={mobileMenuShowHide} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          {/* <!--
            Icon when menu is closed.

            Heroicon name: outline/menu

            Menu open: "hidden", Menu closed: "block"
          --> */}
          <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {/* <!--
            Icon when menu is open.

            Heroicon name: outline/x

            Menu open: "block", Menu closed: "hidden"
          --> */}
          <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 flex items-center">

        <Link href="/">
            <a>
            <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"/>
            </a>
        </Link>

        <Link href="/">
            <a>
            <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow"/>
            </a>
        </Link>

        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}

            {
              !auth ? <>
              <Link href="/auth/signup">
            <a className="text-white px-3 py-2 rounded-md text-sm font-medium">
            Signup
            </a>
            </Link>


            <Link href="/auth/login">
            <a className="text-white px-3 py-2 rounded-md text-sm font-medium">
            Login
            </a>
            </Link>
            </>
            :
            <>
            <a className="text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer" onClick={logout}>
            Logout
            </a>
            <Link href='/auth/profile'>
            <a className="text-white px-3 py-2 rounded-md text-sm font-medium">
            {auth.fName} {auth.lName}
            </a>
            </Link>
            </>
            }
           


          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        
        {/* <!-- Profile dropdown --> */}
        {/* <div className="ml-3 relative">
        <div>
            <button type="button" onClick={showHideProfileMenu} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""/>
            </button>
          </div>

          {/* <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          --> */}
          {/* <div className={`${!profilwMenuShow ? 'hidden' : ''} origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1
           bg-white ring-1 ring-black ring-opacity-5`} >
            {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
          </div>
        </div>   */}






      </div>
    </div>
  </div>

  {/* <!-- Mobile menu, show/hide based on menu state. --> */}
  <div className={`${mobileMenuShowHideState ? 'block' : 'hidden'} sm:hidden`} id="mobile-menu">
    <div className="px-2 pt-2 pb-3 space-y-1">
      {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
   
      {
              !auth ? <>
              <Link href="/auth/signup">
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Signup
            </a>
            </Link>


            <Link href="/auth/login">
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            Login
            </a>
            </Link>
            </>
            :
            <>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium cursor-pointer" onClick={logout}>
            Logout
            </a>
            <Link href='/auth/profile'>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
            {auth.fName} {auth.lName}
            </a>
            </Link>
            </>
            }
           

    </div>
  </div>
</nav>
</>)
  
}

export default Navbar