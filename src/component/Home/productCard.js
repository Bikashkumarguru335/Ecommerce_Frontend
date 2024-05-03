import React from 'react'
import {Link} from "react-router-dom"
import {Rating} from "@mui/lab"

const productCard=({product})=>{

 const options={
  
  color:"rgba(20,20,20,0.1)",
  activeColor:"tomato",
  readOnly:true,
  value:product.ratings,
  precision:0.5 
}

return (
    <Link className='productCard' to={`product/${product._id}`}>
    <img src={product.images && product.images.length > 0 && product.images[0].url} alt={product.name} />
    <p>{product.name}</p>
    <div>
      <Rating {...options}/>{" "}
      <span className='productCardSpan'>({product.numberOfReviews}Reviews)</span>
    </div>
    <span>{`₹${product.price}`}</span>
    </Link>
  )

}

export default productCard;
//dalle use for unique images