import React from 'react'
import { useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowR from '../assets/arrowR.svg'
import ArrowL from '../assets/arrowL.svg'
import Session from './Session'

function Lista() {
    const scrollRef = useRef();
     const scrollRef2 = useRef();
     const scrollRef3 = useRef();
     const navigate = useNavigate();

    const verDetalle = (apt) => {
        navigate('/Apartamento', { state: { apt } });
      // mandamos el apartamento como prop usando state
  };
  const [apartamentos, setApartamentos] = useState([]);

  useEffect(() => {
    fetch('https://jjotfinmkxhwndhwzjwk.supabase.co/rest/v1/Apartamentos', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqb3RmaW5ta3hod25kaHd6andrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MzE4MjgsImV4cCI6MjA2ODAwNzgyOH0.NjVFOMm4-bN_aFwnSwdwoxnZrASmf7hSiYenfwesvTw',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impqb3RmaW5ta3hod25kaHd6andrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MzE4MjgsImV4cCI6MjA2ODAwNzgyOH0.NjVFOMm4-bN_aFwnSwdwoxnZrASmf7hSiYenfwesvTw',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta');
        return res.json();
      })
      .then(data => {
        setApartamentos(data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <div className='mt-64 flex flex-col gap-16 w-full'>
    <div>
    <div className='flex justify-between mx-16'>
        <div className='flex cursor-pointer'>
        <h1 className='font-bold text-2xl sm:hidden'>Barranquilla</h1>
        <h1 className='font-bold text-2xl hidden sm:block'>Alojamientos Populares en Barranquilla</h1>
        <img className='w-[34px] h-[42px]' src={ArrowR}/></div>
        <div className='hidden md:block lg:block xl:block 2xl:block'>
            <button onClick={() => scrollRef.current.scrollLeft -= 200}><img className='w-[19px] h-[28px]' src={ArrowL}/></button>
            <button onClick={() => scrollRef.current.scrollLeft += 200}><img className='w-[19px] h-[28px]' src={ArrowR}/></button>
            </div>
        </div> 
    <div className=' flex flex-col px-[25px] w-full'>
        <div ref={scrollRef} className='flex gap-2.5 overflow-x-scroll scrollbar-hide w-auto pl-2.5'>
            {apartamentos.map(apt => ( apt.Lugar == 'Barranquilla' &&
        <div onClick={() => verDetalle(apt)} key={apt.id} className="p-2 mb-4 flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" >
        <img src={JSON.parse(apt.Fotos)[0]} alt='' className="my-2 w-full h-40 object-cover" />
          <h2 className='text-sm font-bold'>{apt.Nombre}</h2>
          <p className='text-gray-500 text-xs'>Precio: ${apt.Precio} / Noche</p>
        </div>
      ))}
      </div>
    </div> 
        </div>
        <div>
    <div className='flex justify-between mx-16'>
        <div className='flex cursor-pointer'>
          <h1 className='font-bold text-2xl sm:hidden'>Cartagena</h1>
          <h1 className='font-bold text-2xl hidden sm:block'>Alojamientos Populares en Cartagena</h1>
          <img className='w-[34px] h-[42px]' src={ArrowR}/></div>
        <div className='hidden md:block lg:block xl:block 2xl:block'>
            <button onClick={() => scrollRef2.current.scrollLeft -= 200}><img className='w-[19px] h-[28px]' src={ArrowL}/></button>
            <button onClick={() => scrollRef2.current.scrollLeft += 200}><img className='w-[19px] h-[28px]' src={ArrowR}/></button>
            </div>
        </div> 
    <div className=' flex flex-col px-[25px] w-full'>
        <div ref={scrollRef2} className='flex gap-2.5 overflow-x-scroll scrollbar-hide w-auto pl-2.5'>
            {apartamentos.map(apt => ( apt.Lugar == 'Cartagena' &&
        <div onClick={() => verDetalle(apt)} key={apt.id} className="p-2 mb-4 flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" >
        <img src={JSON.parse(apt.Fotos)[0]} alt='' className="my-2 w-full h-40 object-cover" />
          <h2 className='text-sm font-bold'>{apt.Nombre}</h2>
          <p className='text-gray-500 text-xs'>Precio: ${apt.Precio} / Noche</p>
        </div>
      ))}
      </div>
    </div> 
        </div>
        <div>
    <div className='flex justify-between mx-16'>
        <div className='flex cursor-pointer'>
          <h1 className='font-bold text-2xl sm:hidden'>Valledupar</h1>
          <h1 className='font-bold text-2xl hidden sm:block'>Alojamientos Populares en Valledupar</h1>
        <img className='w-[34px] h-[42px]' src={ArrowR}/></div>
        <div className='hidden md:block lg:block xl:block 2xl:block'>
            <button onClick={() => scrollRef3.current.scrollLeft -= 200}><img className='w-[19px] h-[28px]' src={ArrowL}/></button>
            <button onClick={() => scrollRef3.current.scrollLeft += 200}><img className='w-[19px] h-[28px]' src={ArrowR}/></button>
            </div>
        </div> 
    <div className=' flex flex-col px-[25px] w-full'>
        <div ref={scrollRef3} className='flex gap-2.5 overflow-x-scroll scrollbar-hide w-auto pl-2.5'>
            {apartamentos.map(apt => ( apt.Lugar == 'Valledupar' &&
        <div onClick={() => verDetalle(apt)} key={apt.id} className="p-2 mb-4 flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform" >
        <img src={JSON.parse(apt.Fotos)[0]} alt='' className="my-2 w-full h-40 object-cover" />
          <h2 className='text-sm font-bold'>{apt.Nombre}</h2>
          <p className='text-gray-500 text-xs'>Precio: ${apt.Precio} / Noche</p>
        </div>
      ))}
      </div>
    </div> 
        </div>
       </div>
       <div className='block md:hidden'>
        <Session/>
       </div>
    </>
  )
}

export default Lista