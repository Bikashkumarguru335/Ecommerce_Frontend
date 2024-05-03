import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@mui/material"
 
const About = () => {
    const visitInstagram = () => {
        window.location = "https://www.linkedin.com/in/bikashkumar-guru-304525195/";
      };
    
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dipu7jalt/image/upload/v1700209180/avatars/caf2pdtqytlr9qvhi4v6.jpg"
              alt="Founder"
            />
            <Typography>Bikash Kumar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample website made by @Bikashkumar. Only with the
              purpose to make a project on MERN Stack. 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            
              <img src="https://cdn-icons-png.flaticon.com/128/1409/1409945.png" className="" alt="Bikash"/>
            

                
            
          </div>
        </div>
      </div>
    </div>
  );
};




export default About;