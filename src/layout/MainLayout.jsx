import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Header'
import Footer from '../component/Footer'

const MainLayout = () => {
  return (
    <div>
      <Header/>
        <Outlet/>
    <h3>footer</h3>
    </div>
  )
}

export default MainLayout