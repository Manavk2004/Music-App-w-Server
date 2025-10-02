import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/homepage.css'
import './css/explorepage.css'
import './css/savedPage.css'
import { App } from './app.jsx'
import { Provider } from 'jotai'

createRoot(document.getElementById('root')).render(
    <Provider>
        <App />
    </Provider>
)
