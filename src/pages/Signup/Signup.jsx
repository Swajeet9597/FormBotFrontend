import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import { BASE_URL } from '../../helper/helper';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {

    const [userinfo, setUserinfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const [error, setError] = useState(true)

    function handleOnChange(e){
        let name = e.target.name
        let val = e.target.value
        setUserinfo({
            ...userinfo,
            [name]:val
        })

        
    }

    const validate=()=>{
        if(userinfo.confirmpassword){   
            if(userinfo.password  !== userinfo.confirmpassword){
                setError(false)
            }
            else{
                setError(true)
            }
        }
    }

    const navigate = useNavigate()

    const handleSignUP = async(e)=>{
       
        e.preventDefault()
        if(userinfo.password !== userinfo.confirmpassword){
            return toast.error("Password and confirm password are not matched...")
        }
        let response = await fetch(`${BASE_URL}/api/user/addUser`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(userinfo)
        })

        const data = await response.json()

        if(data.success){
            toast.success(data.msg)
            navigate("/login")
            
        }else{
            toast.error(data.msg)

        }
    }

    useEffect(()=>{
        validate()
    })

  return (

    <>
    <div className='Loginpage'>
        
        <form className="mainlogin" onSubmit={handleSignUP}>

            <div className="input">
                <label htmlFor="name">Username</label>
                <input onChange={handleOnChange} type="text" id='name' name='name' placeholder='Enter a username' required/>
            </div>

            <div className="input">
                <label htmlFor="email">Email</label>
                <input onChange={handleOnChange} type="text" id='email' name='email' placeholder='Enter your email' required/>
            </div>

            <div className="input">
                <label htmlFor="password">Password</label>
                <input onChange={handleOnChange} type="text" id='password' name='password' placeholder='************' required/>
            </div>

            <div className="input">
                <label style={{color: error ? "white" : "#FF4141" }} htmlFor="confirmpassword">Confirm Password</label>
                <input style={{border: error ? "1px solid #FFFFFF80" : "1px solid #FF272780" }} onChange={handleOnChange} type="text" id='confirmpassword' name='confirmpassword' placeholder='************' required/>
                {error ? <span className='passerror'></span> : <><span className='passerror' >Password not matched</span></>}
            </div>

            <div className="btnlogandgoogle">


            <button type='submit' className='loginbtn'  >Sign Up</button>

            <span className='OR' >OR</span>

            <div className='googleSignin'>
                <img className='ellipse' src="Ellipse10.png" alt="" />
                <img  className='googleicon' src="google.png" alt="" />
                
                <span>Sign Up with Google</span>
            </div>

            </div>

            <span className='Dont' >Already have an account ?  <Link to={"/login"} className='Reg' >Login</Link></span>

        </form>
        <Link to={"/login"} className='backarrow' >
        <img src="arrow_back.png" alt="" />
        </Link>

        <img className='tringle' src="tringle.png" alt="" />    
        <img className='ellipseimg' src="Ellipse2.png" alt="" />    
        <img className='ellipseimg1' src="Ellipse1.png" alt="" />    

    </div>
   

    </>
  );
}

export default Signup;
