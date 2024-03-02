import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import { CardActionArea } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
// import SpecificCourse from "./SpecificCourse";
import { useNavigate } from 'react-router-dom';
import { CSSProperties } from "@mui/material/styles/createTypography";

const navigate = useNavigate();
function DeleteCourse(){
const [course,setCourse] = useState([]);
   useEffect(()=>{
      axios.get("http://localhost:3000/admin/courses",{
        headers:{
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    }).then(response=>{
        console.log(response)
        setCourse(response.data.courses)
    }).catch(error=>{
        alert("Error")
        console.log("Error "+error)
    })
   },[]) 

    return(
    <div>
        <div style={{color:"white"}}>
            <h2><center><b>CLICK ON THE COURSE TO DELETE</b></center></h2>
        </div>
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center",color:"white"}}>
          {course.map((courseItem)=>{
            return <Course course = {courseItem}/>
          })}
          
        </div>
    </div>

    )
    interface courseProps{
        course:{
            _id:string;
            title:string;
            description:string;
            imageLink: string;
            price: string;
        }
    }

    function Course(props:courseProps){

  const buttonStyle:CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    zIndex: 1,
  };

        return <Card variant="outlined"  style={{width:300,height:300,margin:20,backgroundColor:"#282c33"}}>
            <CardActionArea sx={{color:"white"}}>
            

                <Button style={buttonStyle} onClick={()=>{
                    navigate(`/admin/editCourse/${props.course._id}`)
                }}></Button>

            <img src={props.course.imageLink} style={{width:300,height:200,marginBottom:10}}></img>
            <Typography textAlign={"center"} variant="h6" color={"white"}>{props.course.title}</Typography>
            <Typography textAlign={"center"} variant="body1" color={"white"}>{props.course.description}</Typography>
            
          
            </CardActionArea>
        </Card>
    }

}

export default DeleteCourse;