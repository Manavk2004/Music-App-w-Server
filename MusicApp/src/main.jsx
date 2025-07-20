import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/homepage.css'
import { App } from './app.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
