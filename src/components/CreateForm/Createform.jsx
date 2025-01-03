import React, { useEffect, useState } from 'react';
import './Createform.css'
import { useNavigate, useParams } from 'react-router-dom';
import add from '../../assets/add.png';
import deleteimg from '../../assets/delete.png'
import { BASE_URL } from '../../helper/helper';
import { toast } from 'react-toastify';
import CreateOption from '../CreateOption/CreateOption';
import OpenDelete from '../OpenDeleteC/OpenDelete';
// import OpenDelete from '../OpenDeleteC/OpenDelete';

const Createform = ({ isDarkMode, selectedFolderName, getformsstate, paramData }) => {


  const params = useParams()

  const [forms, setForms] = useState(null)
  const [anotherForms, setAnotherForms] = useState(null)

  const [openCreate, setOpenCreate] = useState(false)
  const [openDeleteu, setOpenDelete] = useState(false)
  const [deleteFolder, setDeleteFolder] = useState("")
  const navigate = useNavigate()


  const getForms = async () => {

    let response = await fetch(`${BASE_URL}/api/user/getForms`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "text/plain"
      },
      body: params.params
    })

    const data = await response.json()

    if (data.success) {
      // toast.success(data.msg)
      setForms(data.data)
    }

  }

  const getAnotherForms = async () =>{
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



  function openDeleteOP(e, name) {
    e.stopPropagation()
    setDeleteFolder(name)
    setOpenDelete(true)
  }

  const openCreateWindow = async () => {
    setOpenCreate(true)
  }


  async function hanldeOpenForm(e,name){

    if(params.anotherworkspace){
      return navigate(`/${params.anotherworkspace}/form/${params.params}/${name}`)
    }
  
    navigate(`/form/${params.params}/${name}`)
  }

  const [userMode, setUserMode] = useState("")


  const getUserMode = async()=>{

    const response = await fetch(`${BASE_URL}/api/user/getMode`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({userIdAnother:params.anotherworkspace})
    })

    const data = await response.json()

    if(data.success){

        setUserMode(data.data)
    }

  }


  useEffect(() => {

  }, [isDarkMode])


  useEffect(() => {
    getForms()

  }, [params.params, openCreate])

  useEffect(()=>{
    getAnotherForms()
    if(params.anotherworkspace){

      getUserMode()
    }
  },[params,openCreate])


  return (

    <>

      {paramData.anotherworkspace ?
        <>

          <div className='createform' >

            <div   style={{display : userMode === "View" ? "none" : ""}} className="createform1" >
              <img onClick={openCreateWindow} src={add} alt="" />
              <span>Create a typebot</span>
            </div>

            {anotherForms ? anotherForms.map((name, index) => (
              <div onClick={(e)=>hanldeOpenForm(e,name)} key={index} className="form1" style={{ background: isDarkMode ? "#FFFFFF80" : "#31303017" }}>
                <img   style={{display : userMode === "View" ? "none" : ""}} onClick={(e) => openDeleteOP(e, name)} src={deleteimg} alt="" />
                <span style={{ color: isDarkMode ? "#FFFFFF" : "black" }}>{name}</span>
              </div>
            )) : <></>}



            {openCreate ?

              <div className='open'>

                <CreateOption value="form" isDarkMode={isDarkMode} setOpenCreate={setOpenCreate} />

              </div> : null}

            {openDeleteu ?
              <div className='open'>


                <OpenDelete value="form" isDarkMode={isDarkMode} deleteFolder={deleteFolder} setOpenDelete={setOpenDelete} setForms={setForms} setAnotherForms={setAnotherForms} />


              </div> : null}

          </div>
        </>

        :

        <div className='createform' >
          <div className="createform1" >
            <img onClick={openCreateWindow} src={add} alt="" />
            <span>Create a typebot</span>
          </div>

          {forms ? forms.map((name, index) => (
            <div onClick={(e)=>hanldeOpenForm(e,name)} key={index} className="form1" style={{ background: isDarkMode ? "#FFFFFF80" : "#31303017" }}>
              <img onClick={(e) => openDeleteOP(e, name)} src={deleteimg} alt="" />
              <span style={{ color: isDarkMode ? "#FFFFFF" : "black" }}>{name}</span>
            </div>
          )) : <></>}



          {openCreate ?

            <div className='open'>

              <CreateOption value="form" isDarkMode={isDarkMode} setOpenCreate={setOpenCreate} />

            </div> : null}

          {openDeleteu ?
            <div className='open'>


              <OpenDelete value="form" isDarkMode={isDarkMode} deleteFolder={deleteFolder} setOpenDelete={setOpenDelete} setForms={setForms} />


            </div> : null}

        </div>

      }



    </>
  );
}

export default Createform;
