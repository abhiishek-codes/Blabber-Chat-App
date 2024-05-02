import React, { useState } from "react";
import Logo from "../assets/logo-no-background.png";
import PHidelogo from "../assets/eye.png";
import PShowlogo from "../assets/hidden.png";
import { Link } from "react-router-dom";

const Login = ({ Setloginstate }) => {
  const [uname, Setuname] = useState(null);
  const [pass, Setpass] = useState(null);
  const [eyelogo, Seteyelogo] = useState(true);

  return (
    <>
      <div>
        <h1 className="text-3xl text-center">Login to your Account</h1>
        <img className="w-[30%] py-7 mx-auto" src={Logo} alt="Blabber" />
      </div>
      <div className="text-left mx-7 ">
        <div className="px-1">
          <label className="block pb-1 px-1 text-[1.1rem]">username</label>
          <input
            className="border-2 border-slate-600 rounded-md px-1 w-[100%]  h-[2rem]"
            type="text"
            name="uname"
            placeholder="Enter your username"
            value={uname}
            onChange={(e) => Setuname(e.target.value)}
            required
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
              required
            />
            <button
              className={`absolute right-2 top-1 w-[26px] hover:bg-slate-200 hover:rounded-full hover:p-[0.5px]`}
              onClick={() => Seteyelogo(!eyelogo)}
            >
              <img src={eyelogo ? PHidelogo : PShowlogo} alt="/" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center pt-10">
          <button
            className="border px-[4rem] py-[0.3rem] rounded-md bg-green-700 text-white hover:bg-slate-800 transition-all duration-300 mb-5"
            onClick={() => {
              Setuname("testuser@gmail.com");
              Setpass("1234567");
            }}
          >
            Get test Credentials
          </button>
          <button className="border px-[4rem] py-[0.3rem] rounded-md bg-green-700 text-white hover:bg-slate-800 transition-all duration-300 mb-5">
            Log In
          </button>
          <h2>
            Not registered Yet :
            <Link to="/signup">
              <button
                className="border-b-2 border-black"
                onClick={() => {
                  Setloginstate(false);
                }}
              >
                Signup
              </button>
            </Link>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Login;
