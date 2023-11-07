import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  Card,
  Container,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";

import gallery from "./api/gallery.json";



function App() {
  const [items, setItems] = useState(gallery);


  const dragitem = useRef(0);
  const draggedOveritem = useRef(0); 

  function handleSort() {
    const itemClone = [...items]
    const temp = itemClone[dragitem.current]
    itemClone[dragitem.current] = itemClone[draggedOveritem.current]
    itemClone[draggedOveritem.current] = temp
    setItems(itemClone)
  }
  ////////////////////////////////////////////////////////

  const [isChecked, setisChecked]= useState([]);
  const selectMessage = isChecked.length > 0 ? `Select ${isChecked.length}` : '';
  const galleryMessage = isChecked.length == 0 ? `Gallery` : '';
  const showDeleteButton = isChecked.length > 0;
  


  const handlecheckbox = (e)=>{
    const {value, checked}= e.target;
    if(checked)
    {
      setisChecked([...isChecked, value]);
    } else{
      setisChecked(isChecked.filter( (e)=>e!== value));
    }
  }


  const alldelete= async()=>{
    const updatedItems = items.filter((item) => !isChecked.includes(item.id.toString()));
    setItems(updatedItems);
    setisChecked([]); 
  }


  return (
    <>
    <Container>

    <Grid container spacing={15}>
      <Grid item xs={10}>
        <h1>{selectMessage}</h1>
      </Grid>
      <Grid item xs={2}>
      {showDeleteButton && <button onClick={alldelete} style={{ marginTop: '30px', backgroundColor: 'red', color: 'white', padding:'8px'}}>Delete</button>}
      </Grid>  
                                  
    </Grid>

      <h1>{galleryMessage}</h1>
      <hr />
      <br />


      <Grid container spacing={2}>
      <div><Card>
        {items.map((item, index) => (
        
        <Grid item key={item.id} xs={index === 0 ? 4.8 : 2.4} sx={{ cursor: "-webkit-grab" }} height={index == 0 ? "300" : "140"}
        draggable
        onDragStart={() => (dragitem.current = index)}
        onDragEnter={() => (draggedOveritem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        className='grid_image'
        >
          <Card>
       
            
              <input className='check' type="checkbox" value={item.id} checked={item.isChecked} onChange={(e)=>handlecheckbox(e)}/>
              <CardMedia
                component="img"
                image={item.image}
                alt={`Image ${item.id}`}
              />
          </Card>
      </Grid>
        ))}
      </Card></div>
      </Grid>
   



    </Container>
    </>
  )
}

export default App
