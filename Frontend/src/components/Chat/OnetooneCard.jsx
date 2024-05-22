import React from "react";
import { useContext } from "react";
import { userContext } from "../../utils/userContext";

const OnetooneCard = ({ data }) => {
  const { users } = data;
  const { latestMessage } = data;
  if (users) {
    const name = users[1].name;
    return (
      <div className="flex flex-col">
        <p className="text-[1em]">{name}</p>
        <div className="flex text-[0.8em]">
          <p>{latestMessage?.sender?.name}</p>
          <p>{latestMessage?.content}</p>
        </div>
      </div>
    );
  }
};

export default OnetooneCard;
