import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.tsx'
import './index.css'
import './locales'
import 'virtual:uno.css'
import 'remixicon/fonts/remixicon.css'
import '@unocss/reset/tailwind.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
