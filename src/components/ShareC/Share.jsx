import React, { useContext, useEffect, useState } from 'react';
import close from '../../assets/close.png'
import './Share.css'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper/helper';
import { DataContext } from '../../context/context';

const Share = ({isDarkMode,setShareOpen}) => {

    function handleClose(){
        setShareOpen(false)
    }

    const {checkLogin} = useContext(DataContext)

    const [userId, setUserId] = useState("")

    async function getUserId (){
      setUserId(await checkLogin())
    }

    const [email,setEmail] = useState("")

    const [mode,setMode] = useState("Edit")

    const handleShareByEmail = async(e)=>{
      e.preventDefault()
      console.log("lllllllll");
      if(email === ""){
        return toast.error("Please enter email")
      }

      const response = await fetch(`${BASE_URL}/api/user/addWorkspace`,{
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email:email, mode:mode})
      })
       const data = await response.json()

       if(data.success){
          toast.success(data.msg)
          setShareOpen(false)
        }else{
          toast.error(data.msg)  
       }
    }

    

    function handleShareByCopyLink(e){
      e.preventDefault()
      const encodedMode = btoa(mode);
      console.log(userId,encodedMode);
      const link = `${window.location.origin}/share/${userId}?mode=${encodedMode}`;

      navigator.clipboard.writeText(link)
      .then(() => {
        toast.success('Link copied to clipboard!');
      })
      .catch((error) => {
        toast.error('Failed to copy the link.');
      });

      
    }

    const handleOnChange = async(e)=>{
      setEmail(e.target.value)
    }

    function handleSelectValue (e){
       
        setMode(e.target.value)
    }

    useEffect(()=>{
      getUserId()
    },[])


  return (
    <div className="mainop">

          <form style={{ backgroundColor: isDarkMode ? null : "white", color: isDarkMode ? null : "black", border: isDarkMode ? null : "1px solid black", paddingTop : "4rem" }} className='createopbox' >


            <div className='shareDiv' style={{ color: isDarkMode ? null : "black" }}>
              <span style={{color: isDarkMode ? null : "black"}} >Invite by Email</span>
              <select onChange={handleSelectValue} className='selectOpShare' name="" id="">
                <option style={{fontSize: "1rem"}} value="Edit">Edit</option>
                <option value="View">View</option>
              </select>
            </div>
            <input onChange={handleOnChange} style={{ backgroundColor: isDarkMode ? null : "white", border: isDarkMode ? null : "1px solid black", padding: "1rem", width: "35rem" }} type="email" name='name' placeholder='Enter email id' />
            <div className="buttonSeninvite">
              <button onClick={handleShareByEmail} style={{ backgroundColor: isDarkMode ? null : "#1A5FFF", fontSize: "1rem" }} type='submit'>Send Invite</button>
            </div>
            <img onClick={handleClose} className='closeImg' src={close} alt="" />
            <div className='shareDiv' style={{ color: isDarkMode ? null : "black" }}>
              <span style={{color: isDarkMode ? null : "black"}} >Invite by link</span>
              
            </div>
            <div className="buttonSeninvite">
              <button onClick={handleShareByCopyLink} style={{ backgroundColor: isDarkMode ? null : "#1A5FFF", fontSize: "1rem" }} type='submit'>Copy link</button>
            </div>

          </form>

          
        </div>
  );
}

export default Share;
