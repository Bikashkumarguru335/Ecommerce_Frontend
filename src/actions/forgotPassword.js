import { createSlice } from "@reduxjs/toolkit";
const forgotSlice=createSlice({
    name:"forgotPassword",
    initialState:{
    loading:false,
    message:"",
    error:null        
}, 
reducers:{
FORGOT_PASSWORD_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
},
FORGOT_PASSWORD_SUCESS:(state,action)=>{
    state.loading=false;
    state.message=action.payload; 
 
},
FORGOT_PASSWORD_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
}
}
})
export default forgotSlice;