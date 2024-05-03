import React from 'react'
import "./Contact.css"
import {Button} from "@mui/material"
const Contact = () => {
  return (
    <div className='contactContainer'>
      <a className='mailBtn' href='mailto:bgbhuban123@gmail.com'>
        <Button className='mail-button'><h1>Contact:bgbhuban123@gmail.com</h1></Button>
      </a>
    </div>
  )
}

export default Contact