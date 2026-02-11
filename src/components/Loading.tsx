import React from "react";
import gameMap from "../assets/map.png";
import logo from "../assets/logo.png";

const Loading: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center w-screen h-screen cursor-pointer"
      style={{ backgroundImage: `url(${gameMap})` }}
    >
      <div>
        <img src={logo} alt="Logo LoL" className="w-70 h-70" />

        <span className="text-yellow-400 tracking-widest text-xl mb-4 justify-center flex">
          <strong>LOADING</strong>
        </span>

        <div className="w-72 h-4 rounded-full bg-gray-900 overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 progress"
            style={{ width: "65%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
