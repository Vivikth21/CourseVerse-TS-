import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CardActionArea, CardContent } from '@mui/material';
import { Button, Card, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

function SpecificCourse(){
    const { courseId } = useParams();
    

    const [course,setCourse] = useState();
    useEffect(()=>{
      axios.get("http://localhost:3000/admin/courses",{
        headers:{
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    }).then(response=>{
        console.log(response)
        console.log(response.data.courses)
        const courses = response.data.courses;
        const specificCourse = courses.find(c=>c._id.toString()===courseId);
        console.log(specificCourse)
        if(specificCourse){
            setCourse(specificCourse)
        }else{
            console.log("Course not found")
        }
    }).catch(error=>{
        alert("Error")
        console.log("Error "+error)
    })
   },[]) 

   return(
    <div>
        {course && (
            <div>
                <Card variant="outlined" style={{width:"100vw",marginTop:30,backgroundColor:"#282c33",overflow:"hidden"}}>
                    <div style={{display:"flex",justifyContent:"space-evenly"}}>
                        <div style={{marginRight:600}}>
                            <Typography style={{color:"white",fontSize:80,marginLeft:20}}>{course.title}</Typography>
                     
                            <Typography style={{color:"white",marginLeft:20,fontSize:25}}>{course.description}</Typography>
                            
                            <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
                            <AvatarGroup max={2} sx={{height:5,width:5,paddingLeft:12,paddingTop:10}}>
                                <Avatar>V</Avatar>
                                <Avatar>C</Avatar>
                            </AvatarGroup>
                            <Typography style={{ color: "white", marginLeft: 10, fontSize: 15 ,marginTop:120}}>Instructors: <u>Vivikth Erapalli</u> +<b>1more</b></Typography>
                            </div>


                            
                            
                            <Card variant="outlined" style={{height:60,width:200,backgroundColor:"#236d8c",marginLeft:10,marginBottom:10,paddingLeft:5,marginTop:150}}>
                                <CardContent style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                    
                                    <Typography style={{color:"white",fontSize:20}}><center>Published</center></Typography>

                                </CardContent>
                            </Card>
                        </div>

                        <div style={{marginRight:10,marginTop:10}}>
                            <Card variant="outlined" style={{height:350,width:400,alignContent:"left",backgroundColor:"#989a9e",marginRight:20}}>
                                <img src={course.imageLink} style={{height:250,width:400}}></img>
                                <br></br>
                                <Chip label="Certificate available" style={{backgroundColor:"#513f9e",color:"white"}} />
                                <Chip label="40 hours(approximately)" style={{backgroundColor:"#1919b3",color:"white"}} />
                                <Chip label="Flexible" style={{backgroundColor:"#c22d48",color:"white"}} />
                                <br></br>
                                <br></br>
                                <Chip label="Study Material and Resources are available" style={{backgroundColor:"#115e80",color:"white"}} />

                                
                            </Card>
                            
                            <br></br>
                            <Card variant="outlined" style={{height:60,width:175,backgroundColor:"#155094"}}>
                                <Typography style={{color:"white",fontSize:18,margin:15}}><center>INR {course.price}</center></Typography>
                            </Card>
                        </div>
                    </div>
                </Card>

            </div>
        )}
        
    </div>
   )
}
export default SpecificCourse;