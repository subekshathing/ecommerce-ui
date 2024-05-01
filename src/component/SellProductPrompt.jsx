import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const SellProductPrompt = () => {
  return (
    <Box sx={{
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",padding:"3rem",mt:"2rem"
    }}><Typography variant='h6'> No product is added. Please add your products to sell here.</Typography>
    <Link to="/add-product">Add Product and begin your business here...</Link>
    </Box>
  )
}

export default SellProductPrompt