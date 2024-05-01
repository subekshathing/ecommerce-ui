import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fallbackImage } from '../constants/general.constants';


const ProductCard = (props) => {
  const navigate=useNavigate()
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    <Card
      sx={{
       display:"flex",
       flexDirection:"column",
       width:"400px",
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      mt:"2rem"
      }}
    >
      <CardMedia
        sx={{ height:"300px" , width:"400px"}}
        image={props?.image || fallbackImage}
        title="DEL Laptop" onClick={()=>{navigate(`/product-details/${props._id}`)}}
      />
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Chip label={props.brand} color="secondary" variant="outlined" />
        </Stack>
        <Typography variant="body2">Price:${props.price}</Typography>

        <Typography variant="body2" color="text.secondary">
      {props.description}...
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" fullWidth onClick={()=>{navigate(`/product-details/${props._id}`)}} endIcon={<VisibilityIcon/>}>
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard