import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Basic from './package/useRequest/doc/debounce/demo/debounce'

const App = () => {
  console.log('////')
  return (
    <div>
      <Basic></Basic>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
