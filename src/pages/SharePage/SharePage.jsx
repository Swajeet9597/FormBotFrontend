import React, { useContext, useEffect, useState } from 'react';
import './SharePage.css'
import { DataContext } from '../../context/context';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper/helper';

const SharePage = () => {

    const {lightMode} = useContext(DataContext)

    console.log(lightMode);

    const [userId, setUserId] = useState("")

    const params = useParams()

    const navigate = useNavigate()

    const [searchParams] = useSearchParams();

    const [mode,setMode] = useState("")



    const checkLogin = async() =>{
      const response =  await fetch(`${BASE_URL}/api/user/checkLogin`,{
          method:"POST",
          credentials: "include",
      })
      const data = await response.json()
      if(!data.success){
        toast.error("First log in then click on this link to add workspace")
         return navigate("/")
      }

      setUserId(data.data)
  }


    console.log(userId);

    async function handleAddworkspace () {

      if(params.userId == userId){
        toast.error("this link is your workspace, it can't be shared with you");
        return navigate("/dashboard/root")

      }

      console.log("modeeee",mode);

      
      if(userId){

        const response = await fetch(`${BASE_URL}/api/user/addWorkspacebylink`,{
          method:"POST",
          credentials: "include",
          headers:{
            "Content-Type" : "application/json",
          },
          body:JSON.stringify({linkClickUser:userId, generatorLinkUser:params.userId,mode:mode})
        })

        const data = await response.json()

        if(!data.success){
           toast.success(data.msg)
          navigate("/dashboard/root")
        }
        if(data.success){
           toast.success(data.msg)
           navigate("/dashboard/root")
        }
      }
    }

    useEffect(()=>{
      checkLogin()
     
    },[])

    useEffect(()=>{
      handleAddworkspace()
    },[userId])

    useEffect(() => {
      setMode(searchParams.get("mode"))
     
    },[])

  return (
    <div style={{backgroundColor: lightMode ? "white" : ""}} className='SharePage' >
      
    </div>
  );
}


export default SharePage;
