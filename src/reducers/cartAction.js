import axios from "axios";
import { ADD_TO_CART,removeCartItem } from "../actions/cartReducer";

 export const addItemsToCart=(id,quantity)=>async(dispatch,getState)=>{
    try{
     const data=await axios.get(`/api/v1/products/${id}`)
     console.log(data)
    
   const  product=data.data?.Product;

    const cartItem={
    product:{
        id:product._id,
        name:product.name,
        price:product.price,
        image:product.images[0].url,
        stock:product.stock,
     
       
    },
    quantity 
};

dispatch(ADD_TO_CART(cartItem))
 const updatedCartItems = getState().cart?.cartItems;
localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
return cartItem;

 }
 catch(error){
    console.error(error.message)
    return error.message;
 }
 }
//Remove cart Item
export const removeFromCartItem=(id)=>async(dispatch,getState)=>{
    dispatch(removeCartItem(id))
    const updateItem=getState().cart?.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(updateItem));
}


