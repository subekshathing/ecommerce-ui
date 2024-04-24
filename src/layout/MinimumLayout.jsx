import React from 'react'
import { Outlet } from 'react-router-dom'

const MinimumLayout = () => {
  return (
    <div><Outlet/></div>
  )
}

export default MinimumLayout