import React from 'react'
import {Rating} from "@mui/lab"
import profilePng from "../../images/profile.png"
const reviewCard = (reviews) => {
  const options={
      value:reviews.review?.rating,
       readOnly:true,
       precision:0.5,
  }
  return ( 
    <div className='reviewCard'>
 <img src={profilePng} alt="User" width="100"/> 
<p>{reviews.review?.name}</p>
<Rating {...options}/><br/>

<span className='reviewCardComment'>{reviews.review?.comment}</span>
    </div>
  )
}

export default reviewCard