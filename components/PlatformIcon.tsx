import { Twitter, Instagram, Music2, Youtube } from "lucide-react";
import { SocialPlatform } from "@/types";

const map: Record<SocialPlatform, { icon: any; bg: string; color: string }> = {
  x: { icon: Twitter, bg: "bg-black", color: "text-white" },
  instagram: { icon: Instagram, bg: "bg-gradient-to-tr from-pink-500 to-yellow-400", color: "text-white" },
  tiktok: { icon: Music2, bg: "bg-black", color: "text-white" },
  youtube: { icon: Youtube, bg: "bg-red-600", color: "text-white" },
};

export default function PlatformIcon({ platform, size = 16 }: { platform: SocialPlatform; size?: number }) {
  const { icon: Icon, bg, color } = map[platform];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${bg} ${color}`}
      style={{ width: size + 8, height: size + 8 }}
    >
      <Icon size={size * 0.65} />
    </span>
  );
}
