import { createSlice } from "@reduxjs/toolkit";
const reviewsSlice=createSlice({
    name:"allReviews",
    initialState:{
     isDeleted:false,
    loading:false,
    error:null        
    },
    reducers:{
        DELETE_REVIEW_REQUEST:(state)=>{
            state.loading=true;
        },
        DELETE_REVIEW_SUCCESS:(state,action)=>{
            state.loading=false;
            state.isDeleted=action.payload
        },
        DELETE_REVIEW_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        DELETE_REVIEW_RESET:(state)=>{
            state.isDeleted=false;
        }
    }

})
export default reviewsSlice;