import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import '@fontsource-variable/orbitron';
import '@fontsource-variable/alexandria';
import '@fontsource/anton';
import '@fontsource-variable/antonio';
import '@fontsource/averia-serif-libre';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
