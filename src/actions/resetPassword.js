import { createSlice } from "@reduxjs/toolkit"
import { RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCESS,RESET_PASSWORD_FAIL} from "../constants/productConstant";
const resetPasswordSlice=createSlice({
    name:"resetPassword",
    initialState:{
    loading:true,
    message:"",
    success:"",
    error:null

},
reducers:{
RESET_PASSWORD_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
},
RESET_PASSWORD_SUCESS:(state,action)=>{
    state.loading=false;
    state.success=action.payload;
},
RESET_PASSWORD_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
}
}
})
export default resetPasswordSlice;