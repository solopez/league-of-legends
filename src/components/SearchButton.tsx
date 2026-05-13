interface SearchButtonProps {
  onClick: () => void;
  label: string;
}

export default function SearchButton({ onClick, label }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-10 py-3 rounded text-xs font-bold tracking-[0.22em] uppercase cursor-pointer transition-all duration-200 hover:opacity-88"
      style={{
        backgroundColor: "#C89B3C",
        color: "#0A0A0F",
        border: "1px solid #C89B3C",
      }}
    >
      {label}
    </button>
  );
}
