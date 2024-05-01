import { useQuery } from '@tanstack/react-query'
import React from 'react'
import $axios from '../lib/axios/axios.instance'
import { Box, CircularProgress } from '@mui/material'
import ProductCard from './ProductCard'
import Loader from './Loader'

const BuyerProductList = () => {

//fetch buyer list
const {isPending, data}=useQuery({
queryKey:["get-buyer-list"],
  queryFn:async()=>{
    return await $axios.post(`/product/list/buyer`, {
      page: 1,
      limit: 9,
    })
  }
})

console.log(data)

const productLists=data?.data?.productList
if(isPending){
  return <Loader/>
}

  return (
    <Box   sx={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "3rem",
    }}>
      {
      productLists.map((item)=>{
        return <ProductCard key={item._id} {...item}/>
      })
      }
    </Box>
  )
}

export default BuyerProductList