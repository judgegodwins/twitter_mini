import { FC } from "react";
import ProfileMock from "images/p.jpg";

const TopBar: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex sticky -top-[0.5px] bg-transparent-white dark:bg-transparent-black px-4 h-[53px] w-full z-50 backdrop-blur-md">
      <div className="flex md:hidden min-w-[56px] min-h-[32px] justify-start items-center shrink-0">
        <img
          src={ProfileMock}
          alt="Profile image"
          className="object-cover h-8 w-8 rounded-full"
        />
      </div>
      <div className="flex grow shrink justify-start items-center">
        <h2 className="text-lg leading-5 md:text-xl font-bold dark:text-slate-50">
          {title}
        </h2>
      </div>
      <div className="flex min-h-fit justify-start items-center shrink-0"></div>
    </div>
  );
};

export default TopBar;
