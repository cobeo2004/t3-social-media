/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import Link from "next/link";
import React from "react";
import { type Tweet } from "~/types";
import ProfileImage from "../ProfileImage";
import HeartButton from "../Button/heart.button";
import { api } from "~/trpc/react";

const TweetCard = ({
  id,
  user,
  content,
  createdAt,
  likeCount,
  likedByMe,
}: Tweet) => {
  const trpcUtils = api.useUtils();
  const toggleLikeMutation = api.post.toggleLike.useMutation({
    onSuccess: ({ likeAdded }) => {
      const updateData: Parameters<
        typeof trpcUtils.post.infiniteTweetFeed.setInfiniteData
      >[1] = (oldData) => {
        if (oldData === null) return;
        const countMod = likeAdded ? 1 : -1;
        return {
          ...oldData,
          pages: oldData?.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((tweet) => {
                if (tweet.id === id) {
                  return {
                    ...tweet,
                    likeCount: tweet.likeCount + countMod,
                    likedByMe: likeAdded,
                  };
                }
                return tweet;
              }),
            };
          }),
        };
      };
      trpcUtils.post.infiniteTweetFeed.setInfiniteData({}, updateData);
    },
  });

  const handleLike = () => {
    toggleLikeMutation.mutate({ id });
  };

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
        <HeartButton
          likeCount={likeCount}
          likedByMe={likedByMe}
          onClick={handleLike}
          isLoading={toggleLikeMutation.isPending}
        />
      </div>
    </li>
  );
};

export default TweetCard;
