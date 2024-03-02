import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { Button,Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function AdmDash(){
    const navigate = useNavigate()
    return(
        <div style={{width:"100vw",height:"100vh",background:'linear-gradient(45deg,#0c0e14 20%, #1b1e28 80%)',color:"white"}}>
          <div style={{display:"flex",alignItems:"center", justifyContent:"flex-start" ,marginLeft:10}}>
            <div>
                <HomeIcon sx={{ color: 'white'}} />
            </div>

            <div style={{marginLeft:10,color:'#bfa691'}}>
                <h3>ADMIN DASHBOARD</h3>
            </div>

        </div>
          <div style={{alignItems:"center",marginLeft:70}}>
                <br></br>
                <br></br>
            <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
                    <div style={{ height: 100, width: 5, backgroundColor: '#14c9c0', marginRight: 10 }}></div>
                        <Card variant="outlined" style={{height:100, width:500,backgroundColor:"#26262e"}} >
                            <CardContent>
                                <Typography style={{color:"white"}}><center>CLICK HERE TO VIEW YOUR COURSES</center></Typography>
                                    <center> <Button variant="contained" onClick={()=>{
                                        navigate('/admin/viewCourse')
                                    }} style={{height:40,width:200,margin:10}}>VIEW COURSE</Button></center>
                             </CardContent>
                        </Card>
                </div>

                <br></br>
               
                <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
                    <div style={{ height: 100, width: 5, backgroundColor: '#dbd24b', marginRight: 10 }}></div>
                        <Card variant="outlined" style={{height:100, width:500,backgroundColor:"#26262e"}} >
                            <CardContent>
                                <Typography style={{color:"white"}}><center>CLICK HERE TO ADD A NEW COURSE</center></Typography>
                                     <center><Button variant="contained" onClick={()=>{
                                        navigate('/admin/createCourse')
                                     }} style={{height:40,width:200,margin:10}}>ADD COURSE</Button></center>
                            </CardContent>
                        </Card>
                </div>
                
                <br></br>
               
                <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
                    <div style={{ height: 100, width: 5, backgroundColor: '#651dad', marginRight: 10 }}></div>
                        <Card variant="outlined" style={{height:100, width:500,backgroundColor:"#26262e"}} >
                            <CardContent>
                                <Typography style={{color:"white"}}><center>CLICK HERE TO EDIT YOUR COURSES</center></Typography>
                                    <center><Button variant="contained" style={{height:40,width:200,margin:10}} onClick={()=>{
                                        navigate('/admin/editCourse')
                                    }}>EDIT COURSE</Button></center>
                            </CardContent>
                        </Card>
                </div>

                <br></br>

                <div style={{display:"flex",alignItems:"center",marginBottom:20}}>
                    <div style={{ height: 100, width: 5, backgroundColor: '#db3553', marginRight: 10 }}></div>
                        <Card variant="outlined" style={{height:100, width:500,backgroundColor:"#26262e"}} >
                            <CardContent>
                                <Typography style={{color:"white"}}><center>CLICK HERE TO DELETE YOUR COURSE</center></Typography>
                                     <center><Button variant="contained" style={{height:40,width:200,margin:10}}>DELETE COURSE</Button></center>
                            </CardContent>
                        </Card>
                </div>
            </div>

          </div>

        </div>
    )
}

export default AdmDash;