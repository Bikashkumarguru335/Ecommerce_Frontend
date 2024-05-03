import React from 'react'
 import playStore from "../../../images/playStore.png"
 import appSore from "../../../images/appStore.png"
 import "./Footer.css";
 const  Footer=()=>{
   return(
   <footer id="footer">
  <div className='leftFooter'>
      <h4>DOWNLOAD OUR APP</h4>
      <p>Download App For Andriod And Ios Mobile Phone</p>
      <img src={playStore} alt="PlayStore"/>
      <img src={appSore} alt="AppStore"/>
  </div>
    <div className="midFooter">
      <h1>ECOMMERCE.</h1>
      <p>High Quality Is Our First Priority</p>
      <p>Copyrights 2023 &Copy: BikashKumar</p>
  </div>

  <div className="rightFooter">
      <h4>Fallow Us</h4>
      <a href="https://www.linkedin.com/in/bikashkumar-guru-304525195/">LinkedIn</a>
  </div> 

      </footer>

  )
}
export default Footer;