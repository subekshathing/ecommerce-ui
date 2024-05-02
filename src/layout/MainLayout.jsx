import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'

import { Box } from '@mui/material'
import Footer from '../component/Footer'

const MainLayout = () => {
  return (
    < >
      <Header/>
      <Box sx={{margin:"3rem 0 0 0" }}>
      <Outlet/>
      </Box>
     
   <Footer/>
    </>
  )
}

export default MainLayout