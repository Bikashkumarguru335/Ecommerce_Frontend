import MetaData from '../layout/metaData'
import React, { Fragment, useState ,useEffect} from 'react'
import "./ForgotPassword.css"
import { MdMail} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {forgotPassword} from '../../reducers/userAction'


const ForgotPassword = () => {
const dispatch=useDispatch();
const user=useSelector((state)=>state.loginDetailsuser?.data?.user)
const message=useSelector((state)=>state.forgotPasword)
  
const [email,setEmail]=useState("")
const forgotPasswordSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();
    myForm.set("email",email)
    dispatch(forgotPassword(myForm));
    
   
}
useEffect(()=>{
    if(message){
        console.log(message);
    }
},[message])
  return (
    <Fragment>
        <MetaData title="Forgot Password"/>
    <div className='forgotPasswordContainer'>
      <div className='forgotPasswordBox'>
      <h2 className='forgotPasswordHeading'>Forgot Password</h2>
    <form className='forgotPasswordform'  onSubmit={forgotPasswordSubmit}>
     
     <div className='forgotPasswordEmail'>
<MdMail/>
<input type="email" placeholder='Email' required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
</div>
                      
                  
<input type="submit" value="send" className='forgotPasswordBtn'/>
</form>

  </div>
</div>

</Fragment>
  )
}

export default ForgotPassword