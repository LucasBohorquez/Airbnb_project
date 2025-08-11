import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { supabase } from './supabaseClient'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <SessionContextProvider supabaseClient={supabase}>
    <App />
  </SessionContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
