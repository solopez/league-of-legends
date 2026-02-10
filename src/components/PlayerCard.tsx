import { Crown } from "lucide-react";
import ashe from "../assets/ashe.png";
import avatar from "../assets/avatar.png";
import cait from "../assets/cait.png";

import Model3D from "../components/Model3D";

const PlayerCard = ({
  nick,
  description,
  modelSource,
}: {
  nick: string;
  description: string;
  modelSource: string;
}) => (
  <div className="hidden lg:block">
    <div className=" w-[25rem] h-[50rem] flex flex-col items-center bg-panel border border-gold/30 rounded-sm px-8 py-6 relative overflow-hidden">
      {}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gold-gradient rounded-b " />

      {}
      <div className="relative mb-3">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary glow-gold">
          <img
            src={avatar}
            alt="Player avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {}
        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-8 border-l-2 border-t-2 border-primary/50 rounded-tl-full" />
        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-8 border-r-2 border-t-2 border-primary/50 rounded-tr-full" />
      </div>

      {}
      <div className="flex items-center gap-1 mb-1">
        <Crown className="w-4 h-4 text-primary" />
        <span className="font-semibold text-foreground tracking-wide">
          {nick}
        </span>
      </div>
      <span className="text-sm text-muted-foreground mb-4">{description}</span>
      <Model3D src={modelSource} width="400px" height="400px" />

      {}
      <div className="flex gap-3 mb-4">
        <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-primary glow-gold">
          <img
            src={modelSource === "/firecracker_caitlyn.glb" ? cait : ashe}
            alt="Player"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {}
      <div className="flex items-center gap-1">
        <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-primary/60" />
        <div className="w-4 h-4 rotate-45 bg-primary/80" />
        <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-primary/60" />
      </div>

      {}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-destructive/40 to-transparent" />
    </div>
  </div>
);

export default PlayerCard;
