import React from "react";
import InfiniteTweetList from "./InfiniteTweetList";
import { api } from "~/trpc/react";
import { type Tweet } from "~/types";

const RecentTweets = () => {
  const tweets = api.post.infiniteTweetFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((page) => page.tweets) as Tweet[]}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNextPage={tweets.fetchNextPage}
    />
  );
};

export default RecentTweets;
