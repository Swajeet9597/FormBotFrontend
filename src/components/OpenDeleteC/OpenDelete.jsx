import React from 'react';
import './OpenDelete.css'
import { BASE_URL } from '../../helper/helper';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const OpenDelete = ({isDarkMode,setOpenDelete,deleteFolder,setFolders,value,setForms,setAnotherFolders,setAnotherForms}) => {

    const params = useParams()

    async function handleDone(e){
        e.preventDefault()
        e.stopPropagation()

        if(params.anotherworkspace){

          if(value==="folder"){

            let response = await fetch(`${BASE_URL}/api/user/deleteFolderanother`,{
              method: "PATCH",
              headers:{
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({userId:params.anotherworkspace, name:deleteFolder})
            })
          
            const data = await response.json()
            
            if(data.success){
              toast.success(`${value} deleted...`)
              setOpenDelete(false)
              let response = await fetch(`${BASE_URL}/api/user/getAnotherworkspacefolder`,{
                method: "POST",
                credentials: "include",
                headers:{
                  "Content-Type":"application/json",
                },
                body:JSON.stringify(params)
              })
      
              const dataa = await response.json()
      
              setAnotherFolders(dataa.data.folder)
            }
    
        }else{

          let response = await fetch(`${BASE_URL}/api/user/deleteFormAnother`,{
              method: "PATCH",
              headers:{
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({userId:params.anotherworkspace, formname:deleteFolder, foldername:params.params })
            })
            
        
            const data = await response.json()
        
            if(data.success){
              toast.success(`${value} deleted...`)
              setOpenDelete(false)
              let response = await fetch(`${BASE_URL}/api/user/getAnotherworkspaceform`, {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({userId:params.anotherworkspace,name:params.params})
              })
          
              const data = await response.json()

              if (data.success) {
                setAnotherForms(data.data)
              }
            }
      }
          
         return console.log("deldede",deleteFolder);
        }

        if(value==="folder"){

        let response = await fetch(`${BASE_URL}/api/user/deleteFolder`,{
          method: "PATCH",
          headers:{
            "Content-Type": "text/plain",
          },
          credentials: "include",
          body: deleteFolder
        })
      
        const data = await response.json()
        
        if(data.success){
          toast.success(`${value} deleted...`)
          setOpenDelete(false)
          let response = await fetch(`${BASE_URL}/api/user/getFolder`,{
            method:"GET",
            credentials: "include",
         
          })
  
          const dataa = await response.json()
  
          setFolders(dataa.data.folder)
        }

    }else{

        let response = await fetch(`${BASE_URL}/api/user/deleteForm`,{
            method: "PATCH",
            headers:{
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({formname:deleteFolder, foldername:params.params })
          })
          
      
          const data = await response.json()
      
          if(data.success){
            toast.success(`${value} deleted...`)
            setOpenDelete(false)
            let response = await fetch(`${BASE_URL}/api/user/getForms`,{
              method: "POST",
              credentials: "include",
              headers:{
                "Content-Type": "text/plain"
              },
              body: params.params
            })
        
            const dataa = await response.json()
        
            if(dataa.success){
              // toast.success(data.msg)
              setForms(dataa.data)
            }
          }
    }
    }


    function handleCancel(){
        setOpenDelete(false)
    }
  return (
    <div className="mainop">

    <form onSubmit={handleDone} style={{backgroundColor: isDarkMode ? null : "white", color: isDarkMode ? null : "black", border: isDarkMode ? null : "1px solid black" }} className='createopbox' >
        <div className='areyou' style={{color: isDarkMode ? null : "black"}}>
       <span> Are you sure you want to</span>  
        <span>delete this {value} ?</span>
        </div>
        <div className="donecanclebtn">
            <button style={{backgroundColor: isDarkMode ? null : "white"}} type='submit' onClick={handleDone} >Confirm</button>
             <img src="Line4.png" alt="" />
             <span style={{color: isDarkMode ? null : "black"}} onClick={handleCancel} >Cancel</span>
        </div>
    </form>

    </div>
  );
}

export default OpenDelete;
