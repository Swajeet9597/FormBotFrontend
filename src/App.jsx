import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage_Navbar from './components/LandingPage_Navbar/LandingPage_Navbar'
import LandingPage_Footer from './components/LandingPage_Footer/LandingPage_Footer'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="land">

    <div className='landingpage'>
      <LandingPage_Navbar/>
      <main>
         <img src="LandingPage.png" alt="" />
      </main>
      <LandingPage_Footer/>
    </div>
    
    </div>
  )
}

export default App
