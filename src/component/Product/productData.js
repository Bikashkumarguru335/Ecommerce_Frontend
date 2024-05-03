import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import { useSelector,useDispatch } from 'react-redux'
import { newReview, productDetails } from '../../reducers/productReducer'
import "./productData.css"
import { Dialog,DialogActions,DialogTitle,Button, DialogContent } from '@mui/material'
import {Rating} from "@mui/lab"
import { useParams } from 'react-router-dom'
import ReviewCard from "./reviewCard"
import { addItemsToCart } from '../../reducers/cartAction'
import { NEW_REVIEW_RESET } from '../../constants/productConstant'

const  ProductData=()=>{
  const dispatch=useDispatch();
   const {id}=useParams();
  const data=useSelector((state)=>{return state.productDetails?.data?.Product})
  const success=useSelector((state)=>{return state.productDetails?.data})
  
  // const  Array=Object.entries(data)
  // console.log(Array)
  
const [quantity,setQuantity]=useState(1);  
const [rating,setRating]=useState(0);
const [comment,setComment]=useState("");
const [open,setOpen]=useState(false);
const increaseQuantity=()=>{
  if(data.stock <=quantity) return;
  const quant=quantity+1;
  setQuantity(quant)
}
const decreaseQuantity=()=>{
  if(quantity <0) return;
  const quant=quantity-1;
  setQuantity(quant)
}
const addToCartHandler=()=>{
  dispatch(addItemsToCart(id,quantity))
  console.log(id);
  alert("item add to cart")
}

const reviewSubmitHandler=()=>{
  const myForm=new FormData();
  myForm.set("rating",rating)
  myForm.set("comment",comment)
  myForm.set("productId",id)
  dispatch(newReview(myForm))
  setOpen(false);
}
const submitReviewToggle=()=>{
  open ? setOpen(false):setOpen(true);
}

useEffect(()=>{
  if(success){
     console.log("Review Submit successfully")
     dispatch({type:NEW_REVIEW_RESET})
   }
  
  dispatch(productDetails(id))
  
},[dispatch,id])

  return (
    <Fragment>
    
      <div className='productData'>
        
      <Carousel className='carousel'>
        <div className='product-Image'>
{data?.images?.map((image,i)=>(<img className='carouselImage' key={image.url} src={image.url} alt={`${i} Slide`}/>))}
      </div>
    </Carousel>

    <div className='Right'>
      <div className='Block-1'>
        <h2>{data?.name}</h2>
         <p>{`#${data?._id}`}</p>
         
        <div className="Block-2">
          <Rating key={data?.ratings} value={data?.ratings}/> 
          <span className='detailBlock'>({data?.numOfReviews} Reviews)</span>
          
          </div>
          </div>
          <div className='Block-3'>
          <h1>{`₹${data?.price}`}</h1>
          <div className='Block-3-1'>
          <div className='Block-3-2'>
    <button onClick={decreaseQuantity}>-</button>
    <input readOnly type="number" value={quantity}/>
    <button onClick={increaseQuantity}>+</button>
    </div>{" "}
    <button  onClick={addToCartHandler}>Add To Cart</button> 
    </div>
    <p>Status:{" "}
    <b className={data?.stock < 1 ? "redColor" :"greenColor"}>{data?.stock <1 ? "OutOfStock" :"InStock"}</b>
    </p>
    </div>
    <div className='Block-4'>
      Description:<p>{data?.description}</p>
      </div> 
      <button onClick={submitReviewToggle} className='submitReview'>Submit Review</button>
      </div>
      </div>
      
    <h3 className='ReviewsHeading'>Reviews</h3>
    <Dialog aria-labelledby='simple-dialog-title' open={open}>
      <DialogTitle>Submit Review</DialogTitle>
      <DialogContent className='submitDialog'>
        <Rating onChange={(e)=>setRating(e.target.value)} value={rating} size='large'/>
        <textarea className='submitDialogTextArea' cols="30" rows="5" value={comment}onChange={(e)=>setComment(e.target.value)}></textarea>
      </DialogContent>
      <DialogActions>
        <Button onClick={submitReviewToggle} color='secondary'>Cancel</Button>
        <Button onClick={reviewSubmitHandler} color='primary'>Submit</Button>
      </DialogActions>
       </Dialog>
    {data?.reviews && data?.reviews[0] ?(<div className='reviews'>
      {data?.reviews && data?.reviews.map((review)=>(
      <ReviewCard key={review.id}review={review}/>))}</div>)
      :(<p className='noReview'>NO Reviews Yet</p>)}
   
  </Fragment>
  )
}

export default ProductData;