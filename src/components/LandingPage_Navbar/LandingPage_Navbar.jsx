import React from 'react';
import './LandingPage_Navbar.css'
import {Link} from 'react-router-dom'


const LandingPage_Navbar = () => {
  return (
    <div className='LandingPage_Navbar' >
            <Link to={"/"} className="LandingPage_Navbar_left">
                <img src="SVG.png" alt="" />
                <span>FormBot</span>
            </Link>
            <div className="LandingPage_Navbar_right">
                <Link to={"/login"} >
                <button className='signin'>Sign in</button>
                </Link>
                <Link to={"/login"}>
                <button className='Lcreateformbot'>Create a FormBot</button>
                </Link>
            </div>
    </div>
  );
}


export default LandingPage_Navbar;
