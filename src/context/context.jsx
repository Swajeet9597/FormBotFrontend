import { createContext, useState } from "react";
import { BASE_URL } from "../helper/helper";
import { useNavigate } from "react-router-dom";

export const DataContext = createContext()


export const DataProvider =({children})=>{
    const navigate = useNavigate()
    
    const [lightMode, setLightMode] = useState(false)



    const getUserDetails = async()=>{
        const response = await fetch(`${BASE_URL}/api/user/getDetails`,{
            method:"GET",
            credentials: "include",
        })
        const data = await response.json()
        return data.data
    }

    const name = "SD"

    const checkLogin = async() =>{
        const response =  await fetch(`${BASE_URL}/api/user/checkLogin`,{
            method:"POST",
            credentials: "include",
        })
        const data = await response.json()
        if(!data.success){
           return navigate("/")
        }

        return data.data
    }

    return <DataContext.Provider value={{getUserDetails,name,setLightMode,lightMode,checkLogin}}>
         {children}
    </DataContext.Provider>

}