import { createSlice } from "@reduxjs/toolkit"
const loaduserSlice=createSlice({
    name:"loadUser",
    initialState:{
     user:{},
    loading:false,
    isAuthenticated:false,
    error:null        
    
}, 
reducers:{
LOAD_USER_REQUEST:(state)=>{
    state.loading=true;
    state.isAuthenticated=true;
    state.error=null;
},
LOAD_USER_SUCCESS:(state,action)=>{
    state.user=action.payload;
    state.isAuthenticated=true; 
    state.loading=false;
},
LOAD_USER_FAIL:(state,action)=>{
    state.loading=false;
    state.user=null;
    state.isAuthenticated=false;
    state.error=action.payload;
},
LOGIN_REQUEST:(state)=>{
    state.loading=true;
    state.isAuthenticated=false;
    state.error=null;
    
},
LOGIN_SUCESS:(state,action)=>{
    state.user=action.payload;
    state.isAuthenticated=true;
    state.loading=false;
    //  state.isLogedIn=true;
    //  localStorage.setItem('loginState',JSON.stringify(state))
},
LOGIN_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
},

LOGOUT_SUCCESS:(state)=>{
    state.loading=false;
     state.user={};
    state.isAuthenticated=false;
    state.error=null;
},
LOGOUT_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;

}
}
})
export default loaduserSlice;