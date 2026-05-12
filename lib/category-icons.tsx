import { Key, Sun, MapPin, Dumbbell, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategoryIconConfig = {
  icon: LucideIcon;
  bg: string;
  color: string;
};

export const CATEGORY_ICONS: Record<string, CategoryIconConfig> = {
  "s-installer":  { icon: Key,       bg: "bg-forest/10",     color: "text-forest"          },
  "vie-pratique": { icon: Sun,        bg: "bg-terracotta/10", color: "text-terracotta-dark"  },
  villes:         { icon: MapPin,     bg: "bg-forest/10",     color: "text-forest"          },
  sport:          { icon: Dumbbell,   bg: "bg-terracotta/10", color: "text-terracotta-dark"  },
  "travail-visa": { icon: Briefcase,  bg: "bg-forest/10",     color: "text-forest"          },
};
