import { Box, Button, Chip, CircularProgress, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import { fallbackImage } from "../constants/general.constants";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteProductDialog from "../component/DeleteProductDialog";

// Box => div
// Stack => div which has display flex and direction column
const ProductDetails = () => {
  const params=useParams()
  const productId=params?.id 
  
  //get user role
  const userRole = localStorage.getItem("role");

  //navigate edit page
  const navigate=useNavigate() 
  const queryClient=useQueryClient()

  //fetch product get details
  const {isPending,data}=useQuery({
    queryKey:["get-product-details"],
    queryFn:async()=>{
      return await $axios.get(`/product/details/${productId}`)
    }
  })
console.log(data)
  const productDetails=data?.data?.productDetail

    // ordered quantity tracking
  const [productCount, setProductCount] = useState(1);

  // add to cart api hit
  const { isPending: addItemToCartPending, mutate } = useMutation({
    mutationKey: ["add-item-to-cart"],
    mutationFn: async () => {
      return await $axios.post(`/cart/item/add`, {
        productId: productId,
        orderedQuantity: productCount,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("get-cart-item-count")
    },
  });


  if (isPending || addItemToCartPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        padding: "1rem",
        mt: "5rem",
        
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center",minWidth:"50%" }}
      >
        <img style={{width:"80%"}}
          src={productDetails.image || fallbackImage}
        
          alt=""
                  />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "flex-start",
          padding:"0 2rem 0 0",
          width:"700px",
          gap: "0.5rem",
        }}
      >
        <Typography variant="h5">{productDetails.name}</Typography>
        <Chip
          label={productDetails.brand}
          variant="outlined"
          color="success"
          sx={{ fontSize: "1rem" }}
        />
        <Typography sx={{ textAlign: "justify" }}>
        {productDetails.description}
        </Typography>
        <Typography variant="h6">Price: ${productDetails.price}</Typography>

        <Chip
          variant="outlined"
          color="success"
          label={productDetails.category}
          sx={{ fontSize: "1rem" ,textTransform:"capitalize"}}
        />

        <Typography variant="h6">Available quantity: {productDetails.availableQuantity}</Typography>

        <Stack direction="row" spacing={4}>
          <Typography variant="h6">Free shipping</Typography>
          <Chip
            variant="outlined"
            color={productDetails.freeShipping? "success":"error"}
            label={productDetails.freeShipping? "Yes":"No"}
            sx={{ fontSize: "1rem" }}
          />
        </Stack>
        {
          userRole==="seller" && (
            <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            fullWidth
            onClick={()=>{navigate(`/product-edit/${productDetails._id}`)}}
          >
            Edit
          </Button>
        
          <DeleteProductDialog/>
        </Stack>


          )
        }

{ userRole==="buyer" && (
  <>
  <Stack direction="row" spacing={3}>
  <IconButton
                onClick={() => {
                  setProductCount((prevCount) => prevCount - 1);
                }}
                disabled={productCount === 1}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h4">{productCount}</Typography>
              <IconButton
                onClick={() => {
                  setProductCount((prevCount) => prevCount + 1);
                }}
                disabled={productCount === productDetails?.availableQuantity}
              >
                <AddIcon />
              </IconButton>
  </Stack>
  <Button  variant="contained"
              color="success"
              onClick={() => {
                mutate();
              }}
              fullWidth>Add to card</Button>
  </>
)}
      </Box>
    </Box>
  );
};

export default ProductDetails;