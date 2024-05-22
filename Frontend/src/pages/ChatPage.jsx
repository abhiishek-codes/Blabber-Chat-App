import React, { useState } from "react";
import Header from "../components/Chat/Header";
import AllChats from "../components/Chat/AllChats";
import SendMessage from "../components/Chat/SendMessage";
import useScreenSize from "../utils/useScreenSize";
import MessageBox from "../components/Chat/MessageBox";

const ChatPage = () => {
  const screenSize = useScreenSize();

  return (
    <div>
      <Header />
      <div className="flex flex-col h-[87vh] py-3 px-4 font-['Basis_Grotesque_Pro_Black'] ">
        <div className="flex justify-between h-full gap-x-4">
          {!screenSize && (
            <div className="lg:w-[30vw] xl:w-[25vw] h-full">
              <AllChats />
            </div>
          )}
          <div className=" w-[85vw] lg:w-[70vw] xl:w-[75vw] h-full mx-auto">
            <SendMessage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
