import React,{Fragment,useState} from 'react'
import "./ShippingInfo.css";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { shipingInfo } from '../../reducers/shippingAction';
import MetaData from '../layout/metaData';
import { MdPinDrop,MdHome,MdLocationCity,MdPublic,MdPhone,MdTransferWithinAStation } from 'react-icons/md';
import {Country,State} from "country-state-city"
import CheckoutSteps from "../Cart/CheckoutSteps.js"

const ShippingInfo = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const shippingInfo=useSelector((state)=>state.shipping?.shippingInfo)
    const [address,setAddress]=useState(shippingInfo.address);
    const [city,setCity]=useState(shippingInfo.city)
    const [state,setState]=useState(shippingInfo.state)
    const [country,setCountry]=useState(shippingInfo.country)
    const [pincode,setPincode]=useState(shippingInfo.pincode)
    const [phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo)
    const shippingSubmit=(e)=>{
        e.preventDefault();
        if(phoneNo.length <10 ||phoneNo.length >10){
            alert("Phone Number Should Be 10 Digits Long");
            return;
        }
        dispatch(shipingInfo({address,city,state,country,pincode,phoneNo}));
        navigate("/order/confirm")
    }
  return (
    <Fragment>
        <MetaData title="Shipping Details"/>
        <CheckoutSteps activeStep={0}/>
        <div className='shippingContainer'>
            <div className='shippingBox'>
                <h2 className='shippingHeading'>Shipping Details</h2>
                <form className='shippingForm' encType='multipart/form-data' onSubmit={shippingSubmit}>
                <div>
                <MdHome/>
            <input type="text" placeholder='Address' required  value={address} onChange={(e)=>setAddress(e.target.value)}/>

                </div>
                <div>
                <MdLocationCity/>
            <input type="text" placeholder='City' required  value={city} onChange={(e)=>setCity(e.target.value)}/>

                </div>
                <div>
                <MdPinDrop/>
            <input type="text" placeholder='Pin Code' required  value={pincode} onChange={(e)=>setPincode(e.target.value)}/>

                </div>
            
                <div>
                <MdPhone/>
            <input type="text" placeholder='Phone Number' required  value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)}/>

                </div>
                <div>
                <MdPublic/>
            <select   required value={country} onChange={(e)=>setCountry(e.target.value)}>
                <option value="">Country</option>
                {Country && Country.getAllCountries().map((item)=>(
                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))
                    }
                    </select>
                </div>
            {country && (
            <div>
                <MdTransferWithinAStation/>
                <select required value={state} onChange={(e)=>setState(e.target.value)}>
                    <option value="">State</option>
                    {State && State.getStatesOfCountry(country).map((item)=>(
                        <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                    ))}

                </select>
            </div>
            )}
            
            <input type="submit" value="Continue" className='shippingBtn' disabled={state ? false:true}/>
                </form>
            </div>
        </div>

    </Fragment>
  )
}

export default ShippingInfo;

    