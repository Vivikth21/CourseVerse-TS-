import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AppBars from "./AppBars"
import Signup from "./Signup"
import Signin from "./Signin";
import Landing from "./Landing";
import AdmDash from "./AdmDash";
import AddCourse from "./AddCourse";
import ViewCourse from "./ViewCourse";
import SpecificCourse from "./SpecificCourse";
import EditCourse from "./EditCourse";
import Course from "./Course";
import axios from "axios";
import {
  RecoilRoot,
  useSetRecoilState
} from 'recoil';
import './index.css';
import './App.css';
import { useEffect } from "react";
import { userState } from "../store/atoms/user";


function App() {


  return (
    <RecoilRoot>
    <div style={{width:"100vw",minHeight:"100vh",background:'linear-gradient(45deg,#0c0e14 20%, #1b1e28 80%)'}}>
    <Router>
    <AppBars/>
    <InitUser/>
    
      <Routes>
        <Route path="/admin/editCourse/:courseId" element = {<Course/>} />
         <Route path="/admin/editCourse" element = {<EditCourse/>} />
         <Route path="/course/:courseId" element={<SpecificCourse/>} />
         <Route path="admin/viewCourse" element={<ViewCourse/>} />
         <Route path="/admin/createCourse" element = {<AddCourse/>} />
         <Route path="/admindash" element= {<AdmDash/>} />
         <Route path = "/" element = {<Landing/>} />
         <Route path = "/signin" element = {<Signin/>} />
         <Route path = "/signup" element = {<Signup/>} />
      </Routes>
    </Router>
    
    
  </div>
  </RecoilRoot>
  )
}
function InitUser(){

  const setUser = useSetRecoilState(userState)
  const init = async()=>{
    try{
        const response = await axios.get('http://localhost:3000/admin/me', {
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
          }
      })
      if(response.data.username){
        setUser({
          isLoading:false,
          userEmail:response.data.username
        })
      }
      else{
        setUser({
          isLoading:false,
          userEmail:null
        })
      }
    }catch(e){

      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  }

  useEffect(()=>{
    init()
  },[])

  return <></>
}

export default App
