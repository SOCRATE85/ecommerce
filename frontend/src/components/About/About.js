import React from "react";
import "./About.css";
import { Typography } from "@mui/material";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>
        <div>
          <div>
            <Typography>Socrate Liale</Typography>
            <span>This is created by Socrate Liale</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
