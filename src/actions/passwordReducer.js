import { createSlice } from "@reduxjs/toolkit"
import { UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_SUCESS, UPDATE_PASSWORD_RESET,
 UPDATE_PASSWORD_FAIL} from "../constants/productConstant";
const passwordSlice=createSlice({
    name:"passwordUpdate",
    initialState:{
    isUpdated:{},
    loading:true,
    isAuthenticated:false,
    error:null

},
reducers:{
UPDATE_PASSWORD_REQUEST:(state)=>{
    state.loading=true;
    state.error=null;
},
UPDATE_PASSWORD_SUCESS:(state,action)=>{
    state.isUpdated=action.payload;
    state.loading=false;
 
},
UPDATE_PASSWORD_RESET:(state)=>{
state.isUpdated=false;
},
UPDATE_PASSWORD_FAIL:(state,action)=>{
    state.loading=false;
    state.error=action.payload;
}
}
})
export default passwordSlice;