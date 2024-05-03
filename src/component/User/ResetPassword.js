import React, { useState,Fragment ,useEffect} from 'react'
import "./ResetPassword.css"
import {MdLock,MdLockOpen} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { resetPassword } from '../../reducers/userAction'
import MetaData from '../layout/metaData'
import { useParams } from 'react-router-dom'


const ResetPassword = () => {
    
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    
        
    const success=useSelector((state)=>state.resetPassword?.success?.data.sucess)
    const data=useParams();  

      const navigate=useNavigate();
      const dispatch=useDispatch();
      
      const resetPasswordSubmit=(e)=>{
        e.preventDefault();

        const myForm=new FormData();
        
        myForm.append("password",password);
        myForm.append("confirmPassword",confirmPassword);
        const extractedData = {};
        myForm.forEach((value, key) => {
          extractedData[key] = value;
        });

        let Token=data.token;
        let passwords=extractedData
        dispatch(resetPassword(Token,passwords)); 
       
    }
        
     useEffect(()=>{
         if(success===true){
            alert("updated successfully")
            navigate("/login")
         
        }
    
        },[success,navigate,password,confirmPassword])
    
      return (
        <Fragment>
            <MetaData title="Reset Password"/>
          <div className='resetPasswordContainer'>
            <div className='resetPasswordBox'>
            <h2 className='resetPasswordHeading'>Reset Password</h2>
          <form className='resetPasswordform' onSubmit={resetPasswordSubmit}>
           
    <div className='loginPassword'>
    <MdLockOpen/> 
    <input type="password" placeholder='Password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
    </div>
    
    <div className='loginPassword'>
    <MdLock/> 
        <input type="password" placeholder='confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
                            
                        
    <input type="submit" value="Update" className='resetPasswordBtn'/>
    </form>
    
        </div>
      </div>
    </Fragment>
    
      )
}

export default ResetPassword;