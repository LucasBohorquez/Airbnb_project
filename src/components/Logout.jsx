import React from 'react'
import { supabase } from '../supabaseClient'

function Logout() {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <button
      className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
      onClick={handleLogout}
    >
      <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
        Cerrar sesión
      </span>
    </button>
  )
}

export default Logout
