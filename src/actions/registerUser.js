import { createSlice } from "@reduxjs/toolkit"
import { REGISTER_USER_REQUEST,REGISTER_USER_SUCESS} from "../constants/productConstant";
import { REGISTER_USER_FAIL } from "../constants/productConstant";
const registerSlice=createSlice({
    name:"registerUser",
    initialState:{
    user:{},
    loading:false,
    error:null,        
},
reducers:{
REGISTER_USER_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
},
REGISTER_USER_SUCESS:(state,action)=>{
    state.user=action.payload; 
 
},
REGISTER_USER_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
},
}
})

export default registerSlice;