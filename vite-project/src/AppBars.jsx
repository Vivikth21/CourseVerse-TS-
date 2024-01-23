import AppBar from '@mui/material/AppBar';
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { isUserLoading } from '../store/selectors/isUserLoading';
import { userState } from '../store/atoms/user';
import { useNavigate } from 'react-router-dom';


function AppBars(){
    const navigate = useNavigate()
    // const [userEmail,setUserEmail] = useState(null)
    const userEmail = useRecoilValue(userEmailState);
    const userLoading = useRecoilValue(isUserLoading)
    const setUser = useSetRecoilState(userState)
    
        if(userEmail){
            return(
       
                <div style={
                    {
                        display:'flex',
                        justifyContent:"space-between",
                        backgroundColor:"black",
                        height:50
                    }
                }>
                    <div style={{marginLeft:10}}>
                        <Button onClick={()=>{
                             navigate("/")
                        }}>
                       <Typography variant= "h5" sx={{backgroundImage:'linear-gradient(45deg,#43a892 40%,#173c63 80%)',
                WebkitBackgroundClip: 'text',color: 'transparent'}}>CourseVerse</Typography>
                </Button>
                </div>
                <div style={{display:"flex",justifyContent:"flex-end",marginTop:10,marginRight:10}}>
                    <div style={{color:"white",marginRight:15}}>
                        <Button variant='contained' style={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)'}} onClick={()=>{
                            navigate('/admindash')
                        }}>Admin Dashboard</Button>
                    </div>
                    <div>
                    
                    <Button variant='contained' onClick={()=>{
                        localStorage.setItem('token',null)
                        setUser({
                            isLoading:false,
                            userEmail:null
                        })
                        navigate('/signup')
                    }} style={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)'}}>Logout</Button>
                    </div>
                </div>
                </div>
             
            )
        }

    return(
       
        <div style={
            {
                display:'flex',
                justifyContent:"space-between",
                backgroundColor:"black",
                height:50
            }
        }>
            <div style={{marginLeft:10}}>
                <Button onClick={()=>{
                    navigate("/")
                }}>
               <Typography variant= "h5" sx={{backgroundImage:'linear-gradient(45deg,#43a892 40%,#173c63 80%)',
        WebkitBackgroundClip: 'text',color: 'transparent'}}>CourseVerse</Typography>
        </Button>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end",marginTop:10,marginRight:10}}>
            <div style={{marginRight:10}}>
            <Button variant='contained' onClick={()=>{
                window.location = '/signin'
            }} style={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)'}}>SignIn</Button>
            </div>
            <div>
            
            <Button variant='contained' onClick={()=>{
                navigate('/signup')
            }} style={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)'}}>SignUp</Button>
            </div>
        </div>
        </div>
     
    )
}

export default AppBars;