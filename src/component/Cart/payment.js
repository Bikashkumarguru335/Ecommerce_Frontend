import React,{Fragment,useRef} from 'react'
import "./payment.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MetaData from '../layout/metaData';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from "@stripe/react-stripe-js";
import axios from 'axios';
 
import { MdCreditCard,MdEvent,MdVpnKey } from 'react-icons/md';
import { Typography } from '@mui/material';
import { createOrder } from '../../reducers/orderAction'
// import { loadStripe } from '@stripe/stripe-js'


const Payment = () =>{
const orderInfo=JSON.parse(sessionStorage.getItem("orderInfo"))

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null);
    
    const shippingInfo=useSelector((state)=>state.shipping?.shippingInfo)
    const cartItems=useSelector((state)=>state.cart?.cartItems)
    const user=useSelector((state)=>state.userDetails?.user?.user)
    // const token=useSelector((state)=>state.userDetails?.user?.token)
     console.log(orderInfo)
     console.log(cartItems)
     
    
    const paymentData={
        amount:Math.round(orderInfo.totalPrice)
       
    }
    const formattedCartItems = cartItems.map(item => ({
        name: item.product?.name,
        price: item.product?.price,
        quantity:item.quantity,
        image: item.product?.image,
        product: item.product?.id 
      }));

    const order={
        shippingInfo,
        orderItems:formattedCartItems,
        itemPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }
    const submitHandler=async (e)=>{
        e.preventDefault();
        console.log(order);
        
        


    // const strike=await loadStripe("pk_test_51NcTJ4SHy2c8RzPKnpZurVxR12IuxVHYSjBdXeHpf5p07uxhEonbKUKmWYI5d64TDPtWv0YjBhDof7a6ZH1XfrO500FrYqMZcZ")
   
payBtn.current.disabled=true;
try{
    const config={
        headers:{
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
           } 
    }
        const {data}=await axios.post("/api/v1/payment/process",paymentData,config)
        console.log(data);
        const client_secret=data.client_secret
     
    console.log(client_secret);
     if(!stripe || !elements) return;
     const result= await stripe.confirmCardPayment(client_secret,{
        payment_method:{
             card:elements.getElement(CardNumberElement),
             billing_details:{
                name:user.name,
                email:user.email,
                address:{
                    line1:shippingInfo.address,
                    city:shippingInfo.city,
                    state:shippingInfo.state,
                    postal_code:shippingInfo.pincode,
                    country:shippingInfo.country

                },
            },

        },
    })
    // if(result){
    //     console.log(typeof(result.paymentIntent.status));
    // }
    if(result.error){
        payBtn.current.disabled=false;
    
        console.error(result.error.message)
    }
    else{
        if(result.paymentIntent.status==="succeeded")
        {
            
             console.log(result.paymentIntent.status)
             order.paymentInfo={
                  id:result.paymentIntent.id,
                  status:result.paymentIntent.status,
              }
              console.log(order);
              dispatch(createOrder(order))
            navigate("/success")
        }
        else{
            console.error("There is an error while processing payment")
        }
    }

 }
 catch(error){
    payBtn.current.disabled=false;
// // console.error(error.response.data.message)
 }
    }
  return (
    <Fragment>
        <MetaData title="Payment"/>
        <CheckoutSteps activeStep={2}/>
        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={(e)=>submitHandler(e)}>
                <Typography>Card Info</Typography>
                
                 <div>
                    <MdCreditCard/>
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                    <MdEvent/>
                    <CardExpiryElement className='paymentInput'/>
                </div>
                <div>
                    <MdVpnKey/>
                    <CardCvcElement className='paymentInput'/>
                </div>
                
                <input type="submit" value={`Pay-₹${orderInfo && orderInfo.totalPrice}`} ref={payBtn} 
                className="paymentFormBtn"/> 
            </form>
        </div>
    </Fragment>
  )
}

export default Payment