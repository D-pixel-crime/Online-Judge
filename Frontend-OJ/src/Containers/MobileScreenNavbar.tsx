import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { useState } from "react";

const MobileScreenNavbar = () => {
  const { pathname } = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <nav className="text-white flex-center w-full mt-8 sm:hidden">
        <ul className="flex items-center justify-between w-full">
          <li
            className={`${
              pathname == "/"
                ? "border-b-4 hover:cursor-default py-1 text-amber-400"
                : "hover:text-amber-400 transition hover:-translate-y-[5%]"
            } border-yellow-400 w-fit`}
          >
            <Link
              to="/"
              className={`${pathname == "/" ? "hover:cursor-default" : ""}`}
            >
              Home
            </Link>
          </li>
          <li className="w-fit" onClick={() => setIsSideBarOpen(true)}>
            <Menu />
          </li>
        </ul>
      </nav>

      <SideBar
        setIsSideBarOpen={setIsSideBarOpen}
        isSideBarOpen={isSideBarOpen}
      />
    </>
  );
};
export default MobileScreenNavbar;
