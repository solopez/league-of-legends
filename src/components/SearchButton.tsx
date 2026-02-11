import React from "react";

const SearchButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="glow-gold-btn px-12 py-4 w-70 justify-center items-center flex bg-gray-950 bg-accent text-accent-foreground font-bold text-sm tracking-[0.2em] cursor-pointer uppercase rounded-md hover:text-[hsl(0_0%_100%)] transition-all glow-gold border border-accent/50 hover:bg-gradient-to-r from-[#ad9407] to-[#412c01]"
    >
      Buscar Partida
    </button>
  );
};

export default SearchButton;
