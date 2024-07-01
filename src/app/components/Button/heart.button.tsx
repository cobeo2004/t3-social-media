import { useSession } from "next-auth/react";
import React from "react";
import { VscHeart, VscHeartFilled } from "react-icons/vsc";
import IconHoverEffect from "../functions/IconHover.effect";

type HeartButtonProps = {
  likeCount: number;
  likedByMe: boolean;
  isLoading: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const HeartButton = ({
  likedByMe,
  likeCount,
  onClick,
  isLoading,
}: HeartButtonProps) => {
  const sess = useSession();
  const HeartIcon = likedByMe ? VscHeartFilled : VscHeart;
  if (sess.status !== "authenticated") {
    return (
      <div className="mb-1 mt-1 flex items-center gap-3 self-start text-gray-500">
        <HeartIcon />
        <span>{likeCount}</span>
      </div>
    );
  }
  return (
    <button
      disabled={isLoading}
      title="Like"
      onClick={onClick}
      className={`group flex items-center gap-1 self-start transition-colors duration-200 ${likedByMe ? "text-red-500" : "text-gray-500 hover:text-red-500 focus-visible:text-red-500"}`}
    >
      <IconHoverEffect red>
        <HeartIcon
          className={`transition-colors duration-200 ${likedByMe ? "fill-red-500" : "fill-gray-500 group-hover:fill-red-500 group-focus-visible:fill-red-500"}`}
        />
      </IconHoverEffect>
      <span>{likeCount}</span>
    </button>
  );
};

export default HeartButton;
