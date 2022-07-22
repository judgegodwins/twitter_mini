import { FC, useCallback, useEffect, useRef, useState } from "react";
import BottomBar from "components/BottomBar";
import TopBar from "components/TopBar";
import TweetCard from "components/TweetCard";
import ProfileMock from "images/p.jpg";
import ProfileMock2 from "images/p2.jpg";
import ProfileMock3 from "images/p3.jpg";
import { borderClasses } from "helpers/tailwindClasses";
import TweetForm from "./TweetForm";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getFeed } from "slices/tweets/actions";

const TweetBar: FC<{}> = () => {
  const dispatch = useAppDispatch();
  const { tweets, hasMore, fetching } = useAppSelector(({ tweets }) => tweets);
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver>();

  console.log("OBSERVER CURRENT: ", observer.current);
  console.log("PAGE: ", page);

  const lastElementRef = useCallback(
    (node) => {
      console.log("iN REF");
      if (fetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage((prev) => prev + 1);
      });

      if (node) observer.current.observe(node);
    },
    [fetching, hasMore]
  );

  useEffect(() => {
    dispatch(getFeed({ page, limit: 10 }));
  }, [dispatch, page]);

  return (
    <>
      <TopBar title="Home" />
      <TweetForm />
      {/* <div> */}
      {tweets.map((tweet, index) => (
        <TweetCard
          tweet={tweet}
          ref={index === tweets.length - 1 ? lastElementRef : undefined}
        />
      ))}
      {/* </div> */}
      <BottomBar />
    </>
  );
};

export default TweetBar;
