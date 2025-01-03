import React, { useContext, useEffect, useState } from 'react';
import './Response.css'
import Form_Navbar from '../../components/Form_Navbar/Form_Navbar';
import { useParams, useSearchParams } from 'react-router-dom'
import calendar from '../../assets/calendar1.png'
import Chart from '../../components/Chart/Chart';
import { DataContext } from '../../context/context';
import { BASE_URL } from '../../helper/helper';


const Response = () => {

  const params = useParams()

  const [userResponse, setUserResponse] = useState([])
  const [views,setViews] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [bubble,setBubble] = useState([])
  const [starts,setStarts] = useState(0)

  console.log("views",views);
  console.log("completed",completed);
  console.log("starts",starts);

  const getBubble = async(req,res) =>{
    try {
      
      const response = await fetch(`${BASE_URL}/api/user/getFormDataForResponse`,{
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formName: params.formName,
          folderName: params.params,
          anotherUserId: params.anotherworkspace ? params.anotherworkspace : null,
        })
      })

      const data = await response.json();

      if (data.success) {
        // setFormData(data.data)
        console.log("kkkkkkk",data.data);
        const newArr = data.data.filter((item)=> item.type == "buble")
        console.log("newarr",newArr);
        setBubble(newArr)
      }

    } catch (error) {
      console.log(error);
    }
  }

  const getSavedata = async(req,res) =>{
    try {
      
        const response = await fetch(`${BASE_URL}/api/user/getSaveUserResponse`,{
            method:"POST",
            credentials:"include",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify({foldername:params.params, formname: params.formName, anotherUserId: params.anotherworkspace ? params.anotherworkspace : null}) 
        })

        const data = await response.json()

        if(data.success){
          setUserResponse(data.data.userResponses)
          setViews(data.data.views)
          setCompleted(data.data.completed)
          setStarts(data.data.starts)
        }

    } catch (error) {
      console.log(error);
    }
  }

  const {lightMode} = useContext(DataContext)

  console.log(userResponse)

  useEffect(()=>{
    getBubble()
    getSavedata()
  },[])

  return (
    <div style={{backgroundColor: lightMode ? "white" : ""}} className='responsePage' >
        <Form_Navbar/>

        <div className='viewandstart' >
            <div style={{backgroundColor: lightMode ? "white" : "", border:"1px", borderStyle: "solid", borderColor: "#444"}} className="viewandstartbox">
                <span style={{color: lightMode ? "black" : ""}} >Views</span>
                <span style={{color: lightMode ? "black" : ""}} >{views}</span>
            </div>
            <div style={{backgroundColor: lightMode ? "white" : "", border:"1px", borderStyle: "solid", borderColor: "#444"}} className="viewandstartbox">
                <span style={{color: lightMode ? "black" : ""}}>Starts</span>
                <span style={{color: lightMode ? "black" : ""}}>{starts}</span>
            </div>
        </div>
<div style={{display: "flex", flexDirection:"column", width: "100%", justifyContent:"center"}} >



        <div style={{color: lightMode ? "black" : ""}} className="responseTable table-container">
        <div className="table-wrapper">
            <table  className="custom-table" >

              <thead>
                <tr>
                  <th  className="first-column"></th>
                  <th> <img width={15} src={calendar} alt="" /> <span style={{marginLeft: "5px"}} >Submitted at</span> </th>
                  {bubble.map((item,index)=>(
                      <th key={index}>{item.value}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {userResponse.map((row,index)=>(
                  <tr key={index} >
                    <td>{index+1}</td>
                    {row.map((data,index)=>(
                        <td key={index} >{data}</td>
                    ))}
                 
                  {/* <td>Jul 17, 03.23 PM</td>
                  <td>Hihhhhhhhhhhhhhhhhh</td>
                  <td>S@gmail.com</td>
                  <td>alpha</td>
                  <td>App</td>
                  <td>5</td> */}
                </tr>
                ))}
                

                {/* <tr>
                  <td>1</td>
                  <td>Jul 17, 03.23 PM</td>
                  <td>Hihhhhhhhhhhhhhhhhh</td>
                  <td>S@gmail.com</td>
                  <td>alpha</td>
                  <td>App</td>
                  <td>5</td>
                </tr> */}
{/* 
                <tr>
                  <td>1</td>
                  <td>Jul 17, 03.23 PM</td>
                  <td>Hihhhhhhhhhhhhhhhhh</td>
                  <td>S@gmail.com</td>
                  <td>alpha</td>
                  <td>App</td>
                  <td>5</td>
                </tr>

                <tr>
                  <td>1</td>
                  <td>Jul 17, 03.23 PM</td>
                  <td>Hihhhhhhhhhhhhhhhhh</td>
                  <td>S@gmail.com</td>
                  <td>alpha</td>
                  <td>App</td>
                  <td>5</td>
                </tr> */}


              </tbody>

            </table>
            </div>
        </div>
        <div className='pieCharttt' >

            <Chart completed={33} total={100}/>
            <div style={{backgroundColor:lightMode ? "white" : "", border:"1px", borderStyle: "solid", borderColor: "#444" }} className="completed">
                <span style={{color: lightMode ? "black" : ""}}>Completion rate</span>
                <span style={{color: lightMode ? "black" : ""}}>{  Math.ceil(completed/views*100) || 0}%</span>
            </div>
            <div className='cokm' ><span style={{color: lightMode ? "black" : ""}}>Completed</span> <span style={{color: lightMode ? "black" : ""}}>{completed}</span> </div>
        </div>

        </div>


        
       

    </div>
  );
}

export default Response;
