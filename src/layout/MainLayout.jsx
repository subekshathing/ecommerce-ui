import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'

import { Box } from '@mui/material'

const MainLayout = () => {
  return (
    < >
      <Header/>
      <Box sx={{margin:"3rem 0 0 0" }}>
      <Outlet/>
      </Box>
       
    <h3>footer</h3>
    </>
  )
}

export default MainLayout