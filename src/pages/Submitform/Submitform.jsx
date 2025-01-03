import React, { useContext, useEffect, useState } from "react";
import "./Submitform.css";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../helper/helper";
import circle from "../../assets/circle.png";
import sendmessage from "../../assets/sendmessage.png";
import { DataContext } from "../../context/context";

const Submitform = () => {

  const params = useParams()
  const [formData, setFormData] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [steps, setSteps] = useState([])
  const [responses, setResponses] = useState({})
  const [currentInput, setCurrentInput] = useState("")
  const [toggle,setToggle] = useState(true)

  const {lightMode} = useContext(DataContext)

  let arr = []


  const [rating, setRating] = useState(0);

  const navigate = useNavigate()

//   let [bubble,setBubble] = useState([])

  let bubble = []

  const handleInputChange = (e) => {
    if(currentStepIndex == 0 && toggle){
      if(currentStepIndex == 0){

        // console.log("starts");

         const addstart = fetch(`${BASE_URL}/api/user/addStarts`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({folderName: params.params, formName:params.formName, userId:params.userId})
         })
         
      }
      setToggle(false)
      // console.log("startsssss");
    }
    setCurrentInput(e.target.value)
  }

  // console.log("ratinggggg",rating);

  const handleRatingChange = (value) => {

    console.log(value)
    setResponses((prev)=>({
      ...prev,
      [[currentStepIndex]]: value.toString()
    }))
    setRating(value)

    setCurrentInput("")
  };

  const handleSubmit = async(e,value) => {
    e.preventDefault();

    if (currentInput.trim()) {
      setResponses((prev) => ({
        ...prev,
        [currentStepIndex]: currentInput, 
      }));
      setCurrentInput("")
      setCurrentStepIndex((prev) => prev + 1)
    } else {
        if(value == "Buttons"){
          navigate(`/${params.userId}/${params.params}/${params.formName}/success`)
          let dateandtime ="";
          // console.log("arrrrr",arr);
    
        const formatDateTime = () => {
          const now = new Date();
          const options = { month: "short", day: "numeric" }
          const formattedDate = now.toLocaleDateString("en-US", options);
          const formattedTime = now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
  
          dateandtime = `${formattedDate}, ${formattedTime}`
        }

        formatDateTime()

         

        // console.log("arrrrr",arr);

        try {

          arr = Object.values(responses)
          arr.unshift(dateandtime)
          
        const response = await fetch(`${BASE_URL}/api/user/saveUserResponse`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type" : "application/json",
          },
          body: JSON.stringify({arr:arr, folderName: params.params, formName:params.formName, userId:params.userId })
        })

        const reduceStart = fetch(`${BASE_URL}/api/user/reduceStarts`,{
          method:"POST",
          credentials:"include",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({folderName: params.params, formName:params.formName, userId:params.userId})
         })
       
          
        } catch (error) {
            console.log(error);
        }



        }else{
          if(value == "Rating"){
            setCurrentStepIndex((prev) => prev + 1)

          }else{

            alert("Please enter a response.")
          }
        }
    }
  }

  const addViews = async(req,res)=>{
    try {
      
      
        const response = await fetch(`${BASE_URL}/api/user/addViews`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formName: params.formName,
            folderName: params.params,
            anotherUserId: params.anotherworkspace ? params.anotherworkspace : params.userId,
          }),
        })

    } catch (error) {
    console.log(error);   
    }
  }

  const getFormData = async () => {
    const response = await fetch(`${BASE_URL}/api/user/getFormDataForSubmit`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formName: params.formName,
        folderName: params.params,
        anotherUserId: params.anotherworkspace ? params.anotherworkspace : params.userId,
      }),
    })

    const data = await response.json();

    if (data.success) {
      setFormData(data.data)
    }
  };

  function convertToSteps(items) {
    const steps = []
    let currentStep = { bubbles: [], input: null }

    items.forEach((item) => {
      if (item.type === "buble") {
        // Add bubble to the current step
        currentStep.bubbles.push(item)
      } else if (item.type === "input") {
        // Assign the input and complete the current step
        currentStep.input = item
        steps.push(currentStep)
        // Reset for the next step
        currentStep = { bubbles: [], input: null }
      }
    });
    setSteps(steps)
  }

  // console.log(responses);
  // console.log("currenttimedate",arr);

  useEffect(() => {
    getFormData();
    addViews()
  }, [])

  useEffect(() => {
    convertToSteps(formData);
  }, [formData])


  return (
    <div className="SubmitFormPage">
      <div className="formresponsett">
        {steps.slice(0, currentStepIndex + 1).map((step, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            {/* Render Bot Bubbles */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {step.bubbles.map((bubble, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "#F7F8FF",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "10px",
                    maxWidth: "80%",
                  }}
                >
                  {bubble.type === "buble" && bubble.name === "Text" && (
                    <span>{bubble.value}</span>
                  )}
                  {bubble.type === "buble" && bubble.name === "Image" && (
                    <img
                      src={bubble.value}
                      alt="bubble"
                      style={{ width: "300px" }}
                    />
                  )}
                </div>
              ))}

              {/* Render User Response */}
              {responses[index] && (
                <div
                  style={{
                    backgroundColor: "#FF8E21",
                    color: "white",
                    padding: "10px",
                    borderRadius: "8px",
                    alignSelf: "flex-end", // Align to the right
                    marginBottom: "10px",
                    maxWidth: "80%",
                  }}
                >
                  {responses[index]}
                </div>
              )}
            </div>

            {/* Render Input */}
            {index === currentStepIndex && step.input && (
              <form
                onSubmit={(e)=>handleSubmit(e,step.input.name)}
                style={{ display: "flex", gap: "10px", marginTop: "20px" }}
              >
                {step.input.name === "Buttons" ? <></> : step.input.name === "Rating" ? 
                  <div style={{width: "100%", display: "flex", alignItems:"center"}} >
                       {[1, 2, 3, 4, 5].map((num) => (
                                <button
                                // box-shadow: 0px 4px 6.3px 0px #00000040;
                                type="button"
                                  key={num}
                                  onClick={() => handleRatingChange(num)}
                                  style={{
                                    backgroundColor: rating === num ? '#FF8E21' : '#1A5FFF',
                                    color: '#FFFFFF',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    boxShadow: "0px 4px 6.3px 0px #00000040",
                                    marginRight: "2rem"
                                  }}
                                >
                                  {num}
                                </button>
                              ))}
                  </div> :   <input
                  type= { 
                    step.input.name === "Email"
                    ? "email"
                    : step.input.name === "Text"
                    ? "text"
                    : step.input.name === "Number"
                    ? "number"
                    : step.input.name === "Date"
                    ? "date"
                    : step.input.name === "Phone"
                    ? "number"
                    : "text" // Default type
                        }
                  className="sendBtn"
                  value={currentInput} // Use temporary input value
                  onChange={handleInputChange}
                  placeholder=  "Enter your response"
                //   
                  style={{
                    width: "5rem",
                    padding: "10px",
                    border: "0px solid #ccc",
                    borderRadius: "5px",
                    flex: "1",
                  }}
                />}
                 {step.input.name === "Buttons" ?  <button
                  type="submit"
                  className="sendBtn senBTN sendBtnnn"
                  // style={{
                  //   padding: "10px 20px",
                  //   backgroundColor: "#0042DA",
                  //   color: "white",
                  //   border: "none",
                  //   borderRadius: "5px",
                  //   cursor: "pointer",
                  //   display: "flex",
                  //   justifyContent: "center",
                  //   alignItems: "center",
                  // }}
                >
                  {/* <img src={sendmessage} alt="" /> */}
                 {step.input.value}
                </button>  : <button
                  type="submit"
                  className="sendBtn"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#0042DA",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src={sendmessage} alt="" />
              
                </button> }
               
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submitform;
