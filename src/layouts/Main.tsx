import ExploreBar from "components/ExploreBar";
import NavBar from "components/NavBar";
import { borderClasses } from "helpers/tailwindClasses";
import Home from "pages/Home";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <div className="flex w-full h-full">
      <NavBar />
      <main className="flex justify-start h-full grow shrink">
        <div className="md:w-[990px] flex">
          <div className="flex justify-between grow">
            <div
              className={`relative h-full grow max-w-[600px] z-[1] border-r ${borderClasses}`}
            >
              <Outlet />
            </div>
            <ExploreBar />
          </div>
        </div>
      </main>
    </div>
  );
}
