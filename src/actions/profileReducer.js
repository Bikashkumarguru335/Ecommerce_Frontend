import { createSlice } from "@reduxjs/toolkit"
const profileSlice=createSlice({
    name:"profileEdit",
    initialState:{
    isUpdated:false,
    loading:true,
    isDeleted:false,
    isAuthenticated:false,
    message:false,
    error:null 
}, 
reducers:{
UPDATE_PROFILE_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
},
UPDATE_PROFILE_SUCESS:(state,action)=>{
    state.isUpdated=action.payload;
    state.loading=false;
 
},
UPDATE_PROFILE_RESET:(state)=>{
state.isUpdated=false;
},
UPDATE_PROFILE_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
},
UPDATE_USER_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
},
UPDATE_USER_SUCESS:(state,action)=>{
    state.isUpdated=action.payload;
    state.loading=false;
 
},
UPDATE_USER_RESET:(state)=>{
state.isUpdated=false;
},
UPDATE_USER_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
},
DELETE_USER_REQUEST:(state)=>{
    state.loading=true;
},
DELETE_USER_SUCCESS:(state,action)=>{
    state.loading=false;
    state.isDeleted=action.payload;
    state.message=action.payload;
},
DELETE_USER_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
},
DELETE_USER_RESET:(state)=>{
    state.isDeleted=false;
}

}
})
export default profileSlice;