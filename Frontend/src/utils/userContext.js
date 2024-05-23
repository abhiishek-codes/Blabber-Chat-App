import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [allChats, setAllchats] = useState([]);
  const [searchuserId, setsearchuserId] = useState(null);
  const [activeChat, setactiveChat] = useState(null);
  const [chatName, setchatName] = useState(null);
  const [chatData, setchatData] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [isVisible, setisVisible] = useState(true); // Moved inside the component

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      const userinfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userinfo);
      setToken(userinfo?.token);
      if (!userinfo) navigate("/");
    }
  }, []); // Removed useNavigate from the dependency array

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        allChats,
        setAllchats,
        searchuserId,
        setsearchuserId,
        token,
        setToken,
        activeChat,
        setactiveChat,
        chatName,
        setchatName,
        chatData,
        setchatData,
        isVisible,
        setisVisible,
      }}
    >
      {/* Changed to an object */}
      {children}
    </userContext.Provider>
  );
};
