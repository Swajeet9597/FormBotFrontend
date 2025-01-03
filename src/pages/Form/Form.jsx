import React, { useContext, useEffect, useState } from 'react';
import './Form.css'
import { useParams } from 'react-router-dom';
import Form_Navbar from '../../components/Form_Navbar/Form_Navbar';
import { DataContext } from '../../context/context';
import Text from '../../assets/textBubble.png'
import imgbubble from '../../assets/imgbubble.png'
import video from '../../assets/video.png'
import GIFd from '../../assets/GIF.png'
import T from '../../assets/T.png'
import hash from '../../assets/hash.png'
import aThe from  '../../assets/aThe.png'
import phone from '../../assets/phone.png'
import btn from '../../assets/btn.png'
import Star from '../../assets/Star.png'
import date from '../../assets/date.png'
import flag from '../../assets/flag.png'
import Textt from '../../assets/Textt.png'
import deleteTag from '../../assets/deleteTag.png'
import dele from '../../assets/lightModedelete.png'
import { toast } from 'react-toastify';
import { BASE_URL } from '../../helper/helper';


const Form = () => {


    const {lightMode} = useContext(DataContext)

    const params = useParams()

    const [formData,setFormData] = useState([])

    const getFormData = async()=>{
        const response = await fetch(`${BASE_URL}/api/user/getFormData`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({formName:params.formName, folderName:params.params, anotherUserId: params.anotherworkspace ? params.anotherworkspace : ""})
        })

        const data = await response.json()

        if(data.success){
            setFormData(data.data)
            
        }
    }


    const bubbles = [ 
        {type: "buble", name: "Text", src: Text },
        {type: "buble", name: "Image", src: imgbubble },
        {type: "buble", name: "video", src: video },
        {type: "buble", name: "GIF", src: GIFd },

    ]

    const inputs = [
        {type: "input", name: "Text", src: T },
        {type: "input", name: "Number", src: hash },
        {type: "input", name: "Email", src: aThe },
        {type: "input", name: "Phone", src: phone },
        {type: "input", name: "Date", src: date },
        {type: "input", name: "Rating", src: Star },
        {type: "input", name: "Buttons", src: btn }
    ]

    const [count,setCount] = useState(0)

    const [addTag, setAddTag] = useState(true)

    function handleChange(e){

        setAddTag(true)

        const value = e.target.value

        console.log("button id",parseInt(e.target.id));
        console.log("llll",formData.length);
        console.log("ppppp",formData);
     
        // let updatedata = formData.filter(item => item.id === parseInt(e.target.id)) 
        // if(updatedata){

        //     console.log("updatedted>>>>",updatedata);
        //     updatedata[0].value = e.target.value
        // }

        const updatedData = formData.map((tag, idx) =>
        idx === parseInt(e.target.id) ? { ...tag, value } : tag
      );
    
      setFormData(updatedData);
        

    }

    function hanldeADD(){
        toast.error("Please add bubble text")
    }
    
    function addBubble(e,buble){
        // console.log("length", formData.length);
        // setCount(formData.length)
        
        let addInfo = {}

        console.log();
        if(buble.type === "buble"){

            addInfo = {type: buble.type, name:buble.name, value: "", id:formData.length}
        }
        if(buble.type === "input"){

            addInfo = {type: buble.type, name:buble.name, value: "", id:formData.length}
        }
        // setCount((prev)=> prev+1)

        if(buble.name === "GIF"){
            return console.log("");
        }

        // if(buble.type === "buble"){
        //    addInfo ={type: buble.type, name:buble.name, value: "", id:""}
        // }
        
        if(buble.name === "video"){
            return console.log("");
        }

        console.log("before set", buble);
     
        setFormData((prev)=>
        [...prev, addInfo ]
       )

      
        
        if(buble.type === "buble" && buble.name === "Text"){
       
            return setAddTag((prev)=>!prev)
        }

    }

    function handleDeleteTag(e,index){
        console.log("delete count", count);
        console.log("INDEX",index);
        // const newData = formData.filter(item=> item.id != index)
        // console.log(";;;;;;",newData);
        // const newDataWithNewId = newData.map((item,index)=> ({...item, id: index}))             
        // setFormData(newDataWithNewId)

        const newData = formData.filter((_, idx) => idx !== index);

        const newDataWithNewId = newData.map((item, idx) => ({
            ...item,
            id: idx,
          }));

        setFormData(newDataWithNewId);

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
  
    function handleViewMode(){

    }
    console.log("save data",formData);
                      

  useEffect(() => {
    document.body.style.backgroundColor = lightMode ? "white" :  "#1F1F23";
  }, [lightMode]); 

  useEffect(()=>{
    const newDataWithNewId = formData.map((item,index)=> ({...item, id: index}))  
    console.log("xxxxxxxxx",newDataWithNewId);            
    // setFormData(newDataWithNewId)
  },[formData,hanldeADD])

  useEffect(()=>{
    console.log("getting....");
    getFormData()
    getUserMode()
  },[])

  useEffect(() => {
    console.log("Updated count:", count);
  }, [count]);


  return (

    <div style={{backgroundColor: lightMode ? "white" : ""}} className='FormPage' >




        <Form_Navbar formData={formData} />




        <div style={{backgroundColor: lightMode ? "white" : null }} className="sideBar">

            <span style={{color: lightMode ? "" : "white", marginBottom: "16px"}}>Bubbles</span>

            <div className="bubblesbox">

                {bubbles.map((buble,index)=>(
                        <div key={index} onClick={ userMode === "View" ? handleViewMode : (e)=>addBubble(e,buble)} className="bubbleChild" style={{backgroundColor: lightMode ? "white" : null, borderColor: lightMode ? "#D6D6D6" : null}}>
                          <img src={buble.src} alt="" /> 
                          <span style={{color: lightMode ? "black" : "#FFFFFFEB", fontSize: "14px"}} >{buble.name}</span>
                      </div>
                ))}

            </div>
            {/* onClick={addTag ?(e)=>addBubble(e,input) : hanldeADD} */}
            
            <span style={{color: lightMode ? "" : "white", marginBottom: "16px",marginTop : "16px"}}>Inputs</span>

            <div className="bubblesbox">
                
                {inputs.map((input,index)=>(
                     <div key={index} onClick={ userMode === "View" ? handleViewMode : (e)=>addBubble(e,input)}  className="bubbleChild"  style={{backgroundColor: lightMode ? "white" : null, borderColor: lightMode ? "#D6D6D6" : null}} >
                     <img src={input.src} alt="" />
                     <span style={{color: lightMode ? "black" : "#FFFFFFEB", fontSize: "14px"}} >{input.name}</span>
                 </div>
                ))}

            </div>

        </div>



        <div style={{borderColor : lightMode ? "#D6D6D6" : null, backgroundColor: lightMode ? "white" : null, borderStyle: lightMode ? "solid" : null  }} className="startForm">
            <img src={flag} alt="" />
            <span style={{fontSize: "20px", color: lightMode ? "black" : "white"}} >Start</span>
        </div>


    
            {formData.map((tag,index)=>(
                
                <div id={index}  key={index} style={{border: lightMode ? "1px" : "0px", borderStyle: lightMode ? "solid" : "", borderColor: lightMode ? "#D6D6D6" : ""}} className={lightMode ? "formTagLight" : "formTag"}>
                    
                    <img style={{display : userMode === "View" ? "none" : ""}} onClick={(e)=>handleDeleteTag(e,index)} className='delTag' src={lightMode ? dele :deleteTag} alt="" />
                     <span style={{color: lightMode ? "black" : "#FFFFFF", fontSize: "20px", display: tag.type === "buble" ? "" : "none"}}>{tag.name}</span>
                     <span style={{color: lightMode ? "black" : "#FFFFFF", fontSize: "20px", display: tag.type === "input" ? "" : "none"}}> Input {tag.name}</span>
                     <div style={{display: tag.type === "input" ? "none" : "", backgroundColor: lightMode ? "white" : "", border:"1px", borderStyle:"solid", borderColor:"#F55050"}} className="tagInput">
                        <img style={{display : tag.name === "Text" ? "" : "none",marginLeft: "16px"}} width={25} src={Textt} alt="" />
                        <input id={`${index}`} value={tag.value || ""} onChange={handleChange} style={{backgroundColor: lightMode ? "white" : "#1F1F23", color: lightMode ? "" : "white" ,border:"none",marginLeft: tag.name === "Text" ? "" : "5%", width: tag.name === "Text" ? "75%" : "74%"}} type="text" placeholder={tag.name === "Text" ? 'Click here to edit' : "Click to add link"} />
                    </div>
                    <div  style={{display: tag.type === "input" ? "" : "none", color: "white"}} className="hint">
                
                        <span style={{fontSize: "12px", color: "#555555"}} >
                            {tag.name === "Text" ?  <> Hint : User will input a text on his form </> : null}
                            {tag.name === "Rating" ? <span>Hint : User will tap to rate out of 5</span> : null}
                            {tag.name === "Number" ? <span>Hint : User will input a number on his form</span> : null}
                            {tag.name === "Email" ? <span>Hint : User will input a email on his form</span> : null}
                            {tag.name === "Date" ? <span>Hint : User will select a date</span> : null}
                            {tag.name === "Phone" ? <span>Hint : User will input a phone on his form</span> : null}
                            {tag.name === "Buttons" ?<input id={`${index}`} value={tag.value || ""} onChange={handleChange} style={{backgroundColor: "#1F1F23",color: lightMode ? "" : "white",fontSize: "16px",  border:"none",width:"100%", padding:"12px 0" }} type="text" placeholder="Enter Button Name" />: null}
                        </span>
                        
                    </div>
                </div>
            ))} 





    </div>
  );
}

export default Form;
