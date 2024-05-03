import { createSlice } from "@reduxjs/toolkit"
// import { REMOVE_CART_ITEM } from "../constants/productConstant";
const initialCartItems = () => {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
        console.error('Error parsing cartItems from localStorage:', error.message);
        return [];
    }
  };

const cartSlice=createSlice({
    name:"cart",
    initialState:{cartItems:initialCartItems()},
    reducers:{
        
        ADD_TO_CART:(state,action)=>{
            const item=action.payload;
            const isItemExist=state.cartItems.find((i)=>i.product.id===item.product.id);
            if(isItemExist){
                state.cartItems=state.cartItems.map((i)=>i.product===isItemExist.product ? item:i);
            }
            if (isItemExist) {
                isItemExist.quantity +=item.quantity;
              } 
            else{
                state.cartItems.push(item);
            }
            

        },
        removeCartItem:(state,action)=>{
        const itemId=action.payload;
        state.cartItems= state.cartItems.filter(item=>item.product.id !== itemId);
        
        // state.cartItems=state.cart?.cartItems.filter((i)=>i.product !==action.payload)
    }
     }
})
export const { ADD_TO_CART,removeCartItem }=cartSlice.actions;
 
export default cartSlice;