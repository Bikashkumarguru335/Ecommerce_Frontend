import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard"
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom'
import { addItemsToCart} from '../../reducers/cartAction'
import {MdRemoveShoppingCart} from "react-icons/md"
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom'
const Cart = () => {
    const cartItems=useSelector((state)=>state.cart?.cartItems)
    const dispatch=useDispatch();
const navigate=useNavigate();
// console.log(cartItems.map((item)=>(console.log(item.product?.image?.url))))
    const increaseQuantity=(id,quantity,stock)=>{
       
        const newQnt=quantity+1;
        if(stock <=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQnt))
    }
    const decreaseQuantity=(id,quantity)=>{
        const newQnt=quantity-1;
        if(1>=quantity){
            return;
        }
        dispatch(addItemsToCart(id,newQnt));
    }
    
    const checkOutHandler=()=>{
        navigate("/login?redirect=shipping")
    }
     
     
  return(
    <Fragment>
        {cartItems.length === 0 ?(
        <div className='emptyCart'>
        <MdRemoveShoppingCart/>
        <Typography>No Product In Your Cart</Typography>
        <Link to="/products">view product</Link>
        </div>
        ):( <Fragment>
        <div className='CartPage'>
            <div className='CartHeader'>
                <p>Product</p>
                <p>Quantity</p>
                 <p>Subtotal</p>
            </div>
            {cartItems && cartItems.map((item)=>( 
              
                <div className='CartContainer' key={item.product?.id}>
                <CartItemCard item={item}/> 
                <div className='CartInput'>  
              <button onClick={()=>decreaseQuantity(item.product.id,item.quantity)}>-</button>
              <input type="number"   value={item.quantity}/>
              <button onClick={()=>increaseQuantity(item.product.id,item.quantity,item.product?.stock)}>+</button>
              </div>
              <p className='CartSubtotal' >{`₹${item.product?.price*item.quantity}`}</p>
              </div>

            //  
            ))}
            <div className='CartGrossProfit'>
                <div></div>
                <div className='CartGrossProfitBox'>
                    <p>Gross Total</p>
                    <p>{`₹${cartItems.reduce((acc,item)=>acc +item.quantity*item.product.price,0)}`}</p>
                </div>
                <div></div>
                <div className='checkoutBtn'>
                    <button onClick={checkOutHandler}>Check Out</button>
                </div>
            </div>
        </div>
    </Fragment>
    )
    }    
       
    </Fragment>

  )
  }

export default Cart;