import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSession } from '@supabase/auth-helpers-react'
import Auth from '../components/Auth';
import Logout from '../components/Logout';

function Anfitrion() {
  const [images, setImages] = useState([])
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const urls = [];
    setUploading(true);

    for (const file of files) {
      const fileName = `${Date.now()}-${file.name}`;

      const { error } = await supabase
        .storage
        .from('apartamentos')
        .upload(fileName, file);

      if (error) {
        console.error('Error al subir:', error.message);
        continue;
      }

      const publicURL = `https://jjotfinmkxhwndhwzjwk.supabase.co/storage/v1/object/public/apartamentos/${fileName}`;
      urls.push(publicURL);
    }

    setImages(urls);
    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (uploading) {
      alert('Subiendo Imagenes...');
      return;
    }
    const form = e.target

    const apartamentos = {
      Nombre: form.nombre.value,
      Precio: Number(form.precio.value),
      Lugar: form.lugar.value,
      Fotos: JSON.stringify(images),
      Descripcion: form.desc.value,
    }
    supabase
      .from('Apartamentos')
      .insert([apartamentos])
      .then(({ data, error }) => {
        if (error) {
          console.log('Error al Subir', error)
          alert('No se pudo SUbir el apartamento')
        } else {
          console.log('Apartamento Subido!', data)
          alert('¡Apartamento Subido!')
          form.reset()
        }
      })
      .catch((err) => {
        console.log('Error inesperado', err)
        alert('Ocurrió un error inesperado')
      });
  };
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
      <div className='flex items-center mt-2.5 flex-col gap-10'>
        <div className='flex flex-col items-center gap-5'>
        <img className='rounded-full w-[200px]' referrerPolicy='no-referrer' src={user.user_metadata.picture}/>
        <h1 className='font-bold text-2xl'>Hola, {user.user_metadata.full_name}</h1>
        </div>
        <Logout />
      </div>
      <div className='flex justify-center-safe justify-items-start'>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className='block mb-2 text-sm font-medium'>Nombre del Apartamento:</label>
              <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="text" name='nombre' placeholder='Nombre Apartamento ej:Apt 102' required />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium'>Precio del Apartamento (Precio * Noche):</label>
              <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="text" name='precio' placeholder='Precio del Apartamento Por Noche' required />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium'>Ubicacion del Apartamento:</label>
              <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="text" name='lugar' placeholder='¿Dónde se Encuentra?' required />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium'>Descripción:</label>
              <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="text" multiple accept="image/*" onChange={handleFileUpload} name='desc' placeholder='Habitaciones, Baños, etc...' required />
            </div>
            <div>
              <label className='block mb-2 text-sm font-medium'>Fotos del Apartamento:</label>
              <input className='formu relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800' type="file" multiple accept="image/*" onChange={handleFileUpload} name='fotos' required />
            </div>
          </div>
          <div className='flex gap-2.5 place-items-center-safe'>
            <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                {uploading ? 'Subiendo imágenes...' : 'Subir Apartamento'}
              </span>
            </button>
            <Link to='/'>
              <button type='submit' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-[#D33753] to-[#EB4C60] group-hover:from-[#D33753] to-[#EB4C60] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent'>
                  Volver
                </span>
              </button></Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Anfitrion