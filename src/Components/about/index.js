import React from "react";
import { Link } from "react-router-dom";
 

import AboutValue from "./about-page/AboutValue.js";
import AboutChoice from "./about-page/AboutChoice.js";
import AboutProcess from "./about-page/AboutProcess.js";
import AbouTeam from "./about-page/AbouTeam.js";
import AboutFeartured from "./about-page/AboutFeartured.js";
import Abouttest from "./about-page/Abouttest.js";
import Aboutdest from "./about-page/Aboutdest.js";
import AboutFoot from "./about-page/AboutFoot.js";
import AboutHero from "./about-page/AboutHero.js";


 

const About = () => {
  return (
    <div className="">
    
      <AboutHero/>
      <AboutValue/>
      <AbouTeam/>
      <AboutChoice/>
      {/* <AboutProcess/>
    
      <AboutFeartured/> */}
      <Abouttest/>
      <Aboutdest/>
      <AboutFoot/>
  
    </div>
  );
};

export default About;