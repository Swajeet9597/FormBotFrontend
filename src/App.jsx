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

{screeSize.width < 850 ? <div style={{color:"white", height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}> This website is designed to work best on PCs and laptops for an enhanced experience. </div> :

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
