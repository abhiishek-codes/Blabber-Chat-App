import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext";
import axios from "axios";
import Avatar from "./Avatar";

const CreateGc = () => {
  const [gcName, setGcName] = useState("");
  const [gcUserSearch, setGcUserSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [gcUsers, setGcUsers] = useState([]);
  const { token } = useContext(userContext);
  const [toggle, settoggle] = useState(false);

  useEffect(() => {
    console.log(gcUserSearch);
    axios
      .get(`http://localhost:5000/api/users/?search=${gcUserSearch}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setSearchUsers(response.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [gcUserSearch]);

  return (
    <>
      <div className="w-full relative">
        <div className=" border-black h-full w-full flex flex-col justify-center items-center gap-y-5">
          <h1 className="text-xl pt-5">Create Group Chat</h1>
          <input
            type="text"
            className="w-[70%] border-2 px-2 py-1 rounded-md"
            placeholder="Enter Group Name"
            value={gcName}
            onChange={(e) => setGcName(e.target.value)}
          />
          <input
            type="text"
            className="w-[70%] border-2 px-2 py-1 rounded-md"
            placeholder="Add Users eg Dad Mom"
            value={gcUserSearch}
            onChange={(e) => {
              settoggle(true);
              setGcUserSearch(e.target.value);
            }}
          />

          {toggle && searchUsers.length > 0 && (
            <div className="w-[70%] max-h-60 overflow-y-auto hide-scrollbar border-2 border-black rounded-md mt-2">
              {searchUsers.map((val, idx) => (
                <button
                  key={idx}
                  className="w-full border-b border-black bg-slate-50 py-2 text-left hover:bg-green-400 transition-all duration-200 hover:border-white"
                  onClick={() => {
                    setGcUsers((prev) => {
                      if (prev.includes(val)) return prev;
                      return [...prev, val];
                    });
                    settoggle(false);
                    setGcUserSearch("");
                  }}
                >
                  <div className="flex gap-x-3 items-center px-2">
                    <Avatar name={val.name} />
                    <div className="flex-col gap-y-2">
                      <h1>{val.name}</h1>
                      <h1>{val.email}</h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {gcUsers.length > 0 && (
            <div className="flex flex-wrap items-center w-[70%] gap-x-1 gap-y-2">
              {gcUsers.map((val) => {
                return (
                  <div className="flex items-center px-2 gap-x-3 py-[2px] justify-between text-sm  rounded-md bg-black text-white">
                    <h1 className="text-[0.9em]">{val.name}</h1>
                    <button>✖</button>
                  </div>
                );
              })}
            </div>
          )}

          <button className=" text-white bg-black rounded-md px-3 py-2 text-sm transform-cpu duration-300 active:scale-75">
            Create Chat
          </button>
        </div>
        <button
          className="absolute top-0 right-2 text-bold text-xl  transform-cpu duration-300 active:scale-75"
          onClick={() => settoggle(false)}
        >
          ✖
        </button>
      </div>
    </>
  );
};

export default CreateGc;
