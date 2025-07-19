import { useState } from 'react'
import './css/homepage.css'
import Homepage from "./pages/homePage/homepage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
