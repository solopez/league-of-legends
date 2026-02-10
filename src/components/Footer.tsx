import { X } from "lucide-react";
type FooterProps = {
  setShowWallpaper: React.Dispatch<React.SetStateAction<boolean>>;
};
const Footer = ({ setShowWallpaper }: FooterProps) => (
  <>
    <footer className="bg-bottom-bar border-t border-gold/20 px-6 py-4 flex items-center justify-center gap-6">
      <button className="cursor-pointer glow-gold-hover w-10 h-10 rounded-full border border-muted-foreground/40 flex items-center justify-center hover:border-destructive hover:text-destructive transition-colors text-muted-foreground">
        <X className="w-5 h-5 " />
      </button>
      <button
        onClick={() => setShowWallpaper(true)}
        className="px-12 py-3 bg-accent text-accent-foreground font-bold text-sm tracking-[0.2em] cursor-pointer uppercase rounded-sm hover:text-[hsl(0_0%_100%)] glow-gold-hover transition-all glow-cyan border border-accent/50"
      >
        Buscar Partida
      </button>
    </footer>
    <div className="text-xs text-muted-foreground text-center mt-4 px-4">
      Models provided by{" "}
      <a
        href="https://modelviewer.lol/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-accent"
      >
        modelviewer.lol
      </a>
      . This website is inspired by the real game{" "}
      <strong>League of Legends</strong>. I do not own any rights to the game,
      characters, or models shown here.
    </div>
  </>
);

export default Footer;
