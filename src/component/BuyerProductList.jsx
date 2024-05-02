import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import $axios from '../lib/axios/axios.instance'
import { Box, Pagination } from '@mui/material'
import ProductCard from './ProductCard'
import Loader from './Loader'

const BuyerProductList = () => {
  const [currentPage, setCurrentPage]=useState(1)

//fetch buyer list
const {isPending, data}=useQuery({
queryKey:["get-buyer-list",currentPage],
  queryFn:async()=>{
    return await $axios.post(`/product/list/buyer`, {
      page: currentPage,
      limit: 2,
    })
  
  }
})

const productLists=data?.data?.productList
const totalPages=data?.data?.totalPages
if(isPending){
  return <Loader/>
}

  return (
  <>
    <Box   sx={{
      display: "flex",
      flexDirection:"row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "3rem",
      mb:"2rem"
    }}>
      {
      productLists.map((item)=>{
        return <ProductCard key={item._id} {...item}/>
      })
      }
     
    </Box>
    <Pagination page={currentPage} count={totalPages} color="secondary" onChange={(_,value)=>{setCurrentPage(value)}} />

  </>
  )
}

export default BuyerProductList