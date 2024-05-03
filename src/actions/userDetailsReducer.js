import { createSlice } from "@reduxjs/toolkit";
const userDetailsSlice=createSlice({
    name:"userDetails",
    initialState:{
     user:{},
    loading:false,
    error:null        
    },
    reducers:{
        USER_DETAILS_REQUEST:(state)=>{
            state.loading=true;
        },
        USER_DETAILS_SUCCESS:(state,action)=>{
            state.loading=false;
            state.user=action.payload
        },
        USER_DETAILS_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
    }

})
export default userDetailsSlice; 