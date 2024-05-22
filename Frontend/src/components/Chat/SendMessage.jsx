import React, { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext.js";
import getSender from "../../utils/getSender.js";
import ProfileModal from "./ProfileModal.jsx";
import GcModal from "./GcModal.jsx";
import MessageBox from "../Chat/MessageBox.jsx";

const SendMessage = ({ chatName, groupAdmin, users, _id }) => {
  const { activeChat, chatData } = useContext(userContext);
  const [tgProfile, settgProfile] = useState(false);
  const [gcProfile, setgcProfile] = useState(false);

  if (chatData != null) {
    const { groupChat } = chatData;
    const idx = getSender(chatData.users) == chatData.users[0].name ? 0 : 1;
    return (
      <>
        <div className="w-full h-full border-2 border-black rounded-lg text-white flex flex-col px-3 pt-5 pb-2 gap-y-3 text-xl bg-slate-900">
          <div className="flex  items-center justify-between">
            <h1>{groupChat ? chatData.chatName : getSender(chatData.users)}</h1>
            <button
              onClick={() =>
                !groupChat ? settgProfile(true) : setgcProfile(true)
              }
              className="bg-white rounded-md"
            >
              👁️‍🗨️
            </button>
          </div>
          <MessageBox />
        </div>

        {tgProfile && (
          <>
            <div
              className={`fixed z-50 top-[50%] left-[50%] font-['Basis_Grotesque_Pro_Black'] transform -translate-x-[50%] -translate-y-[50%] transition-opacity duration-500 ${
                tgProfile ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <div className="relative">
                <ProfileModal {...chatData.users[idx]} />
              </div>

              <div className="absolute top-[24%] right-[5%] sm:top-[25%] sm:right-[7%] ">
                <button onClick={() => settgProfile(false)}>❌</button>
              </div>
            </div>

            <div className="fixed inset-0 bg-black opacity-80 z-40 "></div>
          </>
        )}

        {gcProfile && (
          <>
            <div
              className={`fixed z-50 top-[50%] left-[50%] font-['Basis_Grotesque_Pro_Black'] transform -translate-x-[50%] -translate-y-[50%] transition-opacity duration-500 text-black ${
                gcProfile ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <GcModal {...chatData} setgcProfile={setgcProfile} />
            </div>

            <div className="fixed inset-0 bg-black opacity-80 z-40 "></div>
          </>
        )}
      </>
    );
  }
};

export default SendMessage;
