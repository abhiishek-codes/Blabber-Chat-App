import React, { useState } from "react";
import PHidelogo from "../assets/eye.png";
import PShowlogo from "../assets/hidden.png";
import { Link } from "react-router-dom";

const Signup = ({ Setloginstate }) => {
  const [uname, Setuname] = useState(null);
  const [pass, Setpass] = useState(null);
  const [eyelogo, Seteyelogo] = useState(true);
  const [peyelogo, Setpeyelogo] = useState(true);

  return (
    <div>
      <h1 className="text-3xl text-center pb-4">Where great minds blabber</h1>
      <h1 className="text-2xl text-center pb-4">Sign up today.</h1>

      <div className="text-left mx-7 ">
        <div className="px-1">
          <label className="block pb-1 px-1 text-[1.1rem]">Name</label>
          <input
            className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
            type="text"
            name="name"
            placeholder="Enter your Name"
          />
          <label className="block pt-4 pb-1 px-1 text-[1.1rem]">username</label>
          <input
            className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
            type="text"
            name="uname"
            placeholder="Enter your email"
            value={uname}
            onChange={(e) => Setuname(e.target.value)}
          />

          <label className="block pt-4 pb-1 px-1 text-[1.1rem]">password</label>
          <div className="relative">
            <input
              className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]  "
              type={eyelogo ? "password" : "text"}
              name="pass"
              placeholder="Enter your Password"
              value={pass}
              onChange={(e) => Setpass(e.target.value)}
            />
            <button
              className={`absolute right-2 top-1 w-[26px] `}
              onClick={() => Seteyelogo(!eyelogo)}
            >
              <img src={eyelogo ? PHidelogo : PShowlogo} alt="/" />
            </button>
          </div>
          <label className="block pt-4 pb-1 px-1 text-[1.1rem]">
            Reenter password
          </label>
          <div className="relative">
            <input
              className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]  "
              type={eyelogo ? "password" : "text"}
              name="rpass"
              placeholder="Enter the Same Password"
            />
            <button
              className={`absolute right-2 top-1 w-[26px] `}
              onClick={() => Setpeyelogo(!peyelogo)}
            >
              <img src={peyelogo ? PHidelogo : PShowlogo} alt="/" />
            </button>
          </div>
          <label className="block pt-4 pb-2 px-1 text-[1.1rem]">
            Upload your profile picture
          </label>
          <input type="file" id="img" name="img" accept="image/*" />
        </div>
        <div className="flex flex-col items-center pt-6">
          <button className="border px-[4rem] py-[0.3rem] rounded-md bg-green-700 text-white hover:bg-slate-800 transition-all duration-300 mb-5">
            Sign Up
          </button>
          <h2>
            Already Registered :
            <Link to="/login">
              <button
                className="border-b-2 border-black"
                onClick={() => {
                  Setloginstate(true);
                }}
              >
                Login
              </button>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
