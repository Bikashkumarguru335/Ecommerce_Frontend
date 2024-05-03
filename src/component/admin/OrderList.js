import React ,{Fragment,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import "./productList.css"
import  {useDispatch} from "react-redux"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import MetaData from '../layout/metaData'
import { MdEdit,MdDelete } from 'react-icons/md'
import Sidebar from './Sidebar'
import { getAllOrders ,deleteOrder} from '../../reducers/orderAction'
import { DELETE_ORDER_RESET } from '../../constants/orderConstant'


export const OrderList = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const orders=useSelector((state)=>state.allOrder.order)
    const error=useSelector((state)=>state.orderModify.error)
    const isDeleted=useSelector((state)=>state.orderModify.isDeleted)
    
    console.log(orders)
    const deleteOrderHandler=(id)=>{
     dispatch(deleteOrder(id));
    }
    useEffect(()=>{
        if(isDeleted){
            navigate("/admin/dashboard")
            dispatch({type:DELETE_ORDER_RESET})
        }
        dispatch(getAllOrders())
    },[dispatch])
    
    const columns=[
    { field: 'id', headerName: 'Order Id', minWidth: 200, flex: 0.5 },
    { field: 'status', headerName: 'status', minWidth: 250, flex: 0.3 ,cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
    }},
    { field: 'itemsQty', headerName: 'items Qty', type: 'number', minWidth: 100, flex: 0.2 },
    { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 200, flex: 0.3 },
    {
        field:"actions",headerName:"Actions",minWidth:150,type:"number",flex:0.3,sortable:false,
        renderCell:(params)=>{
            const orderId = params.row?.id;
        
            if(orderId){
            return(
            <Fragment>
                <Link to={`/admin/order/${orderId}`}><MdEdit style={{ fontSize: '50px' }}/></Link>
                <Button onClick={()=>deleteOrderHandler(orderId)}><MdDelete style={{ fontSize: '50px' }}/></Button> 
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
    orders && orders.forEach((item) => {
        rows.push({id:item._id,
            itemsQty:item.orderItems.length,
            amount:item.totalPrice,
            status:item.orderStatus,
        
        })
    });
    return (
        <Fragment>
            <MetaData title="All Orders-Admin"/>
            <div className='dashboard'>
            <Sidebar/>
            <div className='productListContainer'>
    
                <h1 id='productListHeading'>All Orders</h1>
                <DataGrid rows={rows} columns={columns} pageSize={20} rowHeight={50} columnHeaderHeight={80} 
                disableSelectionClick className='productListTable' autoHeight/>
            </div>
            </div>
        </Fragment>
      )
    }
    

export default OrderList