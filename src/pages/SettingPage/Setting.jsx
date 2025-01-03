import React, { useContext, useEffect, useState } from "react";
import "./Setting.css";
import prof from "../../assets/profile.png";
import hide from "../../assets/hide.png";
import seen from "../../assets/seen.png";
import logout from "../../assets/Logout.png";
import { toast } from "react-toastify";
import { BASE_URL } from "../../helper/helper";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/context";
import arrow from '../../assets/arrow_back.png'

const Setting = () => {
  const navigate = useNavigate();
  const {lightMode,checkLogin} = useContext(DataContext)

  // const {checkLogin} = useContext(DataContext)

  const [updateValues, setUpdateValue] = useState({
    name: "",
    email: "",
    oldpass: "",
    newpass: "",
  });

  const [toggle, setToggle] = useState({
    email: true,
    oldpass: true,
    newpass: true,
  });

  const updateInfo = async () => {
    const response = await fetch(`${BASE_URL}/api/user/updateInfo`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateValues),
    });

    const data = await response.json();

    if (data.success) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  };

  function handleToggle(field) {
    setToggle((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !updateValues.name &&
      !updateValues.email &&
      !updateValues.oldpass &&
      !updateValues.newpass
    ) {
      return toast.error("Please update any field...");
    }
    if (!updateValues.oldpass && updateValues.newpass) {
      return toast.error("Please enter oldpass");
    }
    if (updateValues.oldpass && !updateValues.newpass) {
      return toast.error("Please enter oldpass");
    }
    updateInfo();
  }
  function handleChange(e) {
    let name = e.target.name;
    let val = e.target.value;

    setUpdateValue({
      ...updateValues,
      [name]: val,
    });
  }

  async function handleLogout() {
    let response = await fetch(`${BASE_URL}/api/user/clearCookie`, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      navigate("/");
      toast.success(data.msg);
    }
  }

  useEffect(()=>{
    checkLogin()
  },[])

  return (
    <div style={{backgroundColor : lightMode ? "white" : null}} className="settingPage">
        <Link to={"/dashboard/root"} className='backarrowsetting' >
           <img src={arrow} alt="" />
        </Link>
      <div style={{color : lightMode ? "black" : null}} className="titleSettin">Settings</div>
      <form className="settingForm" action="" onSubmit={handleSubmit}>
        <div className="settinginputs">
          <div className="settingName">
            <img src={prof} alt="" />
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="settingName">
            <img src={prof} alt="" />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              style={{
                WebkitTextSecurity: toggle.email ? "disc" : "none", // Mask or show
                MozTextSecurity: toggle.email ? "disc" : "none", // For Firefox
                textSecurity: toggle.email ? "disc" : "none", // Fallback
              }}
              placeholder="Update Email"
            />
            <img
              onClick={() => handleToggle("email")}
              className="hide"
              src={toggle.email ? hide : seen}
              alt=""
            />
          </div>
          <div className="settingName">
            <img src={prof} alt="" />
            <input
              onChange={handleChange}
              name="oldpass"
              type={toggle.oldpass ? "password" : "text"}
              placeholder="Old Password"
            />
            <img
              onClick={() => handleToggle("oldpass")}
              className="hide"
              src={toggle.oldpass ? hide : seen}
              alt=""
            />
          </div>
          <div className="settingName">
            <img src={prof} alt="" />
            <input
              onChange={handleChange}
              name="newpass"
              type={toggle.newpass ? "password" : "text"}
              placeholder="New Password"
            />
            <img
              onClick={() => handleToggle("newpass")}
              className="hide"
              src={toggle.newpass ? hide : seen}
              alt=""
            />
          </div>
        </div>
        <button type="submit"> Update </button>
      </form>

      <div onClick={handleLogout} className="logoutsetting">
        <img src={logout} alt="" />
        <span>Log out</span>
      </div>
    </div>
  );
};

export default Setting;
