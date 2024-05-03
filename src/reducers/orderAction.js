import axios from 'axios'
import orderModifySlice from '../actions/orderModifySlice';
import myOrderSlice from '../actions/orderSlice';
import newOrderSlice from '../actions/orderReducer'; 
import orderDetailsSlice from '../actions/orderDetailReducer';
import allOrderSlice from '../actions/allOrderReducer';
const  { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS }=orderDetailsSlice.actions;
const {MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL}=myOrderSlice.actions;
 const   { CREATE_ORDER_REQUEST,CREATE_ORDER_FAIL,CREATE_ORDER_SUCCESS,}=newOrderSlice.actions;
const {UPDATE_ORDER_REQUEST ,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAIL,
     DELETE_ORDER_REQUEST, DELETE_ORDER_FAIL,DELETE_ORDER_SUCCESS}=orderModifySlice.actions;
const {ALL_ORDER_REQUEST,ALL_ORDER_FAIL,ALL_ORDER_SUCCESS}=allOrderSlice.actions;
//create order
export const createOrder=(order)=>async(dispatch)=>{
    
        try{
            console.log(order)
            dispatch(CREATE_ORDER_REQUEST())
            const config={
                headers:{
                    "Content-Type":"application/json",
                },
            };
            const result=await axios.post("/api/v1/order/new",order,config)
            console.log(result)
    //    result && result.map((item)=>{
    //             console.log(item)
    //         })
         dispatch(CREATE_ORDER_SUCCESS(result.data))
    }
    catch(error){
        dispatch(CREATE_ORDER_FAIL(error.message))
    }
}
// result.then((resolvedData) => {
//     const {data}=resolvedData;
//     console.log(data)
//     )}

//my orders
export const myOrders=()=>async(dispatch)=>{
    
    try{
        dispatch(MY_ORDER_REQUEST())
        
        const data=await axios.get("/api/v1/orders/me")
        console.log(data)
    dispatch(MY_ORDER_SUCCESS(data?.data?.orders))
}
catch(error){
    dispatch(MY_ORDER_FAIL(error.message))
}
}
// get order details
export const getOrderDetails=(id)=>async(dispatch)=>{
    
    try{
        dispatch(ORDER_DETAILS_REQUEST())
        
        const data=await axios.get(`/api/v1/order/${id}`)
        console.log(data?.data?.order)
    dispatch(ORDER_DETAILS_SUCCESS(data?.data?.order))
}
catch(error){
    dispatch(ORDER_DETAILS_FAIL(error.message))
}
}

//get all orders(admin)
export const getAllOrders=()=>async(dispatch)=>{
    
    try{
        dispatch(ALL_ORDER_REQUEST())
        
        const data=await axios.get("/api/v1/admin/orders")
        console.log(data.data?.orders)
    dispatch(ALL_ORDER_SUCCESS(data.data?.orders))
}
catch(error){
    dispatch(ALL_ORDER_FAIL(error))
}
}
//update order(admin)
export const updateOrders=(id,order)=>async(dispatch)=>{
    
    try{
        dispatch(UPDATE_ORDER_REQUEST())
        const config={
            headers:{
                "Content-Type":"application/json",
            },
        };
        const data=await axios.put(`/api/v1/admin/order/${id}`,order,config)
    dispatch(UPDATE_ORDER_SUCCESS(data))
}
catch(error){
    dispatch(UPDATE_ORDER_FAIL(error.message))
}
}
//delete order(admin)
export const deleteOrder=(id)=>async(dispatch)=>{
    
    try{
        dispatch(DELETE_ORDER_REQUEST())
        // const config={
        //     headers:{
        //         "Content-Type":"application/json",
        //     },
        // };
        const data=await axios.delete(`/api/v1/admin/order/${id}`)
    dispatch(DELETE_ORDER_SUCCESS(data))
}
catch(error){
    dispatch(DELETE_ORDER_FAIL(error.message))
}
}
