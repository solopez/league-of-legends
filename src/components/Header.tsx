import { Info, Timer } from "lucide-react";

const Header = () => (
  <header className="flex items-center gap-2 px-6 py-3 bg-bottom-bar border-b border-gold/20">
    <Timer className="w-5 h-5 text-primary" />
    <h2 className="text-sm font-semibold tracking-widest uppercase text-foreground">
      GI · URFAR · Aleatorio
    </h2>
    <Info className="w-4 h-4 text-muted-foreground ml-1 cursor-pointer hover:text-foreground transition-colors" />
  </header>
);

export default Header;
