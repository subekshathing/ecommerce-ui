import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Chip, CircularProgress, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import $axios from '../lib/axios/axios.instance';
import ClearIcon from "@mui/icons-material/Clear";

export const CartItemTable=({cardData})=> {

  //query client
  const queryClient=useQueryClient()

 

    //clear cart item
    const { isPending: clearCartPending, mutate: clearCart } = useMutation({
      mutationKey: ["clear-cart"],
      mutationFn: async () => {
        return await $axios.delete("/cart/clear");
      },
      onSuccess: () => {
        // re-hit get cart item list api
        queryClient.invalidateQueries("get-cart-item-list")
    
      },
  
    }
    )

 //   remove single item from cart api
 const {
  isPending: removeSingleItemFromCartPending,
  mutate: removeSingleItemFromCart,
} = useMutation({
  mutationKey: ["remove-single-cart-item"],
  mutationFn: async (productId) => {
    return await $axios.delete(`/cart/item/remove/${productId}`);
  },
  onSuccess: () => {
    // re-hit get cart item list api
    queryClient.invalidateQueries("get-cart-item-list");
  },
});

  return (
   <>
   
   <Box>
   <TableContainer component={Paper} sx={{boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", width:"800px"}}>
   {(removeSingleItemFromCartPending || clearCartPending) && (
        <LinearProgress color="success" />
      )}
    <Button  variant="contained"
        color="error"
        sx={{ }}onClick={()=>{clearCart()}} >Clear cart</Button>
      <Table sx={{  }} aria-label="simple table">
      <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">S.N.</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Image</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Name</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6">Price</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Quantity</Typography>
            </TableCell>
            <TableCell align="left">
              <Typography variant="h6">Sub total</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h6">Action</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
      <TableBody>
      {cardData?.map((item, index) => (
            <TableRow
              key={item._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography variant="body1"> {index + 1}</Typography>
              </TableCell>
              <TableCell align="right">
                <img
                  src={item.image}
                  alt={item.name }
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Stack spacing={2} justifyContent="center" alignItems="center">
                  <Typography variant="body1"> {item.name}</Typography>
                  <Chip
                    label={item.brand}
                    color="secondary"
                    variant="outlined"
                    sx={{ fontSize: "1rem" }}
                  />
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1">${item.unitPrice}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1">{item.orderedQuantity}</Typography>
              </TableCell>
              <TableCell align="center">
            
                <Typography variant="body1">{200}</Typography>
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="error"
                  onClick={() => {
                    removeSingleItemFromCart(item.productId);
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      </Table>
    </TableContainer>
   </Box>
   
   </>
  );
}

