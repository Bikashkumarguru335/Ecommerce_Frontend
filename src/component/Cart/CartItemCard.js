import React from 'react'
import { Link } from 'react-router-dom'
 import { useDispatch } from 'react-redux'
import "./CartItemCard.css"
 import { removeFromCartItem } from '../../reducers/cartAction'
const CartItemCard = ({item})=> {
   const dispatch=useDispatch();
  
  const deleteCartItems=(id)=>{
    dispatch(removeFromCartItem(id))

}
  return (
    <div className='CartItemCard'>
        <img src={item.product?.image} alt="ssa"/>
        <div className='CartItemDetails'>
          <Link to={`/products/${item.product?.id}`}>{item.product?.name}</Link>
            <span>{`Price:₹${item.product?.price}`}</span>
            <p onClick={()=>deleteCartItems(item.product?.id)}>Remove</p>
        </div>
    </div>
  )
}
export default CartItemCard ;