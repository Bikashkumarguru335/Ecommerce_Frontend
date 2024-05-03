 import { createSlice } from "@reduxjs/toolkit"
 
const productDetailsSlice=createSlice({
    name:"productDetails",
    initialState:{
    product:[],
    loading:false,
    error:null,
    isUpdated:false,        
},
    reducers:{
        PRODUCT_DETAILS_REQUEST:(state)=>{
            state.loading=true;
            state.error=null;
        },
        PRODUCT_DETAILS_SUCCESS:(state,action)=>{
            return action.payload; 
         
        },
        PRODUCT_DETAILS_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        },
        UPDATE_PRODUCT_REQUEST:(state)=>{
            state.loading=true;
            state.error=false;
      
        },
    UPDATE_PRODUCT_SUCCESS:(state,action)=>{
    state.loading=false;
    state.isUpdated=action.payload;
 },
 UPDATE_PRODUCT_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;

  },
  UPDATE_PRODUCT_RESET:(state)=>{
    state.isUpdated=true;
  },
    }
    
})
export default productDetailsSlice;