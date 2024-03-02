import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Typography } from "@mui/material";
import { CardActionArea } from '@mui/material';
// import CardMedia from '@mui/material/CardMedia';
// import SpecificCourse from "./SpecificCourse";
import { Link } from 'react-router-dom';
import { CSSProperties } from "@mui/material/styles/createTypography";

interface courseProps{
  course: {
    _id:string;
    title:string;
    description:string;
    price:string;
    imageLink:string
  }
}
function ViewCourse(){
const [course,setCourse] = useState([]);
   useEffect(()=>{
      axios.get("http://localhost:3000/admin/courses",{
        headers:{
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    }).then(response=>{
      console.log("hello")
        console.log(response)
        console.log("hello")
        console.log(response.data)
        setCourse(response.data.courses)
    }).catch(error=>{
        alert("Error")
        console.log("Error "+error)
    })
   },[]) 

    return(
        <div style={{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
          {course.map(courseItem=>{
            return <Course course = {courseItem}/>
          })}
          
        </div>

    )

    function Course(props:courseProps){

  const buttonStyle :CSSProperties= {
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

        return <Card variant="outlined"  style={{width:300,height:300,margin:20,backgroundColor:"#282c33",borderRadius:15}}>
            <CardActionArea sx={{color:"white"}}>
            
            <Link to={`/course/${props.course._id}`} style={buttonStyle}>
                <Button style={buttonStyle}></Button>
            </Link>
            <img src={props.course.imageLink} style={{width:300,height:200,marginBottom:10}}></img>
            <Typography textAlign={"center"} variant="h6" color={"white"}>{props.course.title}</Typography>
            <Typography textAlign={"center"} variant="body1" color={"white"}>{props.course.description}</Typography>
            
          
            </CardActionArea>
        </Card>
    }

}

export default ViewCourse;