import React ,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import "./productList.css"
import  {useDispatch} from "react-redux"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteProduct, getAdminProduct } from '../../reducers/productReducer'
import { Button } from '@mui/material'
import MetaData from '../layout/metaData'
import { MdEdit,MdDelete } from 'react-icons/md'
import Sidebar from './Sidebar'
import {DELETE_PRODUCT_RESET} from "../../constants/productConstant"

const ProductList = () => {
const dispatch=useDispatch();
const navigate=useNavigate();
const products=useSelector((state)=>state.product?.products?.data?.Product)
const error=useSelector((state)=>state.product.error)
const isDeleted=useSelector((state)=>state.productsReducer?.isDeleted)

const deleteProductHandler=(id)=>{
dispatch(deleteProduct(id));
}
useEffect(()=>{
    if(error){
        console.log(error.message)
    }
    if(isDeleted){
        alert("Product deleted Successfully")
        navigate("/admin/dashboard")
        dispatch({type:DELETE_PRODUCT_RESET})

    }
dispatch(getAdminProduct());
},[dispatch,error,navigate,isDeleted])
const columns=[
    {field:"id",headerName:"Product Id",minWidth:200,flex:0.5},
{
    field:"name",headerName:"Name",minWidth:350,flex:0.3 
},{
    field:"stock",headerName:"Stock",minWidth:150,flex:0.3
},
{
    field:"price",headerName:"Price",type:"number",minWidth:200,flex:0.1
},
{
    field:"actions",headerName:"Actions",minWidth:150,type:"number",flex:0.3,sortable:false,
    renderCell:(params)=>{
        const productId = params.row?.id;
    
        if(productId){
        return(
        <Fragment>
            <Link to={`/admin/products/${productId}`}><MdEdit style={{ fontSize: '50px' }}/></Link>
            <Button onClick={()=>deleteProductHandler(productId)}><MdDelete style={{ fontSize: '50px' }}/></Button> 
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
products && products.forEach((item) => {
    rows.push({id:item._id,
        stock:item.stock,
        price:item.price,
        name:item.name
    
    })
});
return (
    <Fragment>
        <MetaData title="All Products-Admin"/>
        <div className='dashboard'>
        <Sidebar/>
        <div className='productListContainer'>

            <h1 id='productListHeading'>All Products</h1>
            <DataGrid rows={rows} columns={columns} pageSize={10} rowHeight={60} columnHeaderHeight={90} 
            disableSelectionClick className='productListTable' autoHeight/>
        </div>
        </div>
    </Fragment>
  )
}

export default ProductList