import React from 'react'
 import  {ReactNavbar} from "overlay-navbar"
 import logo from "../../../images/logo.png";
 import {FaUserAlt,FaShoppingCart,FaSearch} from "react-icons/fa"
 
 const options={
  burgerColor:"#2C3E50",
  burgerColorHover:"white",
    logo,
    logoWidth:"20vmax",
    logoHeight:"15vmax",
    logoBorder:'1px solid ',
    logoBorderRadius:"10vmax",
    navColor1:"white",
    link1Text:"Home",
    link2Text:"Products",
    link3Text:"Contact",
    link4Text:"About",
 profileIconUrl:"/login",
  link1Url:"/",
  link2Url:"/products",
  link3Url:"/contact",
  link4Url:"/about",
  linkSize:"1.2vmax",
  linkColor:"rgba(35,35,35,0.8)",
  nav1justifyContent:"flex-end",
  nav2justifyContent:"flex-end",
  nav3justifyContent:"flex-start",
  nav4justifyContent:"flex-start",
  link1ColorHover:"#eb4034",
  link1Margin:"1vmax",
   searchIcon:true,
  SearchIconElement:FaSearch,
      profileIcon:true,
      ProfileIconElement:FaUserAlt,
      cartIcon:true,
      CartIconElement:FaShoppingCart,
      
  profileIconColor:"rgba(35,35,35,0.8)",
  searchIconColor:"rgba(35,35,35,0.8)",
  cartIconColor:"rgba(35,35,35,0.8)",
  profileIconColorHover:"#eb4034",
  searchIconColorHover:"#eb4034",
  cartIconColorHover:"pink",
  cartIconMargin:"1vmax",
  
 }
const Header=()=>{
  
  return (
    <div className="logo-image"> {/* Apply CSS class to logo */}
      <ReactNavbar {...options} />
    </div>

  )
}
export default Header;