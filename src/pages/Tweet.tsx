import { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { MainNameCard } from "components/NameCard";
import TopBar from "components/TopBar";
import ProfileMock from "images/p.jpg";
import TweetCard, {
  TweetActionTray,
  TweetImage,
  TweetText,
  UpperThreadLineContainer,
} from "components/TweetCard";
import ProfileMock2 from "images/p2.jpg";
import { borderClasses } from "helpers/tailwindClasses";
import ThreadContainer from "components/ThreadContainer";
import { useParams } from "react-router-dom";
import TweetService from "services/TweetService";
import { Tweet } from "types/tweet";
import usePagination from "hooks/usePagination";
import useService from "hooks/useService";
import Loading from "components/Loading";

const Tweet: FC<{}> = () => {
  console.log("new page");
  const { id } = useParams();
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    TweetService.getTweet(id!)
      .then(({ data: resData }) => {
        setTweet(resData.data);
        console.log("TWEET ", resData.data);
      })
      .catch(console.log);
  }, [id]);

  const {
    data: comments,
    loading,
    error,
    hasMore,
  } = usePagination<Tweet, typeof TweetService.getComments>(
    TweetService.getComments,
    [id],
    page,
    limit,
    id!
  );

  const {
    data: parents,
    loading: parentsLoading,
    error: parentsFailed,
  } = useService(TweetService.getParents(id!), [id]);

  const hasParent = parents && parents.length && parents.length > 0;

  return (
    <>
      <TopBar title="Tweet" />
      {tweet ? (
        <>
          {parents &&
            parents.map((parent, index) => (
              <TweetCard
                tweet={parent}
                threaded
                hasParent={Boolean(parent.parentId)}
                // imgSrc={ProfileMock2}
              />
            ))}
          <div className={`px-4 ${!hasParent ? "pt-3" : ""}`}>
            {hasParent && <UpperThreadLineContainer />}
            <MainNameCard
              name={tweet.user.name}
              username={tweet.user.username}
              image={ProfileMock}
            />
            <div className="mt-3">
              <TweetText lg>{tweet.content}</TweetText>
              {/* <TweetImage image={ProfileMock2} /> */}
              <div className="my-4 text-slate-400 text-[15px]">
                <span>{format(new Date(tweet.createdAt), "p · LLL d, y")}</span>
              </div>
              <div
                className={`flex px-1 flex-nowrap justify-start py-4 border-t border-b ${borderClasses}`}
              >
                <span className="mr-5 dark:text-white text-sm">
                  <span className="font-bold">{tweet.retweetCount}</span>{" "}
                  <span className="text-slate-400"> Retweets</span>
                </span>
                <span className="mr-5 dark:text-white text-sm">
                  <span className="font-bold">{tweet.quoteRetweetCount}</span>
                  <span className="text-slate-400"> Quote Tweets</span>
                </span>
                <span className="mr-5 dark:text-white text-sm">
                  <span className="font-bold">{tweet.likeCount}</span>
                  <span className="text-slate-400">
                    {" "}
                    {tweet.likeCount > 1 ? "Likes" : "Like"}
                  </span>
                </span>
              </div>
              <div className={`flex h-12 border-b px-1 ${borderClasses}`}>
                <TweetActionTray tweetDetail />
              </div>
            </div>
          </div>
          <div className={`comment-section border-t w-full ${borderClasses}`}>
            {comments &&
              comments.map((comment) => (
                <TweetCard
                  tweet={comment}
                  // imgSrc={ProfileMock2}
                />
              ))}
            {/* <ThreadContainer>
              <TweetCard
                name="Gift"
                username="gift"
                content="Whoop 🙌 ! I’ve been awarded MVP developer technologies for another year!"
                imgSrc={ProfileMock2}
                threaded
              />
              <TweetCard
                name="Gift"
                username="gift"
                content="Whoop 🙌 ! I’ve been awarded MVP developer technologies for another year!"
                imgSrc={ProfileMock2}
                hasParent
              />
            </ThreadContainer> */}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Tweet;
