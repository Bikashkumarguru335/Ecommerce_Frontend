import { createSlice } from "@reduxjs/toolkit"
const storedShippingInfo =localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo")):{};

const shippingSlice=createSlice({
    name:"shippingInfo",
        initialState:{
            shippingInfo:storedShippingInfo ||null,
            error:null
        },
        reducers:{
            setShippingInfo:(state,action)=>{
                state.shippingInfo=action.payload;
                state.error=false;
                
            }

        }}) 
         export const {setShippingInfo} = shippingSlice.actions;

        export default shippingSlice;