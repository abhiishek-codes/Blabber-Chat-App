import React from "react";
import ReactDom from "react-dom";

const App = () => {
  return <div className="text-black">From React</div>;
};

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<App />);
