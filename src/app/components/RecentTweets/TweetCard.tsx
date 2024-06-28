import Link from "next/link";
import React from "react";
import { type Tweet } from "~/types";
import ProfileImage from "../ProfileImage";
import HeartButton from "../Button/heart.button";

const TweetCard = ({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Tweet) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    dateStyle: "short",
  });
  return (
    <li className="flex gap-4 border-b px-4 py-4">
      <Link href={`/profiles/${user.id}`}>
        <ProfileImage src={user.image!} />
      </Link>
      <div className="flex flex-grow flex-col">
        <div className="flex gap-1">
          <Link
            href={`/profiles/${user.id}`}
            className="font-bold outline-none hover:underline focus-visible:underline"
          >
            {user.name}
          </Link>
          <span className="text-gray-400"> - </span>
          <span className="text-gray-500">
            {dateFormatter.format(createdAt)}
          </span>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
        <HeartButton likeCount={likeCount} likedByMe={likedByMe} />
      </div>
    </li>
  );
};

export default TweetCard;
