import React, { useState,Fragment ,useEffect} from 'react'
import "./UpdatePassword.css"
import {MdLock, MdVpnKey,MdLockOpen} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { updatePassword } from '../../reducers/userAction'
import { UPDATE_PASSWORD_RESET } from '../../constants/productConstant'
import MetaData from '../layout/metaData'



const UpdatePassword = () => {
const [oldPassword,setOldPassword]=useState("");
const [newPassword,setNewPassword]=useState("");
const [confirmPassword,setConfirmPassword]=useState("");

    
  const isUpdated=useSelector((state)=>state.profileUpdate)
  
  
  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const updatePasswordSubmit=(e)=>{
    e.preventDefault();
    const formDataToObj = (formData) => {
      return Array.from(formData.entries()).reduce((acc, [key, value]) => {
        if (acc[key]) {
          if (!Array.isArray(acc[key])) {
            acc[key] = [acc[key]];
          }
          acc[key].push(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {});
    };
 
    const myForm=new FormData();
    myForm.append("oldPassword",oldPassword);
    myForm.append("newPassword",newPassword);
    myForm.append("confirmPassword",confirmPassword);

    const dataObj = formDataToObj(myForm);
    console.log(dataObj);
    dispatch(updatePassword(dataObj)); 
    
   
}
    
 useEffect(()=>{
     if(isUpdated===true){
        navigate("/account")
       dispatch(UPDATE_PASSWORD_RESET()) 
    }

    },[dispatch,isUpdated,navigate])

  return (
    <Fragment>
        <MetaData title="Change Password"/>
      <div className='updatePasswordContainer'>
        <div className='updatePasswordBox'>
        <h2 className='updatePasswordHeading'>Update Password</h2>
      <form className='updatePasswordform' onSubmit={updatePasswordSubmit}>
       
      <div className='loginPassword'>
                    
                    <MdVpnKey/> 
                    <input type="password" placeholder='old Password' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                    </div>       
                    <div className='loginPassword'>
                    
                    <MdLockOpen/> 
                    <input type="password" placeholder='new Password' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                    </div>

                    <div className='loginPassword'>
                    
    <MdLock/> 
    <input type="password" placeholder='confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
    </div>
                        
                    
<input type="submit" value="Change" className='updatePasswordBtn'/>
</form>

    </div>
  </div>
</Fragment>

  )
}

export default UpdatePassword;