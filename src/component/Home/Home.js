import {Fragment, useEffect} from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"  
import ProductCard from "./productCard.js"
import  MetaData  from '../layout/metaData'
import { fetchAllProducts } from '../../reducers/productReducer'
import {useSelector,useDispatch} from "react-redux"; 
//  import productSlice from '../../actions/productAction'

 
const Home = () => {
 const Product=useSelector((state)=>{return state.product?.data?.Product ??[]});
      console.log(Product);
  const dispatch=useDispatch();
       
    useEffect(()=>{
  dispatch(fetchAllProducts())    
  },[dispatch])
  
  return(
    
    <Fragment>
       
        <MetaData title="ECOMMERCE"/>
        <div className='banner'>
        <p>Welcome To ECOMMERCE</p>
        <h1>FIND AMAZING PRODUCTS BELLOW</h1>
        <a href='#container'>
        <button>Scroll <CgMouse/></button>
        </a> 
        </div>
         <h2 className='homeHeading'>Feature Product</h2>
        <div className='container' id="container"> 
<div className='ProductContainer'>
{Product && Product.map((product)=>(
    <ProductCard key={product._id} product={product}/>
  ))}
</div>
</div>
         
    </Fragment>
    
  )
}

export default Home;