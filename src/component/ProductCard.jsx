import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip, Stack } from '@mui/material';


const ProductCard = (props) => {
  const role = localStorage.getItem("role");
  console.log(role);
  return (
    <Card
      sx={{
       display:"flex",
       flexDirection:"column",
       
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
      }}
    >
      <CardMedia
        sx={{ height:"400px" , width:"400px"}}
        image="https://i.ebayimg.com/images/g/2c4AAOSwl9plwkMv/s-l400.jpg"
        title="DEL Laptop"
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
      {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="secondary" fullWidth>
          Explore
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard