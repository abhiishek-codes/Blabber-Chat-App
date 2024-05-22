import React from "react";
import GroupchatCard from "./groupchatCard";
import OnetooneCard from "./onetooneCard";
import { userContext } from "../../utils/userContext";
import { useContext } from "react";

const ChatUserCard = ({ groupChat, data, idx }) => {
  const {
    searchuserId,
    setsearchuserId,
    token,
    setAllchats,
    setactiveChat,
    activeChat,
    chatData,
    setchatData,
  } = useContext(userContext);
  // console.log(data);
  return (
    <button
      onClick={() => {
        setactiveChat(data._id);
        setchatData(data);
      }}
      className={`border-2 px-2 py-2 rounded-md w-full text-left transition-all duration-300 ${
        data._id == activeChat
          ? "bg-black text-white hover:bg-black hover:text-white"
          : " hover:bg-black hover:text-white"
      }`}
    >
      {/* {console.log(activeChat)} */}
      {groupChat == true ? (
        <GroupchatCard data={data} />
      ) : (
        <OnetooneCard data={data} />
      )}
    </button>
  );
};

export default ChatUserCard;
