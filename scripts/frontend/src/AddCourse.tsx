import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
// import { Typography } from '@mui/material';
// import AppBars from './AppBars';
import { useState } from 'react';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { courseParams } from '@vivikth21/packages';


function AddCourse(){
    
    const  [putTitle,setTitle] = useState("");
    const [putDescription,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [price,setPrice] = useState("");
    const [published,setPublished] = useState("");

    const handlePublished = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPublished(event.target.value)
    }
    
    const handlePrice = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setPrice(event.target.value)
    }

    const handleCourse = ()=>{
      if(putTitle.trim() === '' || putDescription.trim()==='' || image.trim()==='' || price.trim()===''){
        alert("Empty Title or Description")
        return
      }
      
      const isPublished = published === "true" ? true : false;

      const newCourse:courseParams = {
        title: putTitle,
        description: putDescription,
        price: price,
        imageLink: image,
        published: isPublished
      }

      axios.post("http://localhost:3000/admin/courses",newCourse,{
        headers:{
            Authorization: "Bearer "+ localStorage.getItem('token')
        }
      }).then(response=>{
        console.log(response.data)
        alert("Course added successfully")
        setTitle('')
        setDescription('')
        setImage('')
        setPrice('')
      }).catch(error=>{
        alert("Error")
        setTitle('')
        setDescription('')
        setImage('')
        setPrice('')
        console.log("Error: "+error)
      })
    }

    return(
        <div>
        
        
        <div style={{marginTop:100,color:"white"}}>
            <center>
                <h3><b>Add your Course</b></h3>
            </center>
        </div>
        <div>
        <center>
          <Card variant='outlined' style={{width:350, height:450,marginBottom:100,borderColor:"black",backgroundColor:"#26262e"}}>
            <CardContent style={{display: "flex", flexDirection:"column", alignItems:"flex-start"}}>
            <TextField id="outlined-basic" label="Title" variant="outlined" style={{width:"100%",backgroundColor:"white"}}
            value={putTitle}
            onChange={(e)=>{setTitle(e.target.value)}}
            />
            <br></br>
            
            <TextField id="outlined-password" label="Description"  variant="outlined" style={{width:"100%",backgroundColor:"white"}}
            value = {putDescription}
            onChange={(e)=>{setDescription(e.target.value)}}
            />
            <br></br>

            <TextField id="outlined-image" label="ImageLink"  variant="outlined" style={{width:"100%",backgroundColor:"white"}}
            value = {image}
            onChange={(e)=>{setImage(e.target.value)}}
            />
            <br></br>

            <TextField id="outlined-image" label="Price(INR)"  variant="outlined" style={{width:"100%",backgroundColor:"white"}}
            value = {price}
            onChange={handlePrice}
            />
            <br></br>

            <FormControl>
                <FormLabel id = "published-button" sx={{color:"white",justifyContent:"left",marginRight:14}}>Publish</FormLabel>
                <RadioGroup 
                    row
                    aria-labelledby='published-button'
                    name='published-radio'
                    value={published}
                    onChange={handlePublished}
                    sx={{color:"white"}}
                >
                    <FormControlLabel value = "true" control={<Radio/>} label="True"></FormControlLabel>
                    <FormControlLabel value = "false" control={<Radio/>} label="False"></FormControlLabel>

                </RadioGroup>
            </FormControl>

            <Button variant="contained" sx={{background:'linear-gradient(45deg,#43a892 40%,#173c63 80%)',color: 'white',marginTop:2}}
            onClick={handleCourse}
            >Create</Button>
                    
            </CardContent>
          </Card>
        </center>
          
        </div>
        </div>
    )
}

export default AddCourse;