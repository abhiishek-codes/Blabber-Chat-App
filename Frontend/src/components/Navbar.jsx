import React, { useState, useEffect } from "react";
import Navlink from "./NavLinks";
import { Link } from "react-router-dom";
import Logo from "url:../assets/Mobile.mp4";
import Hamburger from "url:../assets/Hamburger.png";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  const togglemenu = () => {
    setToggle(!toggle);
  };

  const handleResize = () => {
    if (window.innerWidth >= 767) {
      setToggle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <nav className="w-screen h-auto">
      <div className="w-[90%] font-['Basis_Grotesque_Pro_Black'] mx-auto pt-2">
        <div className="flex  items-center justify-between">
          {/* Video */}
          <div className="flex-shrink-0">
            <Link to="/">
              <video loop autoPlay muted className="h-[100px] scale-110">
                <source src={Logo} type="video/mp4" />
              </video>
            </Link>
          </div>

          {/* Links */}

          <div className=" flex-grow text-center hidden md:flex justify-center items-center">
            <ul className="flex gap-8">
              <Navlink />
            </ul>
          </div>

          {/* Login */}
          <div className="text-center hidden md:block">
            <Link
              className=" bg-green-300 py-3 px-8 rounded-md hover:scale-110 transition-all hover:text-white inline-block"
              to="/signup"
            >
              Signup
            </Link>
          </div>

          {/* Mobile View */}
          {/* Hamburger Icon */}

          <div className="md:hidden">
            <button className="border-none " onClick={togglemenu}>
              <img
                src={Hamburger}
                alt="Hamburger"
                className="transform scale-150"
              />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={` shadow-lg pb-2 rounded-sm  ${
            toggle ? "block" : "hidden"
          } animate-[slideIn_1s] `}
        >
          <ul className="flex flex-col items-center justify-center gap-y-3  mx-auto">
            <Link
              className=" bg-green-300 py-2 px-6 rounded-md hover:scale-105 transition-all hover:text-white  hidden md:inline-block"
              to="/login"
            >
              Login
            </Link>
            <Navlink toggle={toggle} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
