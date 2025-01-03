import React, { useState } from 'react';
import './CreateOption.css'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper/helper';
import { useParams } from 'react-router-dom';

const CreateOption = ({setOpenCreate, isDarkMode, value,paramData}) => {

    const params = useParams()

    const [fname,setFName] = useState({
        name:"",
        userId: params.anotherworkspace || "",
        param: params.params
    })

    function handleOnChange(e){
        let ffname = e.target.value

        setFName({
            ...fname,
            name:ffname
        })    
    }


    const handleCancel = async()=>{
        setOpenCreate(false)
    }

    const handleDone = async(e)=>{
        e.preventDefault()

        if(params.anotherworkspace){

            if(value === "folder"){

                // e.preventDefault()
                if(fname !== ""){
                
                    let response = await fetch(`${BASE_URL}/api/user/addFolderToAnother`,{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(fname)
                    })
                    
                    const data = await response.json()
                    
      
                    if(data.success){
                  
                        toast.success(data.msg)
                        setOpenCreate(false)
                        
                    }
                    else{
                        toast.error(data.msg)
                    }
                }
                else{
                    toast.error("Please enter a name")
                }
            }

            if(value ==="form"){
                e.preventDefault()
        
                if(fname !== ""){
                  
                    let response = await fetch(`${BASE_URL}/api/user/addFormsAnother`,{
                        method: "POST",
                        headers:{
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(fname)
                    })
                    
                    const data = await response.json()
                    
 
                    if(data.success){
                        toast.success(data.msg)
                        setOpenCreate(false)  
                    }
                    else{
                        toast.error(data.msg)
                    }
                }

                else{
                    toast.error("Please enter a name")
                }
    
    
            }

            return console.log("");
        }

        if(value === "folder"){

            // e.preventDefault()
            if(fname !== ""){
            
                let response = await fetch(`${BASE_URL}/api/user/addFolder`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(fname)
                })
                
                const data = await response.json()
                
             
                if(data.success){
              
                    toast.success(data.msg)
                    setOpenCreate(false)
                    
                }
                else{
                    toast.error(data.msg)
                }
            }
            else{
                toast.error("Please enter a name")
            }
        }
        if(value ==="form"){
            // e.preventDefault()
       
            if(fname !== ""){
         
                let response = await fetch(`${BASE_URL}/api/user/addForms`,{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(fname)
                })
                
                const data = await response.json()
                
        
                if(data.success){
                    toast.success(data.msg)
                    setOpenCreate(false)
                    
                }
                else{
                    toast.error(data.msg)
                }
            }
            else{
                toast.error("Please enter a name")
            }


        }
    }

  return (
    <div className="mainop">

    <form onSubmit={handleDone} style={{backgroundColor: isDarkMode ? null : "white", color: isDarkMode ? null : "black", border: isDarkMode ? null : "1px solid black" }} className='createopbox' >
        <div style={{color: isDarkMode ? null : "black"}}>
        Create New {value}
        </div>
        <input onChange={handleOnChange} style={{backgroundColor: isDarkMode ? null : "white" ,border: isDarkMode ? null : "1px solid black"}} type="text" name='name' placeholder='Enter folder name' />
        <div className="donecanclebtn">
            <button style={{backgroundColor: isDarkMode ? null : "white"}} type='submit' onClick={handleDone} >Done</button>
             <img src="Line4.png" alt="" />
             <span style={{color: isDarkMode ? null : "black"}} onClick={handleCancel} >Cancel</span>
        </div>
    </form>

    </div>
  );
}

export default CreateOption;
