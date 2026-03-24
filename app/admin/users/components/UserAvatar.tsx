// ─── UserAvatar – deterministic colour avatar with optional image ─────────────

import { avatarColor, initials } from "../constants";

interface Props {
  id:    string;
  name:  string;
  image: string | null;
  size?: "sm" | "md";
}

export function UserAvatar({ id, name, image, size = "sm" }: Props) {
  const dim = size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";

  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-inner ${avatarColor(id)}`}
    >
      {image ? (
        <img src={image} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        initials(name)
      )}
    </div>
  );
}
