export default function EmptySlot() {
  return (
    <div
      className="hidden lg:flex flex-col items-center justify-center rounded flex-shrink-0"
      style={{
        width: "clamp(100px, 10vw, 140px)",
        minHeight: "clamp(280px, 40vh, 440px)",
        border: "1px dashed #1e1e1e",
        backgroundColor: "rgba(10,10,15,0.2)",
      }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center mb-2"
        style={{ border: "1px dashed #2a2a2a" }}
      >
        <span style={{ color: "#2a2a2a", fontSize: 16, lineHeight: 1 }}>+</span>
      </div>
      <span
        className="text-[8px] tracking-[0.25em] uppercase"
        style={{ color: "#1e1e1e" }}
      >
        Slot libre
      </span>
    </div>
  );
}
