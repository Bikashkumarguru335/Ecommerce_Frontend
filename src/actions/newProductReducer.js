import { createSlice } from "@reduxjs/toolkit";

const newProduct=createSlice({
  name:"newProductCreate",
    initialState:{
       products:[],
        loading:false,
        error:null
    },
    reducers:{
    NEW_PRODUCT_REQUEST:(state)=>{
            state.loading=true;
            state.error=false;
      
        },
 NEW_PRODUCT_SUCCESS:(state,action)=>{
    state.loading=false;
    state.products=action.payload;
 },
  NEW_PRODUCT_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;

  },
  NEW_PRODUCT_RESET:(state)=>{
    state.success=false;
  },
  
    }
})
export default newProduct;