import { createSlice } from "@reduxjs/toolkit";
import {MY_ORDER_FAIL,MY_ORDER_REQUEST,MY_ORDER_SUCCESS} from "../constants/orderConstant"
export const myOrderSlice=createSlice({
    name:"myOrder",
    initialState:{
        orders:[],
        loading:false,
        error:null,
    },
    reducers:{
        MY_ORDER_REQUEST:(state)=>{
            state.loading=true;
        },
        MY_ORDER_SUCCESS:(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        },
        MY_ORDER_FAIL:(state,action)=>{
            state.loading=true;
            state.error=action.payload;
        },
        

    }
})
export default myOrderSlice;