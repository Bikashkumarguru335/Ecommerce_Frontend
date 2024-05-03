import { createSlice } from "@reduxjs/toolkit";
const allReviewsSlice=createSlice({
    name:"allReviews",
    initialState:{
     reviews:[],
    loading:false,
    error:null,
    isDeleted:false,        
    },
    reducers:{
        
        ALL_REVIEWS_REQUEST:(state)=>{
            state.loading=true;
        },
        ALL_REVIEWS_SUCCESS:(state,action)=>{
            state.loading=false;
            state.reviews=action.payload
        },
        ALL_REVIEWS_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }, DELETE_REVIEW_REQUEST:(state)=>{
            state.loading=true;
        },
        DELETE_REVIEW_SUCCESS:(state,action)=>{
            state.loading=false;
            state.reviews=null;
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
export default allReviewsSlice