import React from 'react'
import Session from '../components/Session'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { Link } from 'react-router-dom'
import Air from '/Logo.png'
import World from '../assets/world.svg'
import Search from '../assets/search.png'
import Logo from '../assets/Logo.png'
import Lupa from '../assets/lupa.svg'
import Logout from './Logout'
import Auth from './Auth'

function Barra() {
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
     <div className='h-[184px] posicion w-full'>
        <div className='header gap-[15px] justify-center'>
            <div className='w-[311px] hidden w-102px xl:block 2xl:block'>
            <Link to='/'><img src={Logo}/></Link>
            </div>
            <Link to='/'><img className='hidden w-102px sm:hidden md:block lg:block xl:hidden 2xl:hidden' src={Air}/></Link>
    <div className='my-8'>
        <ol className='flex w-full justify-between gap-12 sm:gap-40 md:gap-20'>
            <li className='flex flex-col md:flex-row items-center cursor-pointer'><img className='w-[47px]' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240'/>Alojamientos</li>
            <li className='flex flex-col md:flex-row items-center cursor-pointer'><img className='w-[47px]' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240'/>Experiencias</li>
            <li className='flex flex-col md:flex-row items-center cursor-pointer'><img className='w-[47px]' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240'/>Servicios</li>
        </ol>
    </div>
    
        <ol className='gap-2.5 hidden md:flex lg:flex xl:flex 2xl:flex items-center'>
            <Link to="/Anfitrion"> <li className='hidden font-bold xl:block text-[14px]'>Conviertete en Anfitrión</li></Link>
            <li><Auth/></li>
        </ol>
        </div>
            <div className='header'>
                <div className='flex justify-center group shadow rounded-full border-2 p-1.5 w-lg md:w-auto'>
                    <div className='flex gap-14 search1 md:hidden lg:hidden xl:hidden 2xl:hidden'>
                        <img className='w-[15px]' src={Lupa} />
                        <input className='input focus:outline-none' type='text' placeholder='Empieza la busqueda'/>
                     </div>
                    <div className='hidden md:flex lg:flex xl:flex 2xl:flex'>
                    <div className='search1'>
                        <p className='textinput'>Dónde</p>
                        <input className='input focus:outline-none' type="text" placeholder='Explora Destinos' />
                     </div>
                     <div className='search1'>
                        <p className='textinput'>Check-in</p>
                        <input className='input focus:outline-none' type="text" placeholder='Agrega Fecha' />
                     </div>
                     <div className='search1'>
                        <p className='textinput'>Check-out</p>
                        <input className='input focus:outline-none' type="text" placeholder='Agrega Fecha' />
                     </div>
                <div className='flex items-center'>
                    <div className='search1'>
                        <p className='textinput'>Quién</p>
                        <input className='input focus:outline-none' type="text" placeholder='¿Cuántos?' />
                    </div>
                    <button className='bg-[#FF385C] w-12 h-12 rounded-full p-4 flex text-white'><img src={Search}/></button>
                </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
} 
return (
    <>
     <div className='h-[184px] posicion w-full'>
        <div className='header gap-[15px]'>
            <div className='w-[311px] hidden w-102px xl:block 2xl:block'>
            <Link to='/'><img src={Logo}/></Link>
            </div>
            <Link to='/'><img className='hidden w-102px sm:hidden md:block lg:block xl:hidden 2xl:hidden' src={Air}/></Link>
    <div className='my-8'>
        <ol className='flex w-full justify-between gap-12 sm:gap-40 md:gap-20'>
            <li className='flex flex-col md:flex-row items-center cursor-pointer'><img className='w-[47px]' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/4aae4ed7-5939-4e76-b100-e69440ebeae4.png?im_w=240'/>Alojamientos</li>
            <li className='flex flex-col md:flex-row items-center cursor-pointer'><img className='w-[47px]' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/e47ab655-027b-4679-b2e6-df1c99a5c33d.png?im_w=240'/>Experiencias</li>
            <li className='flex flex-col md:flex-row items-center cursor-pointer'><img className='w-[47px]' src='https://a0.muscache.com/im/pictures/airbnb-platform-assets/AirbnbPlatformAssets-search-bar-icons/original/3d67e9a9-520a-49ee-b439-7b3a75ea814d.png?im_w=240'/>Servicios</li>
        </ol>
    </div>
    
        <ol className='gap-10 hidden md:flex lg:flex xl:flex  2xl:flex items-center'>
            <Link to="/Anfitrion"> <li className='hidden font-bold xl:block'>Modo Anfitrión</li></Link>
            <li><img className='rounded-full xl:w-[50px] 2xl:w-auto' referrerPolicy='no-referrer' src={user.user_metadata.picture}/></li>
            <li><Logout/></li>
        </ol>
        </div>
            <div className='header'>
                <div className='flex justify-center group shadow rounded-full border-2 p-1.5 w-lg md:w-auto'>
                    <div className='flex gap-14 search1 md:hidden lg:hidden xl:hidden 2xl:hidden'>
                        <img className='w-[15px]' src={Lupa} />
                        <input className='input focus:outline-none' type='text' placeholder='Empieza la busqueda' />
                     </div>
                    <div className='hidden md:flex lg:flex xl:flex 2xl:flex'>
                    <div className='search1'>
                        <p className='textinput'>Dónde</p>
                        <input className='input focus:outline-none' type="text" placeholder='Explora Destinos' />
                     </div>
                     <div className='search1'>
                        <p className='textinput'>Check-in</p>
                        <input className='input focus:outline-none' type="text" placeholder='Agrega Fecha' />
                     </div>
                     <div className='search1'>
                        <p className='textinput'>Check-out</p>
                        <input className='input focus:outline-none' type="text" placeholder='Agrega Fecha' />
                     </div>
                <div className='flex items-center'>
                    <div className='search1'>
                        <p className='textinput'>Quién</p>
                        <input className='input focus:outline-none' type="text" placeholder='¿Cuántos?' />
                    </div>
                    <button className='bg-[#FF385C] w-12 h-12 rounded-full p-4 flex text-white'><img src={Search}/></button>
                </div>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}


export default Barra