import React from "react";

const MessageBox = () => {
  return (
    <div className="border border-black rounded-md h-full w-full flex flex-col ">
      <div className="flex gap-x-2 mt-auto">
        <input
          type="text"
          className="rounded-sm w-full px-2 text-sm py-1 text-black"
          placeholder="Enter your message here....."
        />
        <button className="bg-green-700 text-white p-1 rounded-sm hover:bg-black transform-cpu duration-300 active:scale-75 text-xl">
          ➤
        </button>
      </div>
    </div>
  );
};

export default MessageBox;
