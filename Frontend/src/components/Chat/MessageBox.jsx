import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext";
import axios from "axios";
import SenderCard from "./SenderCard.jsx";
import RecieverCard from "./RecieverCard.jsx";

import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const MessageBox = () => {
  const { token, activeChat } = useContext(userContext);
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const loggedinUser = user._id;
  const [allMsg, setallMsgs] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (activeChat) {
      axios
        .get(`http://localhost:5000/api/messages/${activeChat}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setallMsgs(response.data);
          selectedChatCompare = activeChat;
          socket.emit("joinChat", activeChat);
        })
        .catch((error) => console.log(error.message));
    }
  }, [activeChat]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => console.log("Connected"));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare !== newMessageRecieved.chat._id
      ) {
        // if (!notification.includes(newMessageRecieved)) {
        //   setNotification([newMessageRecieved, ...notification]);
        //   setFetchAgain(!fetchAgain);
        // }
      } else {
        setallMsgs([...allMsg, newMessageRecieved]);
      }
    });
  });

  const SendMsg = () => {
    if (msg) {
      const Data = {
        chatId: activeChat,
        content: msg,
      };
      const formdata = JSON.stringify(Data);
      setMsg("");
      axios
        .post("http://localhost:5000/api/messages", formdata, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resposnse) => {
          socket.emit("new message", resposnse.data);
          setallMsgs([...allMsg, resposnse.data]);
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className=" rounded-md h-full w-full flex flex-col ">
      <div className="flex-1 text-sm tracking-wide  py-2 flex flex-col h-[calc(100%-4rem)] overflow-y-auto hide-scrollbar gap-y-3">
        {allMsg.length > 0 &&
          allMsg.map((msg) => {
            const { content, sender, createdAt } = msg;
            const timestamp = new Date(msg.createdAt);
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes();
            return (
              <div
                className={`flex ${
                  sender._id == loggedinUser ? "justify-end" : "justify-start"
                }`}
              >
                {sender._id === loggedinUser ? (
                  <SenderCard
                    content={content}
                    hours={hours}
                    minutes={minutes}
                  />
                ) : (
                  <RecieverCard
                    content={content}
                    {...sender}
                    hours={hours}
                    minutes={minutes}
                  />
                )}
              </div>
            );
          })}
      </div>
      <div className="flex gap-x-2 mt-auto pb-2">
        <input
          type="text"
          className="rounded-sm w-full px-2 text-sm py-1 text-black"
          placeholder="Enter your message here....."
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
        />
        <button
          className="bg-green-700 text-white p-1 rounded-sm hover:bg-black transform-cpu duration-300 active:scale-75 text-xl"
          onClick={() => SendMsg()}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
