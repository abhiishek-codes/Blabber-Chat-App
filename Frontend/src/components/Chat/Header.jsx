import { useContext, useState, useEffect } from "react";
import { userContext } from "../../utils/userContext";
import React from "react";
import axios from "axios";
import UsersCard from "./UsersCard";
import { useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";

const Header = () => {
  const { user, setUser } = useContext(userContext);
  const { allChats, setAllchats, setactiveChat, activeChat, setchatData } =
    useContext(userContext);
  const [sbar, setsbar] = useState(false);
  const [suser, setsuser] = useState("");
  const [users, setusers] = useState([]);
  const [filterusers, setfilterusers] = useState(users);
  const [tgProfile, settgProfile] = useState(false);
  const userinfo = JSON.parse(localStorage.getItem("userInfo"));
  const [profileCard, setprofileCard] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    console.log(userinfo);
    const token = userinfo.token;

    axios
      .get(`http://localhost:5000/api/users/?search=${suser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setusers([]);
        setusers(response.data);
        setsuser("");
        console.log("Searched User");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const LogoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const handleToggleProfile = (event) => {
      if (!event.target.closest(".profile-dropdown")) {
        settgProfile((prevValue) => false);
      }

      if (!event.target.closest(".side-bar")) {
        setsbar((prevValue) => false);
      }
    };

    document.addEventListener("click", handleToggleProfile);

    return () => {
      document.removeEventListener("click", handleToggleProfile);
    };
  }, []);

  return (
    <>
      <div className="bg-slate-900 text-white py-5 px-6 ">
        <div className="flex justify-between items-center font-['Basis_Grotesque_Pro_Black']">
          <div>
            <button
              className="inline-block px-3 py-2 bg-white hover:bg-slate-100 text-black rounded-lg transition-transform duration-200 transform-gpu active:scale-95 text-sm sm:text-md side-bar"
              onClick={() => setsbar(!sbar)}
            >
              🔍 Search for User
            </button>
          </div>
          <h1 className="hidden md:block text-3xl tracking-wide transform -translate-x-3">
            Blabber : The Chat App
          </h1>
          <div className="inline-block relative">
            <button
              className="hover:bg-white hover:text-black px-4 py-2 hover:rounded-md cursor-pointer flex items-center justify-center gap-x-2 profile-dropdown transition-transform duration-200 transform-gpu active:scale-75"
              onClick={() => settgProfile(!tgProfile)}
            >
              <img src={userinfo?.pic} alt="Profile" className="w-10 h-10" />
              <h1>▼</h1>
            </button>
          </div>
        </div>
      </div>

      {/* Profile drop down*/}

      <div
        className={`profile-dropdown fixed right-0 py-2 z-50 flex-col justify-center items-center  px-10 bg-slate-900 text-white  text-center transform transition-transform duration-200 ease-in-out font-['Basis_Grotesque_Pro_Black'] ${
          tgProfile ? "translate-y-0" : "-translate-y-48 "
        }`}
      >
        <button
          className="mb-2 block hover:bg-white hover:text-black px-3 py-2 rounded-md transition-transform duration-200 transform-gpu active:scale-75"
          onClick={() => {
            settgProfile(false);
            setprofileCard(true);
          }}
        >
          Profile
        </button>
        <button
          className="mb-1 block hover:bg-white hover:text-black transition-all duration-300 px-3 py-2 rounded-md transform-gpu active:scale-75"
          onClick={() => LogoutHandler()}
        >
          Logout
        </button>
      </div>

      {/* Sidebar with animation */}
      <div
        className={`side-bar fixed inset-y-0 left-0 w-[75%] md:w-[45%]  xl:w-[30%] h-screen bg-white z-50 text-center transform transition-transform duration-500 ease-in-out font-['Basis_Grotesque_Pro_Black'] ${
          sbar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="py-5 w-[95%] mx-auto px-4">
          <h1 className="text-xl pb-5">Search for users</h1>
          <div className="flex justify-between items-center  mx-auto gap-x-4">
            <input
              type="text"
              placeholder="Search for users"
              className="w-full py-2 px-1 rounded-lg bg-white border-2 border-black text-black"
              value={suser}
              onChange={(e) => setsuser(e.target.value)}
            />
            <button
              className="text-3xl  transition-transform duration-100 transform-gpu active:scale-75 "
              onClick={() => {
                clickHandler();
                setusers([]);
              }}
            >
              🔍
            </button>
          </div>
        </div>
        {users != undefined && (
          <div className="flex-col  justify-center items-center w-[95%] mx-auto px-4">
            {users.map((val, index) => {
              return (
                <div className="pb-5  text-md md:text-lg ">
                  <UsersCard
                    {...val}
                    key={index}
                    idx={index}
                    data={val}
                    setsbar={setsbar}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div
        className={`fixed z-50 top-[50%] left-[50%] font-['Basis_Grotesque_Pro_Black'] transform -translate-x-[50%] -translate-y-[50%] transition-opacity duration-500 ${
          profileCard ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <div className="relative">
          <ProfileModal {...userinfo} />
        </div>

        <div className="absolute top-[24%] right-[5%] sm:top-[25%] sm:right-[7%] ">
          <button onClick={() => setprofileCard(false)}>❌</button>
        </div>
      </div>

      {/* Overlay when ProfileCard is active */}
      {profileCard && (
        <div className="fixed inset-0 bg-black opacity-80 z-40 "></div>
      )}

      {/* Overlay when sidebar is active */}
      {sbar && <div className="fixed inset-0 bg-black opacity-80 z-40"></div>}
    </>
  );
};

export default Header;
