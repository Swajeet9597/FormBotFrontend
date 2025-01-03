import React, { useContext, useEffect, useState } from 'react';
import './Form_Navbar.css'
import { DataContext } from '../../context/context';
import close1 from '../../assets/close1.png'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper/helper';


const Form_Navbar = ({ formData }) => {
  const params = useParams()
  const { lightMode, setLightMode } = useContext(DataContext)
  const light = ["Form_NavbarLight", "formnameLight"]

  const queryParams = new URLSearchParams(location.search);
  const value = queryParams.get("value");
  const decodedValue = decodeURIComponent(value);
  const navigate = useNavigate()

  const [userId, setUserId] = useState("")




  const [updatedName, setUpdatedName] = useState("")

  async function handleUpdateName(e) {
    try {

      // console.log(e.target.value);
      setUpdatedName(e.target.value)

    } catch (error) {
      console.log(error);
    }
  }

  const handleSave = async () => {
    // console.log(formData);
    if (decodedValue !== "response") {

      if (updatedName !== "") {
        // console.log("updated");

        if (params.anotherworkspace) {
          navigate(`/${params.anotherworkspace}/form/${params.params}/${updatedName}`)
        } else {
          navigate(`/form/${params.params}/${updatedName}`)
        }

        const updateResponse = await fetch(`${BASE_URL}/api/user/updatedFormname`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ folderName: params.params, anotherUserId: params.anotherworkspace ? params.anotherworkspace : null, formName: params.formName, updatedName: updatedName })
        })

      }

      if (formData.length === 0) {
        return toast.error("Please create a form then save...")
      }

      const saveResponse = await fetch(`${BASE_URL}/api/user/addFormData`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData: formData, folderName: params.params, anotherUserId: params.anotherworkspace ? params.anotherworkspace : null, formName: params.formName })
      })

      const data = await saveResponse.json()
      if (data.success) {
        toast.success(data.msg)
        const responseDocResponse = await fetch(`${BASE_URL}/api/user/createResponseDoc`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ folderName: params.params, anotherUserId: params.anotherworkspace ? params.anotherworkspace : null, formName: params.formName })
        })
      }
     }
    }

    function toggleMode() {
      setLightMode((prev) => !prev)
    }
    function handleBackToFolder() {
      if (params.anotherworkspace) {

        return navigate(`/dashboard/${params.anotherworkspace}/${params.params}/`)
      }
      navigate(`/dashboard/${params.params}`)
    }

    const checkLogin = async () => {
      const response = await fetch(`${BASE_URL}/api/user/checkLogin`, {
        method: "POST",
        credentials: "include",
      })
      const data = await response.json()
      if (!data.success) {
        return navigate("/")
      } else {

      }
      if (params.anotherworkspace) {
        return setUserId(params.anotherworkspace)
      }

      setUserId(data.data)
    }

    function handleShareForm(e) {
      e.preventDefault()
      const link = `${window.location.origin}/${userId}/${params.params}/${params.formName}`
      // console.log(link, userId);
      navigator.clipboard.writeText(link)
        .then(() => {
          toast.success('Link copied to clipboard!');
        })
        .catch((error) => {
          toast.error('Failed to copy the link.');
        })
    }



    function handleResponse() {
      if (params.anotherworkspace) {

        return navigate(`/${params.anotherworkspace}/form/${params.params}/${params.formName}/response?value=response`)

      }

      navigate(`/form/${params.params}/${params.formName}/response?value=response`)

    }


    function handleForm() {

      if (params.anotherworkspace) {

        return navigate(`/${params.anotherworkspace}/form/${params.params}/${params.formName}`)
      }

      navigate(`/form/${params.params}/${params.formName}`)

    }


    useEffect(() => {
      checkLogin()
      if (params.anotherworkspace) {
        setUserId(params.anotherworkspace)
      }
    }, [])

    return (
      <div style={{ backgroundColor: lightMode ? "white" : null }} className={lightMode ? light[0] : "Form_Navbar"} >
        <div className={lightMode ? light[1] : "formname"}>
          <input onChange={handleUpdateName} type="text" className='inputChange' style={{ backgroundColor: "#37373E", border: "none", color: "#767676D1" }} placeholder={`${params.formName}`} />
          {/* {params.formName} */}
        </div>
        <div className="flowResponse">
          <div style={decodedValue == "response" ? {
            border: "none", cursor: "pointer",
            color: lightMode ? "black" : "white",
            borderRadius: "6px",
            fontSize: "14px",
            padding: "7px 10px"
          } : {
            border: "1px",
            borderStyle: "solid",
            borderColor: "#7EA6FF",
            cursor: "pointer",
            color: "#7EA6FF",
            borderRadius: "6px",
            fontSize: "14px",
            padding: "7px 10px"
          }} onClick={handleForm} className="flow">
            Flow
          </div>
          <div onClick={handleResponse} style={decodedValue !== "response" ? {
            border: "none", cursor: "pointer",
            color: lightMode ? "black" : "white",
            borderRadius: "6px",
            fontSize: "14px",
            padding: "7px 10px"
          } : {
            border: "1px",
            borderStyle: "solid",
            borderColor: "#7EA6FF",
            cursor: "pointer",
            color: "#7EA6FF",
            borderRadius: "6px",
            fontSize: "14px",
            padding: "7px 10px"
          }} className="response">
            Response
          </div>
        </div>
        <div className="modeShareSave">
          <div className="mode">
            <span style={{ color: lightMode ? "black" : "white" }} >Light</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={!lightMode} onChange={toggleMode} />
              <span className="slider"></span>
            </label>
            <span style={{ color: lightMode ? "black" : "white" }}>Dark</span>
          </div>
          <div onClick={handleShareForm} style={{ backgroundColor: "#1A5FFF", color: "white", padding: "6px", width: "4rem" }} className="share">
            Share
          </div>

          <div onClick={handleSave} style={{ backgroundColor: "#4ADE80CC", color: "white", padding: "6px", width: "4rem" }} className="share">
            Save
          </div>
          <img onClick={handleBackToFolder} width={15} height={15} src={close1} alt="" />
        </div>
      </div>
    );
  }

  export default Form_Navbar;
