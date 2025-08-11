import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import Auth from './Auth'
import Logout from './Logout'

function Session() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // Escucha cambios en autenticación
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])
  if (!user) {
    return (
      <>
     <div className='flex flex-col items-center justify-evenly size-full bg-gradient-to-b'>
          <div className='flex flex-col items-center gap-4 p-6'>
                <Link to="/Anfitrion"> <h1 className='font-bold'>Conviertete en Anfitrión</h1></Link>
            <p>No estás autenticado</p>
            <Auth />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
    <div className='flex items-center mt-2.5 flex-col gap-10'>
        <div className='flex flex-col items-center gap-5'>
        <img className='rounded-full w-[200px]' referrerPolicy='no-referrer' src={user.user_metadata.picture}/>
        <h1 className='font-bold text-2xl'>Hola, {user.user_metadata.full_name}</h1>
        </div>
        <Link to="/Anfitrion"> <h1 className='font-bold'>Modo Anfitrión</h1></Link>
        <Logout />
      </div>
    </>
  )
}
export default Session