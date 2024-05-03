import React ,{Fragment,useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import "./Reviews.css"
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import { deleteReview, getAllReviews } from '../../reducers/productReducer'
import { Button } from '@mui/material'
import MetaData from '../layout/metaData'
import {MdDelete ,MdStar} from 'react-icons/md'
import Sidebar from './Sidebar'
import { DELETE_REVIEW_RESET } from '../../constants/productConstant'


const Reviews = () => {
  
const dispatch=useDispatch();
const navigate=useNavigate();
const {error,loading}=useSelector((state)=>state.reviewDetails)
const isDeleted=useSelector((state)=>state.deleteReview?.isDeleted)
const reviews=useSelector((state)=>state.reviewDetails?.reviews?.data?.reviews)
console.log(reviews)
const [productId,setProductId]=useState("")
console.log(productId)
const deleteReviewHandler=(reviewId)=>{
   
dispatch(deleteReview(reviewId,productId));
console.log(reviewId);
}
const productReviewHandler=(e)=>{
  e.preventDefault();
  dispatch(getAllReviews(productId))
}
useEffect(()=>{
    if(error){
        console.log(error.message)
    }
    if(isDeleted){
        console.log("Review Deleted Successfully")
         navigate("/admin/reviews")
         dispatch({type:DELETE_REVIEW_RESET})
    }
    
},[dispatch,error,navigate,isDeleted,productId])
const columns=[
    {field:"id",headerName:"Review Id",minWidth:200,flex:0.5},
{
    field:"comment",headerName:"Comment",minWidth:350,flex:0.3 
},{
    field:"user",headerName:"User",minWidth:150,flex:0.3
},
{
    field:"rating",headerName:"Rating",type:"number",minWidth:100,flex:0.1,cellClassName: (params) => {
      return params.row.rating >=3 ? "greenColor" : "redColor";
  }
},
{
    field:"actions",headerName:"Actions",minWidth:150,type:"number",flex:0.3,sortable:false,
    renderCell:(params)=>{
        const reviewId = params.row?.id;
        if(productId){
        return(
        <Fragment>
            
            <Button onClick={()=>deleteReviewHandler(reviewId)}><MdDelete style={{ fontSize: '50px' }}/></Button> 
            </Fragment>
        )
        }
    else{
        return null;
        }
    }
}
]
const rows=[];
reviews && reviews.forEach((item) => {
    rows.push({id:item._id,
        rating:item.rating,
        comment:item.comment,
        user:item.name
    
    })
});
return (
    <Fragment>
        <MetaData title="All Reviews-Admin"/>
        <div className='dashboard'>
        <Sidebar/>
        <div className='productReviewContainer'>
        <form className='productReviewForm' encType='multipart/form-data' onSubmit={productReviewHandler}>
                        <h1 className='productReviewHeading'>All Reviews</h1>
                        <div>
                            <MdStar/>
                            <input type='text' placeholder='ProductId' required value={productId} onChange={(e)=>setProductId(e.target.value)}/>
                        </div>
                        
                        
                        <Button id='createProductBtn' type='submit' disabled={loading ? true :false || (productId === "" ? true :false )}>Search</Button>
                    </form>
        {reviews && reviews.length>0 ?<DataGrid rows={rows} columns={columns} 
        pageSize={10} rowHeight={60} columnHeaderHeight={90} disableSelectionClick className='productListTable' autoHeight/>:<h1 className='productReviews'>No Reviews Found</h1>
}            
        </div>
        </div>
    </Fragment>
  )
}


export default Reviews