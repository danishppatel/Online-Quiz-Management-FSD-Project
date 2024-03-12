import React from "react";
import { NavLink } from "react-router-dom";
import logo from '/images/about1.jpg';

function AboutUs() {
  return (
    <section className="about-us">
      <div className="about mx-auto mt-16">
      <img src={logo} className="pic" alt="person logo" />
        <div className="text">
          <h2 >About Us</h2>
        
          <h3 className="text-3xl mb-4 ">Our Dream is Global Learning Transformation</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            natus ad sed harum itaque ullam enim quas, veniam accusantium, quia
            animi id eos adipisci iusto molestias asperiores explicabo cum vero
            atque amet corporis! Soluta illum facere consequuntur magni. Ullam
            dolorem repudiandae cumque voluptate consequatur consectetur, eos
            provident necessitatibus reiciendis corrupti!
          </p>
          <div className="data">
            <NavLink  className="hire">
              Hire Me
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
