import React from "react";
import HomeVideo from "url:../assets/Social media.mp4";
import Global from "url:../assets/Globalization.mp4";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="w-[90vw] pt-3 mx-auto   lg:-translate-x-7">
        <h1 className="font-mono text-center  text-2xl sm:text-4xl">
          Blabber: Where conversations never end !
        </h1>
        <div className="sm:flex items-center justify-center ">
          <div className="w-85vw mx-auto sm:w-1/2 overflow-hidden">
            <video loop autoPlay muted className="w-full sm:w-[80%]  mx-auto">
              <source src={HomeVideo} type="video/mp4" />
            </video>
          </div>
          <div
            className="sm:w-[40%]
           font-['Basis']  my-auto text-center overflow-hidden"
          >
            <h1 className="text-xl text-center sm:text-2xl sm:text-left sm:pt-5">
              Blabber Makes it easy and fun to stay in touch & communicate
              anywhere anyplace with anyone
            </h1>
            <div className="hidden sm:block pt-5 ">
              <video loop autoPlay muted className="w-[78%]  mx-auto ">
                <source src={Global} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
        <div className="mt-4 translate-y-0 sm:mx-auto sm:-translate-y-4 translate-x-1 text-center">
          <Link
            className="px-5 py-1 sm:px-10 sm:py-2 rounded-lg bg-green-700 text-white hover:bg-slate-800 transition-all block-inline duration-300  "
            to="/login"
          >
            Start Messaging
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
