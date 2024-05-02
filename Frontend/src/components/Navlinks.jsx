import React from "react";
import { Link } from "react-router-dom";

const Navlink = ({ toggle }) => {
  return (
    <>
      {["Features", "AboutUs", "ContactUs"].map((val, index) => {
        return (
          <li>
            <Link
              className={`${
                toggle
                  ? "hover:underline inline-block hover:scale-105 transition-all "
                  : "hover:bg-green-300 px-4 py-2 inline-block hover:scale-105 transition-all rounded-lg"
              }`}
              to={"/" + val}
              key={index}
            >
              {val}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default Navlink;
