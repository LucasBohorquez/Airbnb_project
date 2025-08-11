import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import Barra from '../components/Barra';

function Menu() {
  const location = useLocation();
  const { apt } = location.state || {}; 

  if (!apt) return <>
    <div className='flex flex-col items-center justify-evenly size-full bg-gradient-to-b from-[#F06A3E] to-white h-dvh'>
      <div className='flex flex-col items-center gap-4 p-6'>
        <p>No hay datos del Apartamento</p>
        <Link to='/'>
          <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
              Volver
            </span>
          </button></Link>
      </div>
    </div>
  </>;

  function haySolapamiento(nueva, existente) {
    return new Date(nueva.inicio) <= new Date(existente.fecha_salida) &&
      new Date(nueva.fin) >= new Date(existente.fecha_entrada);
  }

  const handleReservar = () => {
    console.log("Reservado");
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target

    const reservacion = {
      apartamento: apt.id,
      fecha_entrada: form.llegada.value,
      fecha_salida: form.salida.value,
      adultos: Number(form.adultos.value),
      adolescentes: Number(form.adolescentes.value),
      ninos: Number(form.ninos.value),
      bebes: Number(form.bebes.value),
    }
    if (new Date(reservacion.fecha_entrada) > new Date(reservacion.fecha_salida)) {
      alert('La fecha de llegada no puede ser posterior a la fecha de salida.');
      return;
    }
    supabase
      .from("Reservaciones")
      .select("*")
      .eq('apartamento', reservacion.apartamento)
      .then(({ data: existentes, error }) => {
        if (error) {
          console.error('Error buscando Reservacion:', error)
          alert('Error consultando la Reservacion')
          return;
        }
        const nueva = {
          inicio: reservacion.fecha_entrada,
          fin: reservacion.fecha_salida
        };

        const hayConflicto = existentes.some(existente =>
          haySolapamiento(nueva, existente)
        );

        if (hayConflicto) {
          alert('Ya hay una reservación para esos días, intente de nuevo con otra');
          return;
        }
        supabase
          .from('Reservaciones')
          .insert([reservacion])
          .then(({ data, error }) => {
            if (error) {
              console.log('Error al Reservar', error)
              alert('No se pudo realizar la Reservacion')
            } else {
              console.log('Reservacion realizada', data)
              alert('¡Reservacion realizada!')
              form.reset()
            }
          })
          .catch((err) => {
            console.log('Error inesperado', err)
            alert('Ocurrió un error inesperado')
          })
      });
  }; const [user, setUser] = useState(null)

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
        <div className='flex flex-col items-center justify-evenly size-full bg-gradient-to-b from-[#F06A3E] to-white h-dvh'>
          <div className='flex flex-col items-center gap-4 p-6'>
            <p>No estás autenticado</p>
            <Auth /><Link to='/'>
              <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                  Volver
                </span>
              </button></Link>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <Barra />
      <div className='mt-60 flex flex-col gap-10 xl:flex-row'>
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-shadow duration-300 p-4 w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {apt.Fotos &&
              JSON.parse(apt.Fotos).map(url => (
                <img
                  src={url}
                  className="w-full h-64 object-cover rounded-xl"
                />
              ))}
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            {apt.Nombre}
          </h1>
          <p className="text-gray-600 text-base mb-3">
            {apt.Descripcion}
          </p>

          <p className="text-xl font-bold text-gray-800">
            ${apt.Precio}{" "}
            <span className="text-gray-500 font-normal text-base">/ noche</span>
          </p>
        </div>

        <div className='flex justify-center-safe justify-items-start'>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className='block mb-2 text-sm font-medium'>Llegada:</label>
                <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="date" name='llegada' placeholder='Nombre del Producto' required />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Salida:</label>
                <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="date" name='salida' placeholder='Nombre del Producto' required />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Adultos:</label>
                <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="number" name='adultos' placeholder='¿Cuántos Adultos?' required />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Adolescentes:</label>
                <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="number" name='adolescentes' placeholder='¿Cuántos Adolescentes?'/>
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Niños:</label>
                <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="number" name='ninos' placeholder='¿Cuántos Niños?'/>
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium'>Bebés:</label>
                <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="number" name='bebes' placeholder='¿Cuántos Bebés?'/>
              </div>
            </div>
            <div className='flex gap-2.5 place-items-center-safe'>
              <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                  Reservar
                </span>
              </button>
              <Link to='/'>
                <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                  <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                    Volver
                  </span>
                </button></Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Menu