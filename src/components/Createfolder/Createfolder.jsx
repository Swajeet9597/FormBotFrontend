import React, { useEffect, useState } from "react";
import "./Createfolder.css";
import { BASE_URL } from "../../helper/helper";
import CreateOption from "../CreateOption/CreateOption";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import create from "../../assets/create.png";
import deleteimg from "../../assets/delete.png";
import OpenDelete from "../OpenDeleteC/OpenDelete";


const Createfolder = ({
  isDarkMode,
  setSelectedFolderName,
  setgetformsstate,
  paramData,
}) => {
  const dark = ["create", "folder"];
  const light = ["createlight", "folderlight"];

  const [openCreate, setOpenCreate] = useState(false);
  const [openDeleteu, setOpenDelete] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState("");

  const [folders, setFolders] = useState([]);

  const [anotherFolders, setAnotherFolders] = useState([]);

  const navigate = useNavigate();

  const paramss = useParams();

  const [activeFolder, setActiveFolder] = useState(paramss.params || null);

  const createFolder = async () => {
    setOpenCreate(true);
  };

  const createFolderAnotherworkspace = async()=>{
    setOpenCreate(true);
  }

  const getFolders = async () => {
   
    let response = await fetch(`${BASE_URL}/api/user/getFolder`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    setFolders(data.data.folder);
  };

  const getFoldersAnotherworkspace = async () => {

    if(paramss.anotherworkspace){

      let response = await fetch(`${BASE_URL}/api/user/getAnotherworkspacefolder`, {
        method: "POST",
        credentials: "include",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(paramss)

      });
      
      const data = await response.json();

      if(data.success){ 
        setAnotherFolders(data.data.folder);
      }

      }
  };

  const [userMode, setUserMode] = useState("")


  const getUserMode = async()=>{

    const response = await fetch(`${BASE_URL}/api/user/getMode`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({userIdAnother:paramss.anotherworkspace})
    })

    const data = await response.json()

    if(data.success){

        setUserMode(data.data)
    }

  }


  function handleBack() {
    navigate(`/dashboard/root`);
  }

  function handleBackAnotherworkspace(){
    navigate(`/dashboard/${paramData.anotherworkspace}/root`);
  }

  function handleSelect(e, name) {
    setgetformsstate((prev) => !prev);

    navigate(`/dashboard/${name}`);

    setSelectedFolderName(name);

    setActiveFolder(paramss.params);
  }

  function handleSelectAnotherworkspace (e,name) {
    setgetformsstate((prev) => !prev);

    navigate(`/dashboard/${paramss.anotherworkspace}/${name}`);

    setSelectedFolderName(name);

    setActiveFolder(paramss.params);
  }

  function openDeleteOP(e, name) {
    e.stopPropagation()
    setDeleteFolder(name)
    setOpenDelete(true)
  }


  useEffect(() => {
    getFolders()
    
    
  }, [openCreate]);

  useEffect(()=>{
    getFoldersAnotherworkspace()
    getUserMode()
  },[openCreate,paramss])


  useEffect(() => {
    if (paramss.params) {
      setActiveFolder(paramss.params);
    }
  }, [paramss.params]);

  return (
    <>
      {paramData.anotherworkspace ? (

        <>



          <div className="Createfolder">
            {paramss.params !== "root" ? (
              <>
                {" "}
                <div style={{display : userMode === "View" ? "none" : ""}} onClick={handleBackAnotherworkspace} className="backarrowfolder">
                  <img src="/arrow_back.png" alt="" />
                </div>{" "}
              </>
            ) : (
              <div
                style={{display : userMode === "View" ? "none" : ""}}
                onClick={createFolderAnotherworkspace}
                className={isDarkMode ? dark[0] : light[0]}
              >
                <img src={create} alt="" />
                <span>Create a folder</span>
              </div>
            )}

            <div
              style={{ marginRight: paramss.params !== "root" ? "1rem" : 0 }}
            ></div>

            {anotherFolders.map((name, index) => (
              <>
                <div
                  key={name}
                  onClick={(e) => handleSelectAnotherworkspace(e, name)}
                  style={
                    isDarkMode
                      ? {
                          backgroundColor:
                            activeFolder === name ? "white" : "#2A2A2D",
                          color: activeFolder === name ? "black" : "white",
                        }
                      : {
                          backgroundColor:
                            activeFolder === name ? "#2A2A2D" : "white",
                          color: activeFolder === name ? "white" : "black",
                        }
                  }
                  id={`${name}`}
                  className={isDarkMode ? dark[1] : light[1]}
                >
                  <span
                    style={
                      isDarkMode
                        ? { color: activeFolder === name ? "black" : "white" }
                        : { color: activeFolder === name ? "white" : "black" }
                    }
                  >
                    {name}
                  </span>
                  <img
                     style={{display : userMode === "View" ? "none" : ""}}
                    onClick={(e) => openDeleteOP(e, name)}
                    src={deleteimg}
                    alt=""
                  />
                </div>
              </>
            ))}

            {/* onClick={(e)=>handleDelete(e,name)} */}

            {openCreate ? (
              <div className="open">
                <CreateOption
                  value="folder"
                  isDarkMode={isDarkMode}
                  setOpenCreate={setOpenCreate}
                  paramData={paramData}
                />
              </div>
            ) : null}

            {openDeleteu ? (
              <div className="open">
                <OpenDelete
                  value="folder"
                  isDarkMode={isDarkMode}
                  deleteFolder={deleteFolder}
                  setOpenDelete={setOpenDelete}
                  setFolders={setFolders}
                  setAnotherFolders={setAnotherFolders}
                />
              </div>
            ) : null}
          </div>
        </>







      ) : (
        <div className="Createfolder">
          {paramss.params !== "root" ? (
            <>
              {" "}
              <div onClick={handleBack} className="backarrowfolder">
                <img src="/arrow_back.png" alt="" />
              </div>{" "}
            </>
          ) : (
            <div
              onClick={createFolder}
              className={isDarkMode ? dark[0] : light[0]}
            >
              <img src={create} alt="" />
              <span>Create a folder</span>
            </div>
          )}

          <div
            style={{ marginRight: paramss.params !== "root" ? "1rem" : 0 }}
          ></div>

          {folders.map((name, index) => (
            <>
              <div
                key={name}
                onClick={(e) => handleSelect(e, name)}
                style={
                  isDarkMode
                    ? {
                        backgroundColor:
                          activeFolder === name ? "white" : "#2A2A2D",
                        color: activeFolder === name ? "black" : "white",
                      }
                    : {
                        backgroundColor:
                          activeFolder === name ? "#2A2A2D" : "white",
                        color: activeFolder === name ? "white" : "black",
                      }
                }
                id={`${name}`}
                className={isDarkMode ? dark[1] : light[1]}
              >
                <span
                  style={
                    isDarkMode
                      ? { color: activeFolder === name ? "black" : "white" }
                      : { color: activeFolder === name ? "white" : "black" }
                  }
                >
                  {name}
                </span>
                <img
                  onClick={(e) => openDeleteOP(e, name)}
                  src={deleteimg}
                  alt=""
                />
              </div>
            </>
          ))}

          {/* onClick={(e)=>handleDelete(e,name)} */}

          {openCreate ? (
            <div className="open">
              <CreateOption
                value="folder"
                isDarkMode={isDarkMode}
                setOpenCreate={setOpenCreate}
              />
            </div>
          ) : null}

          {openDelete ? (
            <div className="open">
              <OpenDelete
                value="folder"
                isDarkMode={isDarkMode}
                deleteFolder={deleteFolder}
                setOpenDelete={setOpenDelete}
                setFolders={setFolders}
              />
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Createfolder;
