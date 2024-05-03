import React from 'react'
import { MdCircle } from 'react-icons/md'
import "./OrderSuccess.css"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const OrderSuccess = () => {
  return (
    <div className='OrderSuccess'>
        <MdCircle/>
        <Typography>Your Order has been Placed successfully</Typography>
        <Link to="/order">View Orders</Link>
    </div>
  )
}

export default OrderSuccess