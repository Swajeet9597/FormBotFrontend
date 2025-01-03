import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Form from './pages/Form/Form'
import { ToastContainer, toast } from 'react-toastify';
import { DataProvider } from './context/context'
import Setting from './pages/SettingPage/Setting'
import SharePage from './pages/SharePage/SharePage'
import Submitform from './pages/Submitform/Submitform'
import SuccessFull from './pages/SuccessFull/SuccessFull'
import Response from './pages/Response/Response'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <>
<ToastContainer />
  <BrowserRouter>
   <DataProvider>
       <Routes>
         <Route path='/' element={<App/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/signup' element={<Signup/>} />
         <Route path='/dashboard/:params' element={<Dashboard/>} />
         <Route path='/dashboard/:anotherworkspace/:params' element={<Dashboard/>} />
         <Route path='/form/:params/:formName' element={<Form/>} />
         <Route path='/:anotherworkspace/form/:params/:formName' element={<Form/>} /> 
         <Route path='/form/:params/:formName/response' element = {<Response/>} />
         <Route path='/:anotherworkspace/form/:params/:formName/response' element={<Response/>} />     
         <Route path='/dashboard/setting' element={<Setting/>}/>
         <Route path='/Share/:userId' element={<SharePage/>} />
         <Route path='/:userId/:params/:formName' element ={<Submitform/>} />
         <Route path='/:userId/:params/:formName/success' element={<SuccessFull/>} />
       </Routes>
   </DataProvider>
  </BrowserRouter>       
    </>
  // </StrictMode>
)




