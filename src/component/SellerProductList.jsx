import React from 'react'
import ProductCard from './ProductCard'
import { useQuery } from '@tanstack/react-query'
import $axios from '../lib/axios/axios.instance'
import { Box, CircularProgress } from '@mui/material'

const SellerProductList = () => {
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: 1,
        limit: 3,
      });
    },
  });

  const productList = data?.data?.productList;
console.log(productList)


  if (isPending) {
    return <CircularProgress />;
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "warp",
        justifyContent: "center",
        alignments: "center",
        gap: "3rem",
      }}
    >
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    </Box>
  );
};

export default SellerProductList