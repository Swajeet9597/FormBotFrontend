import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'
import { DataContext } from '../../context/context';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../helper/helper';
import { toast } from 'react-toastify';
import close from '../../assets/close.png'
import Share from '../ShareC/Share';



const Navbar = ({ setIsDarkMode, isDarkMode }) => {

  const { getUserDetails } = useContext(DataContext)

  
  const [shareOpen, setShareOpen] = useState(false)
  
  const {setLightMode} = useContext(DataContext)
  
  const params = useParams()

  console.log(params);
  
  const [loginUserInfo, setLoginUserInfo] = useState({
    name: ""
  })
  
  const [workspace, setWorkspace] = useState([])
  const getWorkspace = async()=>{

    const response = await fetch(`${BASE_URL}/api/user/getWorkspace`,{
      method:"GET",
      credentials:"include"
    })

    const data = await response.json()

    if(data.success){
  
        setWorkspace(data.data.workspaces)
    }

  }

  const fetchDetails = async () => {

    const data = await getUserDetails()
  
    setLoginUserInfo(data)
 
  }

  function handleToggle() {
    setIsDarkMode((prevMode) => !prevMode);
    setLightMode((prev)=> !prev)
  }

  const navigate = useNavigate()

  const dark = ["Navbar", "", "", "mode", "share"]
  const light = ["Navbarlight", "selectlight", "optionlight", "modelight", "sharelight"]

  function handleShare(){
    setShareOpen(true)
  }

  async function handleOnchange(e) {

   
    if(e.target.value === "UserWorkspace"){
      navigate("/dashboard/root")
    }

    if(e.target.value !== "logout" && e.target.value !== "setting" && e.target.value !== "UserWorkspace"){
   
      const userIdToCheck = e.target.value 
      const user = workspace.find(user => user.userId === userIdToCheck)
     
      navigate(`/dashboard/${e.target.value}/root`)
    }

    if (e.target.value === "logout") {

      let response = await fetch(`${BASE_URL}/api/user/clearCookie`, {
        method: "POST",
        credentials: "include"
      })
      const data = await response.json()
      if (data.success) {
        navigate("/")
        toast.success(data.msg)
      }
    }
    if (e.target.value === "setting") {
      navigate("/dashboard/setting")
    }
  }


  useEffect(() => {
    localStorage.setItem("Mode", isDarkMode)
  }, [isDarkMode])

  useEffect(() => {
    fetchDetails()
    getWorkspace()
  }, [])

  return (
    <div className="mainNav">

      <div className={isDarkMode ? dark[0] : light[0]} >
        <div className='ddddd' ></div>
        <div className='workspacemenu' >
          <select onChange={handleOnchange} className={isDarkMode ? dark[1] : light[1]} id='menu'>
            <option  className={isDarkMode ? dark[2] : light[2]} value="UserWorkspace">{loginUserInfo.name} workspace</option>
            {workspace.map((w,index)=>(
              <option selected = {params.anotherworkspace === w.userId ? true : undefined} key={index} id='workspaces' value={w.userId}>{w.username} workspace</option>
            ))}
            <option value="setting">Setting</option>
            <option  className='logoutt' value="logout">Log out</option>
          </select>
        </div>
        <div className='modeandshare' >
          <div className={isDarkMode ? dark[3] : light[3]}>
            <span>Light</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
              <span className="slider"></span>
            </label>
            <span>Dark</span>
          </div>
          <div onClick={handleShare} className={isDarkMode ? dark[4] : light[4]}>
            Share
          </div>
        </div>
      </div>

      {shareOpen ? <div className="shareForm">
        <Share isDarkMode={isDarkMode} setShareOpen={setShareOpen}/>
      </div> : null }
      


    </div>
  );
}

export default Navbar;
