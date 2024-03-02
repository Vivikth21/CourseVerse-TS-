import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { Typography } from '@mui/material';
// import AppBars from './AppBars';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/user';
import { signupParams } from '@vivikth21/packages';


function Signup(){
    
    const  [putUsername,setUsername] = useState('');
    const [putPassword,setPassword] = useState('');
    const setUser = useSetRecoilState(userState)
    const navigate = useNavigate();

    const handleUsername = (event : React.ChangeEvent<HTMLInputElement>)=>{
      setUsername(event.target.value)
    }
    const handlePassword = (event: React.ChangeEvent<HTMLInputElement>)=>{
      setPassword(event.target.value)
    }

    const handleSignup = ()=>{
      if(putUsername.trim() === '' || putPassword.trim()===''){
        alert("Empty Username or Password")
        return
      }

      const newSignup: signupParams = {
        username: putUsername,
        password: putPassword
      }

      axios.post("http://localhost:3000/admin/signup",newSignup).then(response=>{
        localStorage.setItem('token',response.data.token)
        setUser({
          isLoading:false,
          userEmail:putUsername
        })
        console.log(response.data)
        alert("Signed up successfully")
        navigate('/admindash')
        setUsername('')
        setPassword('')
      }).catch(()=>{
        alert("User already exists,kindly login")
        setUsername('')
        setPassword('')
      })
    }

    return(
        <div>
        
        
        <div style={{marginTop:150,color:"white"}}>
            <center>
                <h3><b>Welcome to CourseVerse. Signup below</b></h3>
            </center>
        </div>
        <div>
        <center>
          <Card variant='outlined' style={{width:350, height:235,marginTop:50,borderColor:"black",backgroundColor:"#26262e"}}>
            <CardContent style={{display: "flex", flexDirection:"column", alignItems:"flex-start"}}>
            <TextField id="outlined-basic" label="Username" variant="outlined" style={{width:"100%",backgroundColor:"white"}}
            value={putUsername}
            onChange={handleUsername}
            />
            <br></br>
            
            <TextField id="outlined-password" label="Password" type="password" variant="outlined" style={{width:"100%",backgroundColor:"white"}}
            value = {putPassword}
            onChange={handlePassword}
            />
            <br></br>
            <Button variant="contained" sx={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)',color: 'white'}}
            onClick={handleSignup}
            >SignUp</Button>
                    
            </CardContent>
          </Card>
        </center>
          
        </div>
        </div>
    )
}

export default Signup;