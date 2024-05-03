import {createSlice} from "@reduxjs/toolkit";
import { DELETE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS } from "../constants/productConstant";
//these are the reducers
const productsSlice=createSlice({
    name:"product",
     initialState:{
        loading:false,
        isDeleted:false,
        error:null
    },
    reducers:{
        DELETE_PRODUCT_REQUEST:(state)=>{
            state.loading=true;
            state.error=false;
              },
              DELETE_PRODUCT_SUCCESS:(state,action)=>{
                state.loading=false;
                state.isDeleted=action.payload;
                
            },
            DELETE_PRODUCT_FAIL:(state,action)=>{
              state.loading=false;
              state.error=action.payload
            },
            DELETE_PRODUCT_RESET:(state,action)=>{
              state.isDeleted=false;
            }
            
    }
})
export default productsSlice