import { Box, Typography } from '@mui/material'
import React from 'react'
import { CartItemTable } from './CardItemTable'
import OrderSummary from './OrderSummary'
import { useQuery } from '@tanstack/react-query'
import $axios from '../lib/axios/axios.instance'
import KeepShopping from './KeepShopping'

const Cart = () => {
   //get cart item list
   const {isPending, data}=useQuery({
    queryKey:["get-cart-item-list"],
    queryFn:async()=>{
        return await $axios.get("/cart/item/list")
    }
})
const cardData=data?.data?.cartData
  return (
    <>
    <Typography variant='h6' sx={{marginBottom:"2rem"}}>Shopping Cart</Typography>
    
    {cardData?.length === 0 ? (
        <KeepShopping />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "90%",
          }}
        >
          <CartItemTable cardData={cardData} />
          <OrderSummary />
        </Box>
      )}
    </>
  )
}

export default Cart