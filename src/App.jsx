import {Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { useSession } from '@supabase/auth-helpers-react'
import Menu from './pages/Menu'
import Anfitrion from './pages/Anfitrion'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
         <Route path="/Apartamento" element={<Menu />} />
         <Route path="/Anfitrion" element={<Anfitrion />} />
      </Routes>
  )
}
export default App