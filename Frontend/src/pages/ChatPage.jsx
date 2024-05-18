import React, { useState } from "react";
import Header from "../components/Chat/Header";
import AllChats from "../components/Chat/AllChats";
import SendMessage from "../components/Chat/SendMessage";

const ChatPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col h-[87vh] py-3 px-4 font-['Basis_Grotesque_Pro_Black'] ">
        <div className="flex justify-between h-full gap-x-4">
          <div className="lg:w-[32vw] xl:w-[25vw] h-full">
            <AllChats />
          </div>
          <div className=" w-[85vw] lg:w-[68vw] xl:w-[75vw] h-full mx-auto">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
