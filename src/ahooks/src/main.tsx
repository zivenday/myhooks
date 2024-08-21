import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './package/useSize/demo/demo1'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
