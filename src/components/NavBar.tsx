import { FC } from "react";
import { Link } from "react-router-dom";
import Logo from "svg/Logo.svg";
import Home from "svg/HomeActive.svg";
import Search from "svg/Search.svg";
import Notification from "svg/Notification.svg";
import ProfileMock from "images/p.jpg";
import Ellipsis from "svg/Ellipsis.svg";
import NameCard, { MainNameCard } from "./NameCard";
import { borderClasses } from "helpers/tailwindClasses";

const NavBar: FC<{}> = ({ children }) => {
  return (
    <header className="md:flex hidden h-full grow justify-end z-10 relative shrink-0">
      <div className="w-[275px] relative">
        <div className={`flex flex-col justify-between h-full px-3 w-[275px] fixed top-0 border-r ${borderClasses}`}>
          <div className="flex flex-col items-start">
            <div className="flex py-0.5 5 max-w-full">
              <h1 className="min-w-[30px] cursor-pointer justify-center items-center">
                <a href="" className="flex flex-col min-w-[49px] min-h-[49px]">
                  <div className="flex grow justify-center items-center text-sky-600">
                    <Logo className="h-8 w-6 grow fill-sky-600" />
                  </div>
                </a>
              </h1>
            </div>

            <div className="mt-0.5 mb-1 w-full">
              <nav className="flex flex-col items-start w-full">
                <Link
                  to="/hshs"
                  className="flex justify-start w-full grow py-1"
                >
                  <div className="flex justify-center items-center shrink-0 p-3 rounded-full">
                    <Home className="inline-block dark:fill-white w-7 h-7 overflow-hidden" />
                    <div className="ml-5 text-xl leading-6 break-words text-ellipsis whitespace-nowrap dark:text-white">
                      <span>Home</span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/hshs"
                  className="flex justify-start w-full grow py-1"
                >
                  <div className="flex justify-center items-center shrink-0 p-3 rounded-full">
                    <Search className="dark:fill-white w-6 h-6" />
                    <div className="ml-5 text-xl leading-6 break-words text-ellipsis whitespace-nowrap dark:text-white">
                      <span>Search</span>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/hshs"
                  className="flex justify-start w-full grow py-1"
                >
                  <div className="flex justify-center items-center shrink-0 p-3 rounded-full">
                    <Notification className="dark:fill-white w-6 h-6" />
                    <div className="ml-5 text-xl leading-6 break-words text-ellipsis whitespace-nowrap dark:text-white">
                      <span>Notification</span>
                    </div>
                  </div>
                </Link>
              </nav>
            </div>

            <div className="w-[90%] my-1">
              <button className="w-full rounded-full text-white font-bold text-lg leading-5 bg-sky-600 py-5">
                Tweet
              </button>
            </div>
          </div>

          <div className="my-3 w-full">
            <div className="p-3">
              <MainNameCard smallerImg name="Judge Godwins" username="judgegodwins" image={ProfileMock} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
