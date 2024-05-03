import React, { Fragment, useState ,useEffect} from 'react'
import "./updateProfile.css"
import { MdFace,MdMail} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { loadUser,updateProfile } from '../../reducers/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/productConstant'

const UpdateProfile = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [avatar,setAvatar]=useState("../../images/profile.png");
  const [avatarPreview,setAvatarPreview]=useState("../../images/profile.png");

  const user=useSelector((state)=>state.loginDetails?.user?.data?.user)
  const isUpdated=useSelector((state)=>state.profileUpdate?.isUpdated)
  
  
  const navigate=useNavigate();
  const dispatch=useDispatch();

  
  const updateProfileSubmit=(e)=>{
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
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("avatar",avatar);
    const dataObj = formDataToObj(myForm);
    console.log(dataObj);
    dispatch(updateProfile(dataObj));
   
}
const updateProfileDataChange=(e)=>{
        const reader=new FileReader();
        reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result)
                setAvatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    

 useEffect(()=>{
    if(user){
      setName(user.name);
      setEmail(user.email)
      setAvatarPreview(user.avatar.url)
    }

     if(isUpdated){
       dispatch(loadUser())
       navigate("/account")
       dispatch(UPDATE_PROFILE_RESET()) 
    }

    },[dispatch,isUpdated,navigate,user])

  return (
    <Fragment>
      <div className='updateProfileContainer'>
        <div className='updateProfileBox'>
        <h2 className='updateProfileHeading'>Update profile</h2>
      <form className='updateProfileform' encType="multipart/form-data" onSubmit={updateProfileSubmit}>
       
       
<div className='updateProfileName'>
  <MdFace/>
<input type="text" placeholder='Name' required name='name' value={name} onChange={(e)=>setName(e.target.value)}/>                    
 </div>

<div className='updateProfileEmail'>
<MdMail/>
  <input type="email" placeholder='Email' required name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
  </div>
                        
<div id='updateProfileImage'>
<img src={avatarPreview} alt="Avatar Preview"/>
<input type="file" name='avatar' accept='image/*' onChange={updateProfileDataChange}/>
</div>
                    
<input type="submit" value="updateProfile" className='updateProfileBtn'/>
</form>

    </div>
  </div>
</Fragment>
  )
}

export default UpdateProfile;