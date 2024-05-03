import React, { Fragment,useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate ,useParams} from 'react-router-dom'
import MetaData from '../layout/metaData'
import Sidebar from './Sidebar'
import { Link} from 'react-router-dom'
import { Typography } from '@mui/material'
import { getOrderDetails, updateOrders } from '../../reducers/orderAction'
import Loader from '../layout/Loader/loader'
import { MdAccountTree } from 'react-icons/md'
import {Button} from "@mui/material"
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'
import "./EditOrder.css"

const EditOrder = () => {
     const  order  = useSelector((state) => state.orderDetails?.order);
    const { error,loading,isUpdated}  = useSelector((state) => state.orderDetails);
      const navigate=useNavigate();
         
    const dispatch=useDispatch();
    const {id}=useParams();
const [status,setStatus]=useState("");    
    useEffect(()=>{
        if(error){
            console.log(error.message);
        }
        if(isUpdated){
            console.log("Order Updated Successfully")
            navigate("/admin/orders")
            dispatch({type:UPDATE_ORDER_RESET})
        }
        dispatch(getOrderDetails(id))
    },[dispatch,error,id,isUpdated])
    const processOrder=(e)=>{
        e.preventDefault()
    let myForm=new FormData();
        myForm.set("status",status);  
        console.log(status)
        dispatch(updateOrders(id,myForm))
    }
    
      return (
        <Fragment>
        <MetaData title="Create Product"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='newProductContainer'>
            {loading ?(<Loader/>) : (<div className='confirmOrderPage' style={{display:order.orderStatus ==="Delivered" ?"block":"grid"}}> 
                <div>
                <div className='confirmShippingArea'>
                    <Typography>Shipping Info</Typography>
                    <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, 
                    ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
                        <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.paymentInfo &&
                    order.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
               <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div> 
               
             </div>
                        <div className='confirmCartItems'>
                            <Typography>Your Cart Items:</Typography>
                            <div className='confirmCartItemContainer'>
                                {order.orderItems && order.orderItems.map((item)=>(
                                    
                                    <div key={item.id}>
                                        <img src={item.image} alt="Product"/>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                                        
                                        <span>
                                            {item.quantity}X ₹{item.price}={" "}
                                            <b>₹{item.price*item.quantity}</b>
                                        </span>
                                    </div>
                                    ))}
                            </div>
                        </div>
                </div>
                <div style={{display:order.orderStatus === "Delivered" ? "none" :"block"}}>
                <form className='updateOrderForm' encType='multipart/form-data' onSubmit={processOrder}>
                    <h1>Process Order</h1>
                    
                    <div>
                        <MdAccountTree/>
                        <select onChange={(e)=>setStatus(e.target.value)}>
                            <option value="">Choose Category</option>
                           {order.orderStatus ==="processing" && (<option value="Shipped">Shipped</option>)}
                           {order.orderStatus ==="Shipped" &&  (<option value="Delivered">Delivered</option>)}

                        </select>
                    </div>
                    <Button id='createProductBtn' type='submit' disabled={loading ? true : false || status === "" ? true : false } >
                    Update</Button>
                </form>
                </div>
                
         </div>)}
         </div> 
        </div>

    </Fragment>
            
           
      )
    }
    


export default EditOrder