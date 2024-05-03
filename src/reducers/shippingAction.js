import { setShippingInfo } from "../actions/shippinginfoReducer";

export const shipingInfo=(data)=>async(dispatch,getState)=>{
    try{
        dispatch(setShippingInfo(data))
        console.log(data)
        const updateShipping=getState().shipping?.shippingInfo;
    localStorage.setItem("shipingInfo",JSON.stringify(updateShipping));
}
catch(error){
    alert(error.message);
    console.log(error.message)
}
 }
 