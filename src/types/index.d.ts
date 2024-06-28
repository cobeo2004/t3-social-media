import {
    type ButtonHTMLAttributes,
    type DetailedHTMLProps
} from "react"

export declare type ButtonProps = Partial<{
    small: boolean;
    gray: boolean;
    className: string;
}> &
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export declare type Tweet = {
    id: string;
    content: string;
    createdAt: Date;
    likeCount: number;
    likedByMe: boolean;
    user: {
        id: string;
        image: string | null;
        name: string | null;
    };
};

export declare type InfiniteTweetListProps = {
    tweets: Array<Tweet>;
    isLoading: boolean;
    isError: boolean;
    hasMore: boolean;
    fetchNewTweets: () => Promise<unknown>;
};
export declare type IconHoverEffectProps = {
    children: React.ReactNode;
    red: boolean;
};
