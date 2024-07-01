/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tweetRouter = createTRPCRouter({
  infiniteTweetFeed: publicProcedure
    .input(z.object({ limit: z.number().optional(), cursor: z.object({ id: z.string(), createdAt: z.date() }).optional() }))
    .query(async ({ input: { limit = 10, cursor }, ctx }) => {
      const userId = ctx.session?.user.id;

      const tweets = await ctx.db.tweet.findMany({
        take: limit + 1,
        cursor: cursor ? { createdAt_id: cursor } : undefined,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        select: {
          id: true,
          content: true,
          createdAt: true,
          _count: { select: { likes: true } },
          likes: userId === null ? false : { where: { userId: userId } },
          user: {
            select: { name: true, id: true, image: true }
          }
        }
      })

      let nextCursor: typeof cursor | undefined;

      if (tweets.length > limit) {
        const nextItem = tweets.pop();
        if (nextItem !== null)
          nextCursor = { id: nextItem!.id, createdAt: nextItem!.createdAt }
      }

      return {
        tweets: tweets.map((tweet) => {
          return {
            id: tweet.id,
            content: tweet.content,
            createdAt: tweet.createdAt,
            likeCount: tweet._count.likes,
            user: { ...tweet.user },
            likedByMe: tweet.likes.length > 0
          }
        }), nextCursor
      }
    }),
  create: protectedProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ input: { content }, ctx }) => {
      return await ctx.db.tweet.create({ data: { content, userId: ctx.session.user.id } });
    }),
  toggleLike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id }, ctx }) => {
      const data = { tweetId: id, userId: ctx.session.user.id };
      const existedTweetLike = await ctx.db.like.findUnique({
        where: { userId_tweetId: data }
      })

      if (existedTweetLike === null) {
        await ctx.db.like.create({ data });
        return { likeAdded: true }
      } else {
        await ctx.db.like.delete({ where: { userId_tweetId: data } });
        return { likeAdded: false }
      }
    })
});
