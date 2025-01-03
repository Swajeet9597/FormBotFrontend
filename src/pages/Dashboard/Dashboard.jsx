import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css'
import './Dashboard.css'
import Navbar from '../../components/Navbar/Navbar';
import Createfolder from '../../components/Createfolder/Createfolder';
import Createform from '../../components/CreateForm/Createform';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../helper/helper';
import Cookies from 'js-cookie';
import { DataContext } from '../../context/context';


const Dashboard = () => {



   const navigate = useNavigate()

   const {lightMode} = useContext(DataContext)

    const [isDarkMode, setIsDarkMode] = useState(!lightMode)

    const [selectedFolderName, setSelectedFolderName] = useState("root")

    const [getformsstate, setgetformsstate] = useState(true)
    
    const params = useParams()

    const[paramData, setParamData] = useState(params.params)
    
    // const mode = localStorage.getItem("Mode");

    const dark = ["dashboard"]
    const light = ["dashboardlight"]


    const createRoot = async()=>{
      let response = await fetch(`${BASE_URL}/api/user/createrootFolder`,{
        method:"POST",
        credentials:"include"
      })
      const data =await response.json()
      if(!data.success){
        navigate("/")
      }
      
      
    }

    const createWorkspace = async()=>{
        const response = await fetch(`${BASE_URL}/api/user/createWorkspace`,{
          method: "POST",
          credentials:"include"
        })
    }


    useEffect(()=>{
        setParamData(params)
    },[params])


    useEffect(()=>{
      createRoot()
      createWorkspace()
    
    },[])

  
  return (
    <>

    
    <div className={isDarkMode? dark[0]: light[0]}>
   
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Createfolder paramData={paramData} isDarkMode={isDarkMode} setgetformsstate={setgetformsstate} setSelectedFolderName={setSelectedFolderName} selectedFolderName={selectedFolderName}/>
        <Createform paramData={paramData} getformsstate={getformsstate} isDarkMode={isDarkMode} selectedFolderName={selectedFolderName} />
    </div>
    
    

    </>

  );
}


export default Dashboard;
