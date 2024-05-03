import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ProductCard from '../Home/productCard'
import { fetchAllProducts } from '../../reducers/productReducer'
import { useParams } from 'react-router-dom'
import Pagination from "react-js-pagination"  
import { Slider } from '@mui/material'
import {Typography} from '@mui/material'

const categories=[
  "T-shirt",
  "Watch",
  "Laptop",
  "FootWare",
  "Bottom",
  "Tops",
  "Attire",
  "Clothing",
  "Camera Lense",
  "SmartPhone"
];
const Products = () => {
  
    const dispatch=useDispatch();
const [currentPage,setCurrentPage]=useState(1)
const [price,setPrice]=useState([50,20000])
const [category,setCategory]=useState("")
const [ratings,setRatings]=useState(0)
const [notFound, setNotFound] = useState(false); // State to track product not found


    const Result=useSelector((state)=>{return state.product?.data?.Product ??[]})
     const Backend=useSelector((state)=>{return state.product?.data})
    const keywords=useParams();
     let keyword = keywords.keyword;

    const totalItems=Backend?.productCount;
    const perPage=Backend?.resultPerPage;
  const navigate=useNavigate();

    const handelPage=()=>{
      navigate("/products")
        }
      
  const setCurrentPageNo=(e)=>{
      setCurrentPage(e);
      
    }
    const priceHandler=(e,newPrice)=>{
        setPrice(newPrice);
    }
    useEffect(()=>{
      dispatch(fetchAllProducts(keyword,currentPage,price,category,ratings)).then(()=>{
        if (Result.length === 0) { 
          setNotFound(true); 
        } else {
          setNotFound(false);
        }

      })
    },[dispatch,keyword,currentPage,price,category,ratings,Result.length])

  return (

<Fragment>
  
<h2 className='productsHeading'>Products</h2>
<div className='productLinkDetails'>
<div className='products'>
{notFound ? (
            <p className="notFoundMessage">
            <h1>404 -Product Not Found</h1>
      <p>No products found matching your search criteria.</p>
      <button onClick={handelPage} className="back-button">Go Back</button>
      </p>
          ) : (

  Result && Result.map((product)=>(
    <ProductCard key={product._id} product={product}/>
  ))
          )}
</div>
</div>
<div className='filterBox'>
  <Typography>Price</Typography>
  <Slider
  value={price}
  onChange={priceHandler}
  valueLabelDisplay="auto"
  aria-labelledby='range-slider'
  min={50}
  max={20000}
  />
  <Typography>Categories</Typography>
  <ul className='categoryBox'>{categories?.map((category)=>(
    <li className='category-link' key={category} onClick={()=>setCategory(category)}>{category}</li>
  ))}</ul>
  <fieldset>
    <Typography component="legend">Ratings Above</Typography>
    <Slider value={ratings} onChange={(e,newRatings)=>{
      setRatings(newRatings)}}
      aria-labelledby="continuous-slider"
      valueLabelDisplay="auto"
      min={0}
      max={5}
      
      />
  </fieldset>
</div>

{perPage <totalItems &&(
<div className='paginationBox'>
  <Pagination
   activePage={currentPage}
   itemsCountPerPage={perPage}
   totalItemsCount={totalItems}
   onChange={setCurrentPageNo}
   nextPageText="Next"
   prevPageText="Prev"
   firstPageText="1st"
   lastPageText="Last"
   item-class="page-item"
   linkClass="page-link"
   activeClass="pageItemActive"
   activeLinkClass="pageLinkActive"
  />
</div>
)}
</Fragment>
  )
}

export default Products