/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Videocard from "../components/Videocard";
import Login from "../components/Login";
import Signup from "../components/Signup";

const LoginSignupUser = () => {
  const [loginstate, Setloginstate] = useState(false);
  return (
    <div className="flex justify-center items-center ">
      <div className="w-[85%] h-[95%]  p-[1.5rem]">
        <div className="flex justify-evenly  tracking-wide">
          <div className="md:w-[40%] pt-4 font-['Basis_Grotesque_Pro_Black']">
            {loginstate ? (
              <Login Setloginstate={Setloginstate} />
            ) : (
              <Signup Setloginstate={Setloginstate} />
            )}
          </div>
          <div className="hidden md:block w-[60%] mx-auto">
            <Videocard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupUser;
