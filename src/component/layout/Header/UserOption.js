import React, { Fragment, useState } from 'react'
import "../Header/Header.css"
import {Backdrop} from '@mui/material'
import { SpeedDial,SpeedDialAction} from "@mui/material"
import { MdDashboard,MdPerson,MdExitToApp,MdListAlt ,MdShoppingCart} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../../../reducers/userAction'

const UserOption = ({user}) => {
const cartItems=useSelector((state)=>state.cart?.cartItems)
  const [open,setOpen]=useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
const options=[ {icon:<MdPerson />,name:"Profile",func:account},
{icon:<MdShoppingCart style={{color:cartItems.length> 0 ? "tomato" :"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
  {icon:<MdExitToApp />,name:"Logout",func:logoutUser}];

if(user && user.role==="admin"){
  options.unshift({icon:<MdListAlt/>,name:"Orders",func:orders})
  options.unshift({icon:<MdDashboard/>,name:"Dashboard",func:dashboard})}
  else{
    return
  }
function dashboard(){ navigate("/admin/dashboard")}
function orders(){navigate("/admin/orders")}
function account(){navigate("/account")}
function cart(){navigate("/cart")}
function logoutUser(){
  dispatch(logout()).then(() => {window.location.reload();navigate("/login")})
  .catch(error => {console.error('Logout failed:', error);});}
  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial ariaLabel="Speed Dial Component" open={open} onClose={()=>setOpen(false) } onOpen={()=>setOpen(true) } style={{ zIndex: "11"}}direction="down"className='speedDial'
icon={<img className='speedDialIcon' src={user?.avatar?.url ? user?.avatar?.url:"/Profile.png"} alt="Profile"/>}>
{options.map((item)=>(<SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} 
tooltipOpen={window.innerWidth<=600?true:false}/>))} </SpeedDial> </Fragment>)}
export default UserOption;