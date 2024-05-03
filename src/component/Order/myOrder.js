import React, { Fragment, useEffect,useMemo } from 'react'
import {DataGrid} from "@mui/x-data-grid"
import "./myOrder.css"
import {useSelector,useDispatch} from "react-redux"
import { myOrders } from '../../reducers/orderAction'
import Loader from '../layout/Loader/loader'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import MetaData from '../layout/metaData'
import { MdLaunch } from 'react-icons/md'

const MyOrder = () => {
//     const dispatch=useDispatch();
//   const user=useSelector((state)=>state.loginDetails?.user?.data?.user)
// const {loading,error,orders}=useSelector((state)=>state.myOrder)
// const columns = [
//   {field:"id",headerName:"Order Id",minWidth:300,flex:1},
//   {field:"status",headerName:"status",minWidth:150,flex:0.5},
//   {field:"itemsQty",headerName:"items Qty",type:"number",minWidth:"150",flex:0.3},
//   {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5}];

// const rows = [];
//   orders && orders.forEach((item,index) => {
// rows.push({
// itemsQty:item.orderItems.length,
// id:item.id,
// status:item.orderStatus,
// amount:item.totalPrice
// })    
//   });
// useEffect(()=>{
//   if(error){
//     console.error(error.message)
//   }
// dispatch(myOrders())
// },[dispatch,error])

  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetails?.user?.user);
  const { loading, error, orders } = useSelector((state) => state.myOrder);
console.log(orders);
  useEffect(() => {
    if (error) {
      console.error(error.message);
    }
    dispatch(myOrders());
  }, [dispatch, error]);

  
  const rows = useMemo(() => {
    if (!orders) return [];
    return orders.map((item) => ({
      id: item._id,
      status: item.orderStatus,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
    }));
  }, [orders]);

  const columns = [
    { field: 'id', headerName: 'Order Id', minWidth: 300, flex: 1 },
    { field: 'status', headerName: 'status', minWidth: 150, flex: 0.5 ,cellClassName: (params) => {
      return params.row.status === "Delivered" ? "greenColor" : "redColor";
  }
      },
    { field: 'itemsQty', headerName: 'items Qty', type: 'number', minWidth: 150, flex: 0.3 },
    { field: 'amount', headerName: 'Amount', type: 'number', minWidth: 270, flex: 0.5 },
    {field:"action",headerName:"Actions",type:"number", minWidth: 150,flex:0.3,sortable:false,
  renderCell:(params)=>{
    const orderId = params.row?.id;
    

    return(
      <Link to={`/order/${orderId}`}>
        <MdLaunch/>
      </Link>
    )
  }
}
]
  
  return (
  <Fragment>
    <MetaData title={`${user.name}-Orders`}/>
    {loading ?(<Loader/>):(
      <div className='myOrderPage'>
        <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className='myOrderTables' autoHeight />
     <Typography id="myOrderHeading">{user.name}'s order</Typography>
      </div>
    )}
  </Fragment>
  )
}

export default MyOrder