import React, { Fragment,useEffect,useRef,useState } from 'react'
import "./SignUp.css"
import { Link} from 'react-router-dom';
import {MdMail,MdLockOpen, MdFace} from "react-icons/md"
import {useDispatch,useSelector} from "react-redux"
import { login ,register} from '../../reducers/userAction';
import {useNavigate,useLocation} from "react-router-dom"
 

const SignUp = () => {
    const isAuthenticate=useSelector((state)=>state.userDetails?.isAuthenticated)
    const location=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);

    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
     const [user,setUser]=useState({
         name:" ",
         email:" ",
         password:" ",
     })
     const {name,email,password}=user;
    const [avatar,setAvatar]=useState("../../images/profile.png");
    const [avatarPreview,setAvatarPreview]=useState("../../images/profile.png");
    
const loginSubmit=(e)=>{
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
    //  navigate("/contact");
    console.log(loginEmail,loginPassword);
    
}
const registerSubmit=(e)=>{
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
    
const  myForm=new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);
    const dataObj = formDataToObj(myForm);
       
    dispatch(register(dataObj))
    console.log(dataObj);

}
const registerDataChange=(e)=>{
    if(e.target.name==="avatar"){
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(file);
    }
    else{
        setUser({...user,[e.target.name]:e.target.value})
    }
 }

    const redirect=location.search ? location.search.split("=")[1] :"/account"
 useEffect(()=>{
     if(isAuthenticate==true){
         navigate(redirect)
        console.log("login successfully")
     }

     },[isAuthenticate,navigate])


    const switchTabs=(e,tab)=>{
        if(tab==="login"){
            switcherTab.current.classList.add("shiftToNeutral")
            switcherTab.current.classList.remove("shiftToRight")

            registerTab.current.classList.remove("shiftToNeutralForm")
            loginTab.current.classList.remove("shiftToLeft")
        }
        if(tab==="register"){
            switcherTab.current.classList.add("shiftToRight")
            switcherTab.current.classList.remove("shiftToNeutral")

            registerTab.current.classList.add("shiftToNeutralForm")
            loginTab.current.classList.add("shiftToLeft")
        }
    }
  return (
    <Fragment>
        <div className='signupContainer'>
            <div className='signupBox'>
                <div>
                <div className='signupToggle'>
                    <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                    <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
                </div>
                <form className='loginform' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        
            <MdMail/>
            <input type="email" placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>                    
            </div>
            <div className='loginPassword'>
                    
    <MdLockOpen/> 
    <input type="password" placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
    </div>
    <Link to="/password/forgot">Forget Password ?</Link>
    <input type="submit" value="login" className='loginBtn'/>
    </form>
<form className='signupform' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                    <div className='signupName'>
                        
                         <MdFace/>
                        <input type="text" placeholder='Name' required name='name' value={user.name} onChange={registerDataChange}/>                    
                    </div>
                    <div className='signupEmail'>
                        
                        <MdMail/>
                        <input type="email" placeholder='Email' required name='email' value={user.email} onChange={registerDataChange}/>
                    </div>
                        <div className='signupPassword'>
                        <MdLockOpen/>
                        <input type="password" placeholder='Password' required name='password' value={user.password} onChange={registerDataChange}/>
                        </div>
                        <div id='registerImage'>
                        <img src={avatarPreview} alt="Avatar Prevew"/>

                            <input type="file" name='avatar' accept='image/*' onChange={registerDataChange}/>
                        </div>
                    
                    <input type="submit" value="Register" className='signupBtn'/>
                </form>


            </div>

        </div>
    </Fragment>
  )
}

export default SignUp;