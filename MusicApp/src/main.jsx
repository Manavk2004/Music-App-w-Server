import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/homepage.css'
import './css/explorepage.css'
import './css/savedPage.css'
import { App } from './app.jsx'

createRoot(document.getElementById('root')).render(
    <App />
)
