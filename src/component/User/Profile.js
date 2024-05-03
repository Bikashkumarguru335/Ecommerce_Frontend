import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from "react-redux"
import Metadata from "../layout/metaData"
import Loader from "../layout/Loader/loader"
import { useNavigate } from 'react-router-dom'
import "./Profile.css"

const Profile = () => {
  const {isAuthenticated,loading}=useSelector((state)=>state.userDetails)
  const user=useSelector((state)=>state.userDetails?.user?.user)

  // const users=user.data.user;
  //  console.log(data);
  const navigate=useNavigate();
  useEffect(()=>{
    if(isAuthenticated===false){
      navigate("/login")
    }
  },[navigate,isAuthenticated])
  return (
    <Fragment>
       {loading ?(<Loader/>):(
      <Fragment> 
        <Metadata title={`${user.name} 's Profile` }></Metadata>
        <div className='profileContainer'>
        <div>
            <h1>My Profile</h1>
            <img src={user?.avatar?.url} alt={user.name}/>
            <Link to="me/update">Edit Profile</Link>
        </div>
        <div>
        <div>
          <h4>Full Name</h4>
          <p>{user.name}</p>
        </div>
        <div>
          <h4>Email</h4>
          <p>{user.email}</p>
        </div>
        <div>
          <h4>Joined On</h4>
          <p>{String(user.createdAt).substr(0,10)}</p>
        </div>
        <div>
          <Link to="/orders">My Orders</Link>
          <Link to="/password/update">Change Password</Link>
          <Link to="/">Back</Link>
        </div>
        </div>
        </div>
         </Fragment>
) }
    </Fragment>
 ) 
}

export default Profile