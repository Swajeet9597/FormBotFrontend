import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage_Navbar from './components/LandingPage_Navbar/LandingPage_Navbar'
import LandingPage_Footer from './components/LandingPage_Footer/LandingPage_Footer'


function App() {
  const [count, setCount] = useState(0)

  
  const getScreen = () =>{ 
    return{
      width:window.innerWidth,
    };
  };

  const [screeSize, setScreenSize] = useState(getScreen());

  useEffect(()=>{
    const Screen = () =>{
        setScreenSize(getScreen());
    };
    window.addEventListener('resize', Screen);

  },[]);

  return (
    <div className="land">

{screeSize.width < 768 ? <> This website will work on PC/laptop Only for better experience </> :

    <div className='landingpage'>
      <LandingPage_Navbar/>
      <main>
         <img src="LandingPage.png" alt="" />
      </main>
      <LandingPage_Footer/>
    </div> 
}
    
    </div>
  )
}

export default App
