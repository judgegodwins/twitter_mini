import { FC, forwardRef } from "react";
import ProfileMock from "images/p.jpg";
import Ellipsis from "svg/Ellipsis.svg";
import Comment from "svg/Comment.svg";
import Retweet from "svg/Retweet.svg";
import Like from "svg/Like.svg";
import Share from "svg/Share.svg";
import { borderClasses } from "helpers/tailwindClasses";
import { Link } from "react-router-dom";
import { EllipsisIcon } from "./IconButton";
import { Tweet } from "types/tweet";

interface TweetActionTrayProps {
  tweetDetail?: boolean;
  actionNumbers?: {
    comments: number;
    retweets: number;
    likes: number;
  };
}

interface TweetCardProps {
  tweet: Tweet;
  hasParent?: boolean;
  threaded?: boolean;
}

export const TweetActionTray: FC<TweetActionTrayProps> = ({
  actionNumbers,
  tweetDetail,
}) => {
  return (
    <div
      className={`flex w-full ${
        tweetDetail ? "justify-around" : "justify-between"
      } gap-x-2`}
    >
      <TweetAction actionNumber={actionNumbers && actionNumbers.comments}>
        <TweetActionIcon Svg={Comment} largerIcon={tweetDetail} />
      </TweetAction>

      <TweetAction actionNumber={actionNumbers && actionNumbers.retweets}>
        <TweetActionIcon Svg={Retweet} largerIcon={tweetDetail} />
      </TweetAction>

      <TweetAction actionNumber={actionNumbers && actionNumbers.likes}>
        <TweetActionIcon Svg={Like} largerIcon={tweetDetail} />
      </TweetAction>

      <TweetAction>
        <TweetActionIcon Svg={Share} largerIcon={tweetDetail} />
      </TweetAction>
    </div>
  );
};

export const TweetAction: FC<{
  actionNumber?: number;
}> = ({ children, actionNumber }) => (
  <div className="flex justify-start shrink-0 items-center cursor-pointer transition-colors">
    <div className="flex outline-none min-h-[19px] justify-center">
      <div className="flex justify-start whitespace-nowrap transition-colors text-sm break-words items-center">
        <div className="inline-flex flex-col items-stretch shrink-0">
          {children}
        </div>
        {actionNumber && (
          <div className="inline-flex flex-col items-stretch shrink-0 overflow-hidden">
            <span className="dark:text-slate-500 px-2 text-[13px] leading-[15px]">
              {actionNumber}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export const TweetActionIcon: FC<{ Svg: any; largerIcon?: boolean }> = ({
  Svg,
  largerIcon,
}) => (
  <Svg
    className={`inline-block dark:fill-slate-500 ${
      largerIcon ? "w-6 h-6" : "w-[17.5px] h-[17.5px]"
    } align-text-bottom`}
  />
);

export const TweetImage: FC<{ image: any }> = ({ image }) => (
  <div className="img-holder w-full h-fit mt-3">
    <div className="relative border border-lightborder dark:border-darkborder border-solid rounded-2xl">
      <a href="" className="relative h-fit w-full">
        <img
          src={image}
          alt="Profile"
          className="object-cover w-full h-full rounded-2xl -z-10"
        />
      </a>
    </div>
  </div>
);

export const TweetText: FC<{ lg?: boolean }> = ({ children, lg }) => (
  <div className="flex">
    <span
      className={`${
        lg ? "text-2xl" : "text-sm"
      } font-normal dark:text-white break-words`}
    >
      {children}
    </span>
  </div>
);

export const UpperThreadLineContainer = () => (
  <div className="flex w-full">
    <div className="relative shrink-0 grow-0 basis-12 mr-3">
      <div className="absolute top-0 left-0 right-0 bottom-0 w-0.5 mx-auto mb-1 bg-lightborder dark:bg-dark-threadline"></div>
    </div>
    <div className="grow pt-3"></div>
  </div>
);

export const ProfileContainer: FC<Pick<TweetCardProps, "threaded">> = ({
  threaded,
}) => (
  <div className="flex flex-col basis-12 shrink-0 grow-0 mr-3">
    <div className="flex">
      <img
        src={ProfileMock}
        alt="Profile"
        className="object-cover w-12 h-12 rounded-full"
      />
    </div>
    {threaded && (
      <div className="w-0.5 grow shrink mx-auto mt-1 bg-lightborder dark:bg-dark-threadline"></div>
    )}
  </div>
);

const TweetCard = forwardRef<HTMLDivElement, TweetCardProps>(
  ({ tweet, threaded, hasParent }, ref) => (
    <div
      className={`last:border-0 ${
        threaded ? "border-0" : "border-b"
      } ${borderClasses}`}
    >
      <Link to={`/status/${tweet.id}`}>
        <div ref={ref} className={`tweet-card px-4 w-full`}>
          {hasParent && <UpperThreadLineContainer />}
          <div className={`flex w-full ${!hasParent ? "pt-3" : ""}`}>
            <ProfileContainer threaded={threaded} />
            <div className="flex flex-col grow">
              <div className="flex justify-between">
                <div className="flex">
                  <div className="">
                    <span className="text-sm font-semibold truncate dark:text-white">
                      {tweet.user.name}
                    </span>
                  </div>
                  <div className="">
                    <span className="text-sm truncate text-slate-400 ml-0.5">
                      @{tweet.user.username}
                    </span>
                  </div>
                </div>
                <div className="flex ml-5 items-center shrink-0 z-50">
                  <EllipsisIcon edge="end" />
                </div>
              </div>
              <div className="flex flex-col pb-3">
                <TweetText>{tweet.content}</TweetText>
                {/* {imgSrc && <TweetImage image={imgSrc} />} */}
                <div className="flex w-full mt-3">
                  <TweetActionTray
                    actionNumbers={{
                      comments: tweet.commentCount,
                      likes: tweet.likeCount,
                      retweets: tweet.totalRetweetCount,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
);

export default TweetCard;
