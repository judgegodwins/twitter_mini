import { FC } from "react";
import ProfileMock from "images/p.jpg";
import Home from "svg/HomeActive.svg";
import Search from "svg/Search.svg";
import Notification from "svg/Notification.svg";
import { borderClasses } from "../helpers/tailwindClasses";

export const BottomBarItem: FC<{}> = ({ children }) => (
  <div className="flex justify-center items-center">
    <div className="flex justify-center items-center w-10 h-10 rounded-full active:bg-slate-900">
      {children}
    </div>
  </div>
);

const BottomBar: FC<{}> = ({ children }) => {
  return (
    <div className={`md:hidden flex justify-between fixed bottom-0 bg-white dark:bg-black px-4 h-[53px] w-full border-t ${borderClasses} z-50`}>
      <BottomBarItem>
        <Home className="dark:fill-white w-6 h-6" />
      </BottomBarItem>
      <BottomBarItem>
        <Search className="dark:fill-white w-6 h-6" />
      </BottomBarItem>
      <BottomBarItem>
        <Notification className="dark:fill-white w-6 h-6" />
      </BottomBarItem>
    </div>
  );
};

export default BottomBar;
