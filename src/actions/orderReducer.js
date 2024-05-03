import { createSlice } from "@reduxjs/toolkit";
import {CREATE_ORDER_FAIL,CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,ALL_ORDER_FAIL} from "../constants/orderConstant"
export const newOrderSlice=createSlice({
    name:"newOrder",
    initialState:{
        order:[],
        loading:false,
        error:null,
    },
    reducers:{
        CREATE_ORDER_REQUEST:(state)=>{
            state.loading=true;
        },
        CREATE_ORDER_SUCCESS:(state,action)=>{
            state.loading=false;
            state.order=action.payload;
        },
        CREATE_ORDER_FAIL:(state,action)=>{
            state.loading=true;
            state.error=action.payload;
        },
        
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
export default newOrderSlice;