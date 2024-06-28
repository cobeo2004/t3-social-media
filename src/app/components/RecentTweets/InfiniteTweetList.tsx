import React from "react";
import InifiniteScroll from "react-infinite-scroll-component";
import { type InfiniteTweetListProps } from "~/types";
import TweetCard from "./TweetCard";

const InfiniteTweetList = ({
  tweets,
  isLoading,
  isError,
  hasMore,
  fetchNewTweets,
}: InfiniteTweetListProps) => {
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  if (tweets === null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Swifts</h2>
    );
  }
  return (
    <InifiniteScroll
      dataLength={tweets.length}
      next={fetchNewTweets}
      hasMore={hasMore}
      loader={"Loading"}
    >
      {tweets.map((tweet) => {
        return <TweetCard key={tweet.id} {...tweet} />;
      })}
    </InifiniteScroll>
  );
};

export default InfiniteTweetList;
