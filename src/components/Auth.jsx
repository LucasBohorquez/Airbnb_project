import React from 'react'
import { supabase } from '../supabaseClient'

function Auth () {
    
 const handleGoogleLogin = async () =>{ supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
        redirectTo: window.location.origin + window.location.pathname + window.location.search
    }
})}
return(
    <>
        <button className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' onClick={handleGoogleLogin}>
            <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'> Iniciar sesión con Google</span>
        </button>
    </>
)
}

export default Auth