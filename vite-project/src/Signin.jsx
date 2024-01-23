import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import AppBars from './AppBars';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';

function Signin(){
        
    const  [putUsername,setUsername] = useState();
    const [putPassword,setPassword] = useState();
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate()

    const handleUsername = (event)=>{
      setUsername(event.target.value)
    }
    const handlePassword = (event)=>{
      setPassword(event.target.value)
    }

    const handleSignin = ()=>{
      if(putUsername.trim() === '' || putPassword.trim()===''){
        alert("Empty Username or Password")
        return
      }
      
      axios.post('http://localhost:3000/admin/login',{},{
        headers:{
            username: putUsername,
            password: putPassword
        }
      }).then(response=>{
        localStorage.setItem('token',response.data.token)
        setUser({
          isLoading:false,
          userEmail:putUsername
        })
        alert("Signed in successfully")
        navigate('/admindash')
        setUsername('')
        setPassword('')
      }).catch(error=>{
        alert("Invalid Username or Password")
        setUsername('')
        setPassword('')
      })
    }
    return(
        <div>
        
        <div style={{marginTop:150,color:"white"}}>
            <center>
                <h3><b>Welcome Back. SignIn below</b></h3>
            </center>
        </div>
        <div>
        <center>
          <Card variant='outlined' style={{width:350, height:235,marginTop:50,borderColor:"black",backgroundColor:"#26262e"}}>
            <CardContent style={{display: "flex", flexDirection:"column", alignItems:"flex-start"}}>
            <TextField value={putUsername} onChange={handleUsername} id="outlined-basic" label="Username" variant="outlined" style={{width:"100%",backgroundColor:"white"}}/>
            <br></br>
            
            <TextField value={putPassword}  onChange={handlePassword} id="outlined-password" label="Password" type="password" variant="outlined" style={{width:"100%",backgroundColor:"white"}}/>
            <br></br>

            <Button onClick={handleSignin} variant="contained" sx={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)',color: 'white'}}>SignIn</Button>
                    
            </CardContent>
          </Card>
        </center>
          
        </div>
        </div>
    )
}

export default Signin;