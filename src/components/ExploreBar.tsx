import { FC } from "react";
import ExploreTab from "./ExploreTab";
import Search from "svg/Search.svg";

const ExploreBar: FC<{}> = ({ children }) => {
  return (
    <div className="md:block hidden w-[350px] h-full mr-2.5">
      <div className="h-full">
        <div className="sticky w-[350px] -top-[729px]">
          <div className="pt-3">
            <div className="sticky top-0 mb-3 w-full pb-1 dark:bg-black">
              <label className="flex items-center w-full bg-zinc-900 rounded-full" htmlFor="inputsearch"> {/**input */}
                <div className="flex justify-center align-center pl-5 pr-3 shrink-0">
                  <Search className="dark:fill-slate-400 w-5 h-5" />
                </div>
                <input className="grow p-3 text-slate-400 outline-none bg-zinc-900 rounded-r-full" placeholder="Search" id="inputsearch" />
              </label>
            </div>
            <ExploreTab />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreBar;
