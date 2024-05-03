import { createSlice } from "@reduxjs/toolkit";
const allUserSlice=createSlice({
    name:"allUsers",
    initialState:{
     users:[],
    loading:false,
    error:null        
    },
    reducers:{
        ALL_USERS_REQUEST:(state)=>{
            state.loading=true;
        },
        ALL_USERS_SUCCESS:(state,action)=>{
            state.loading=false;
            state.users=action.payload
        },
        ALL_USERS_FAIL:(state,action)=>{
            state.loading=false;
            state.error=action.payload
        }
    }

})
export default allUserSlice; 