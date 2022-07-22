import { FC } from "react";
import FollowButton from "./FollowButton";
import { EllipsisIcon } from "./IconButton";

interface NameCardBaseProps {
  name: string;
  username: string;
}

interface NameCardProps extends NameCardBaseProps {
  image: any;
  smallerImg?: boolean;
}

const NameCardBase: FC<NameCardBaseProps> = ({ name, username }) => (
  <div className="shrink flex flex-col justify-center items-start outline-none m-w-full mx-3">
    <div className="truncate dark:text-white font-bold text-[15px]">
      <span>{name}</span>
    </div>
    <div className="truncate text-[15px] text-slate-400 ">
      <span>@{username}</span>
    </div>
  </div>
);

const NameCard: FC<NameCardProps> = ({
  children,
  image,
  smallerImg,
  username,
  name,
}) => (
  <div className={`flex ${smallerImg ? "h-10" : "h-12"}`}>
    <div className={`grow-0 ${smallerImg ? "basis-10" : "basis-12"} shrink-0`}>
      <img
        src={image}
        alt="Profile image"
        className={`object-cover ${
          smallerImg ? "h-10 w-10" : "h-12 w-12"
        }  rounded-full`}
      />
    </div>
    <NameCardBase name={name} username={username} />
    <div className="grow flex justify-end items-center">{children}</div>
  </div>
);

export const MainNameCard: FC<NameCardProps> = (props) => (
  <NameCard {...props}>
    <EllipsisIcon edge="end"/>
  </NameCard>
);

export const FollowNameCard: FC<NameCardProps> = (props) => (
  <NameCard {...props}>
    <FollowButton />
  </NameCard>
);

export default NameCard;
