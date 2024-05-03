import axios from "axios"
import loaduserSlice from "../actions/LoadReducer";
import registerSlice from "../actions/registerUser";
import profileSlice from "../actions/profileReducer";
import passwordSlice from "../actions/passwordReducer";
import forgotSlice from "../actions/forgotPassword";
import resetPasswordSlice from "../actions/resetPassword";
import allUserSlice from "../actions/allUserReducer";
import userDetailsSlice from "../actions/userDetailsReducer";


const {ALL_USERS_REQUEST,ALL_USERS_SUCCESS,ALL_USERS_FAIL}=allUserSlice.actions;
const {USER_DETAILS_REQUEST,USER_DETAILS_SUCCESS,USER_DETAILS_FAIL}=userDetailsSlice.actions;
const  { REGISTER_USER_REQUEST,REGISTER_USER_SUCESS,REGISTER_USER_FAIL}=registerSlice.actions;
const {LOAD_USER_REQUEST,LOAD_USER_FAIL,LOAD_USER_SUCCESS,LOGOUT_SUCCESS,LOGOUT_FAIL,LOGIN_REQUEST,LOGIN_SUCESS,LOGIN_FAIL}=loaduserSlice.actions;
const {UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_SUCESS,UPDATE_PROFILE_FAIL,UPDATE_USER_REQUEST,UPDATE_USER_SUCESS,UPDATE_USER_FAIL
   , DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAIL}=profileSlice.actions;
const { UPDATE_PASSWORD_REQUEST,UPDATE_PASSWORD_SUCESS,UPDATE_PASSWORD_FAIL}=passwordSlice.actions;
const {FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCESS,FORGOT_PASSWORD_FAIL}=forgotSlice.actions;
const {RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCESS,RESET_PASSWORD_FAIL}=resetPasswordSlice.actions;


    //login
    export const login=(email,password)=>async(dispatch)=>{
        
        try{ 
            dispatch(LOGIN_REQUEST())
          
            const data=await axios.post("/api/v1/login",{email,password})
            console.log(data)
            dispatch(LOGIN_SUCESS(data.data))
            localStorage.setItem('userLogin', JSON.stringify(data.data));
        }
        catch(error){
            
            dispatch(LOGIN_FAIL(error.message))
        }
    } 

//logout user
    export const logout=()=>async(dispatch)=>{
        try{
            await axios.get("api/v1/logout")
             dispatch(LOGOUT_SUCCESS())
            //  localStorage.removeItem("userLogin")
            console.log("Logout Successfully")
        }
        catch(error){
            dispatch(LOGOUT_FAIL(error.message))
        }

    }
    //register     
    export const register=(userData)=>async(dispatch)=>{
    try{
        dispatch(REGISTER_USER_REQUEST())
        
    const data=await axios.post("/api/v1/register",userData)
    dispatch(REGISTER_USER_SUCESS(data))
    }
    catch(error)
    {
    
    dispatch(REGISTER_USER_FAIL(error.message))
    }
    }
    //load user
    export const loadUser=()=>async(dispatch)=>{
        try{
            
            dispatch(LOAD_USER_REQUEST())
          
            const data=await axios.get("/api/v1/me")
            console.log(data)
            dispatch(LOAD_USER_SUCCESS(data.data))
        }
        catch(error){
            
            dispatch(LOAD_USER_FAIL(error.message))
        }
    }
    // update profile 
    export const updateProfile =(userData)=>async(dispatch)=>{
        try{
            dispatch(UPDATE_PROFILE_REQUEST())
        const response=await axios.put("/api/v1/me/update",userData)
        dispatch(UPDATE_PROFILE_SUCESS(response))
        
        }
        catch(error)
        {
            
            dispatch(UPDATE_PROFILE_FAIL(error.message))
        }
        }
        //update password
        export const updatePassword =(passwords)=>async(dispatch)=>{
            try{
                dispatch(UPDATE_PASSWORD_REQUEST())
            const response=await axios.put("/api/v1/password/update",passwords)
            dispatch(UPDATE_PASSWORD_SUCESS(response))
            
            }
            catch(error)
            {
                
                dispatch(UPDATE_PASSWORD_FAIL(error.message))
            }
            }
//forgot password
    export const forgotPassword=(myForm)=>async(dispatch)=>{
                try{
                    console.log(myForm)

                    dispatch(FORGOT_PASSWORD_REQUEST())
                    const data=await axios.post("/api/v1/password/forgot",myForm)

                dispatch(FORGOT_PASSWORD_SUCESS(data))
                console.log(data);
 
                }
                catch(error){
                    dispatch(FORGOT_PASSWORD_FAIL(error.message))
                }
            }
//reset password
export const resetPassword=(token,passwords)=>async(dispatch)=>{
    try{
        console.log(token,passwords)
        dispatch(RESET_PASSWORD_REQUEST())
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          };
      
        const data=await axios.put(`/api/v1/password/reset/${token}`,{passwords},config)
        dispatch(RESET_PASSWORD_SUCESS(data))
          console.log(data)
    }
    catch(error){
        dispatch(RESET_PASSWORD_FAIL(error.message))
    }
}
//get all users
export const getAllUsers=()=>async(dispatch)=>{
    try{
        
        dispatch(ALL_USERS_REQUEST())
      
        const data=await axios.get("/api/v1/admin/users")
        console.log(data)
        dispatch(ALL_USERS_SUCCESS(data.data.users))
    }
    catch(error){
        
        dispatch(ALL_USERS_FAIL(error.message))
    }
}
//get  users details
export const getUsersDetails=(id)=>async(dispatch)=>{
    try{

dispatch( USER_DETAILS_REQUEST())
      
        const data=await axios.get(`/api/v1/admin/user/${id}`)
        
        dispatch(USER_DETAILS_SUCCESS(data.user))
    }
    catch(error){
        
        dispatch(USER_DETAILS_FAIL(error.message))
    }
}
//update user
export const updateUser =(id,userData)=>async(dispatch)=>{
    try{
        dispatch(UPDATE_USER_REQUEST())
        const config={headers:{"Content-Type":"application/json"}}
    const response=await axios.put(`/api/v1/admin/user/${id}`,userData,config)
    console.log(response)
    dispatch(UPDATE_USER_SUCESS(response.success))
    
    }
    catch(error)
    {
        
        dispatch(UPDATE_USER_FAIL(error.message))
    }
    }
//delete user
    export const deleteUser =(id)=>async(dispatch)=>{
        try{
            dispatch(DELETE_USER_REQUEST())
        const response=await axios.delete(`/api/v1/admin/user/${id}`)
        console.log(response);
        dispatch(DELETE_USER_SUCCESS(response.success))
        
        }
        catch(error)
        {
            
            dispatch(DELETE_USER_FAIL(error.message))
        }
        }
    