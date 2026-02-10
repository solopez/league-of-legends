import { Plus } from "lucide-react";

const EmptySlot = () => (
  <div className="flex flex-col items-center gap-2 ">
    <div className="glow-gold-hover w-20 h-20 rounded-full border-2 border-muted-foreground/40 flex items-center justify-center hover:border-primary/60 transition-colors cursor-pointer group">
      <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
    </div>
  </div>
);

export default EmptySlot;
