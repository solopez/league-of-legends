import React from "react";
import gameMap from "../assets/map.png";
import logo from "../assets/logo.png";

const Win: React.FC = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex items-center justify-center w-screen h-screen cursor-pointer"
      style={{ backgroundImage: `url(${gameMap})` }}
    >
      <div>
        <img src={logo} alt="Logo LoL" className="w-70 h-70" />

        <span className="text-yellow-400 tracking-widest text-xl mb-4 justify-center flex">
          <strong>VICTORY</strong>
        </span>
      </div>
    </div>
  );
};

export default Win;
