import React, { useEffect, useState } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../helper/helper';
import { ToastContainer, toast } from 'react-toastify';
import Loading from '../../components/Loading/Loading';

const Login = () => {
    const navigate = useNavigate()
    const [enteredInfo, setEnteredInfo] = useState({
        email: "",
        password: ""
    })

    const [load,setLoad] = useState(true)

    async function handleOnChange(e){
        let name = e.target.name;
        let val = e.target.value;

        setEnteredInfo({
            ...enteredInfo,
            [name]:val
        })


    }
    async function handleSubmit(e){
        e.preventDefault();
        setLoad(true)
        let response = await fetch(`${BASE_URL}/api/user/checkUser`,{
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(enteredInfo)
        })

      
        const data = await response.json()
       

        if(data.success){
           
            toast.success(data.msg)
            navigate("/dashboard/root")
            setLoad(false)
        }else{
            toast.error(data.msg)
            setLoad(false)
        }

    }


  return (
    <>
    <div className='Loginpage'>

        {load ? <div className="buffer">

        <Loading/>  </div> : <></>}

        {/* <Loading/> */}
 
        <form onSubmit={handleSubmit} className="mainlogin">

            <div className="input">
                <label htmlFor="email">Email</label>
                <input onChange={handleOnChange} type="text" name='email' id='email' placeholder='Enter your email' required />
            </div>

            <div className="input">
                <label htmlFor="email">Password</label>
                <input  onChange={handleOnChange}type="password" name='password' id='email' placeholder='********' required/>
            </div>

            <div className="btnlogandgoogle">


            <button  type='submit' className='loginbtn' >Log In</button>

            <span className='OR' >OR</span>

            <div className='googleSignin'>
                <img className='ellipse' src="Ellipse10.png" alt="" />
                <img  className='googleicon' src="google.png" alt="" />
                
                <span>Sign In with Google</span>
            </div>

            </div>

            <span className='Dont' >Don’t have an account? <Link to={"/signup"} className='Reg' >Register now</Link></span>

        </form>
        <Link to={"/"} className='backarrow' >
        <img src="arrow_back.png" alt="" />
        </Link>

        <img className='tringle' src="tringle.png" alt="" />    
        <img className='ellipseimg' src="Ellipse2.png" alt="" />    
        <img className='ellipseimg1' src="Ellipse1.png" alt="" />    

    </div>
   

    </>
  );
}

export default Login;
