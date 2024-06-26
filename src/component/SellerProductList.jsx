import React, { useState } from 'react'
import ProductCard from './ProductCard'
import { useQuery } from '@tanstack/react-query'
import $axios from '../lib/axios/axios.instance'
import { Box, Button, CircularProgress, Pagination } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SellProductPrompt from './SellProductPrompt'
import Loader from './Loader'


const SellerProductList = () => {

  const [currentPage,setCurrentPage]=useState(1)
  const navigate=useNavigate()
  const { isPending, data } = useQuery({
    queryKey: ["get-seller-products",currentPage],
    queryFn: async () => {
      return await $axios.post("/product/list/seller", {
        page: currentPage,
        limit: 1,
      });
    },
  });
console.log(data)
  const productList = data?.data?.productList;
// console.log(productList)
const totalPages=data?.data?.totalPages


  if (isPending) {
    return <Loader/>;
  }
  return (
   <>
   <Button variant='contained' color='success' onClick={()=>{navigate("/add-product")}} sx={{width:"200px",alignItems:"center"}}>Add product</Button>
   {productList.length===0 && <SellProductPrompt/>}
    <Box
      sx={{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        justifyContent: "center",
        alignments: "center",
        gap: "3rem",
      }}
    >
      {productList.map((item) => {
        return <ProductCard key={item._id} {...item} />;
      })}
    
    </Box>
    <Pagination page={currentPage} count={totalPages} color="secondary" onChange={(_,value)=>{setCurrentPage(value)}}/>
   </>
  );
};

export default SellerProductList