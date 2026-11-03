import React from "react";
import logo from "../assets/logoAF.png";
import { FaLinkedinIn, FaGithub, FaInstagram, FaTwitterSquare } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <img className="mx-2 w-28" src={logo} alt="logo"></img>
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a href="https://www.linkedin.com/in/adefisayo-adejumo/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com/Beloved1310" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        {/* <a href="https://www.instagram.com/your-username" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a> */}
        <a href="https://twitter.com/deoluwafisayomi" target="_blank" rel="noopener noreferrer">
          <FaTwitterSquare />
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
