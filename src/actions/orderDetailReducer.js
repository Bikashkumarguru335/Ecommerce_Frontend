import { createSlice } from "@reduxjs/toolkit";
export const orderDetailsSlice=createSlice({
    name:"orderDetails",
    initialState:{
        order:{},
        loading:false,
        error:null,
    },
    reducers:{
        ORDER_DETAILS_REQUEST:(state)=>{
            state.loading=true;
        },
        ORDER_DETAILS_SUCCESS:(state,action)=>{
            state.loading=false;
            state.order=action.payload;
        },
        ORDER_DETAILS_FAIL:(state,action)=>{
            state.loading=true;
            state.error=action.payload;
        },
        

    }
})
export default orderDetailsSlice;