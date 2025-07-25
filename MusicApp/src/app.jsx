import { useState } from 'react'
import './css/homepage.css'
import Homepage from "./pages/homepage.jsx"
import { LoginPage } from "./pages/loginPage.jsx"
import { ExplorePage } from "./pages/explorePage.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login-page" element={<LoginPage/>} />
          <Route path="/home" element={<Homepage />} />
          <Route path='/explore' element={<ExplorePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
