import { FC } from "react";
import { Link } from "react-router-dom";
import ProfileMock from "images/p.jpg";
import FollowButton from "./FollowButton";
import NameCard, { FollowNameCard } from "./NameCard";

// export const ExploreTabCard: FC<{}> = () => (
//   <div className="flex px-4 py-3">
//     <div className="grow-0 shrink-0 basis-12">
//       <img
//         src={ProfileMock}
//         alt="Profile image"
//         className="object-cover h-12 w-12 rounded-full"
//       />
//     </div>
//     <div className="flex grow justify-between items-center">
//       <NameCard name="Jake Cole" username="jakey1_" />
//       <FollowButton />
//     </div>
//   </div>
// );

const ExploreTab: FC<{}> = ({ children }) => (
  <div className="bg-zinc-900 rounded-2xl mb-4">
    <div className="text-xl font-extrabold leading-6 dark:text-white px-4 py-3">
      <span>Who to follow</span>
    </div>
    <div className="px-4 py-3">
      <FollowNameCard name="Jake" username="jakeKy_" image={ProfileMock} />
    </div>
    <div className="bottom px-4 py-3">
      <Link to="#" className="text-sky-400/75">Show more</Link>
    </div>
  </div>
);

export default ExploreTab;
