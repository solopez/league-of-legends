import React from "react";

const SearchButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        className="px-12 py-3 w-70 justify-center items-center flex bg-gray-950 bg-accent text-accent-foreground font-bold text-sm tracking-[0.2em] cursor-pointer uppercase rounded-sm hover:text-[hsl(0_0%_100%)] glow-gold-hover transition-all glow-cyan border border-accent/50"
      >
        Buscar Partida
      </button>
    </div>
  );
};

export default SearchButton;
