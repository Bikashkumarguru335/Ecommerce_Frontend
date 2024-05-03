import { createSlice } from "@reduxjs/toolkit";
export const allOrderSlice=createSlice({
    name:"allOrder",
    initialState:{
        order:[],
        loading:false,
        error:null,
    },
    reducers:{
        
         ALL_ORDER_REQUEST:(state)=>{
            state.loading=true;
        },
        ALL_ORDER_SUCCESS:(state,action)=>{
            state.loading=false;
            state.order=action.payload;
        },
        ALL_ORDER_FAIL:(state,action)=>{
            state.error=action.payload;
        }

    }
})
export default allOrderSlice;