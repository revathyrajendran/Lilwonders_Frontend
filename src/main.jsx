import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextShare from '../Context/ContextShare.jsx'
import AuthContext from '../Context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='310902388824-iebtvn8ajtm1ieq5fijadp053peu25ip.apps.googleusercontent.com'>
        <ContextShare>
          <AuthContext>
            <App />
          </AuthContext>
        </ContextShare>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
