import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Home } from './Home.jsx'
import { CharactersContextProvider } from './context/CharactersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CharactersContextProvider>
    <Home />
    </CharactersContextProvider>
  </StrictMode>,
)
