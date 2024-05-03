import {createSlice} from "@reduxjs/toolkit";
const productSlice=createSlice({
    name:"product",
     initialState:{
        products:[],
        loading:false,
        error:null,
        success:false,
    },

    reducers:{
        ALL_PRODUCT_REQUEST:(state)=>{
            state.loading=true;
            state.error=false;
        },
        ALL_PRODUCT_SUCESS:(state,action)=>{
        return action.payload
        },
        ALL_PRODUCT_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        ADMIN_PRODUCT_REQUEST:(state)=>{
            state.loading=true;
            state.error=false;
        },
        ADMIN_PRODUCT_SUCESS:(state,action)=>{
            state.loading=false;
            state.products= action.payload;
            state.error=false;
        },
        ADMIN_PRODUCT_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload;

        },
        NEW_REVIEW_REQUEST:(state)=>{
            state.loading=true;
            state.error=false;
        },
        NEW_REVIEW_SUCCESS:(state,action)=>{
            state.loading=false;
            state.success=action.payload;
        },
        NEW_REVIEW_RESET:(state)=>{
            state.success=false;
        },
        NEW_REVIEW_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }



    }
    
})

export default productSlice;
