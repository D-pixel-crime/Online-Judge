import {
  CircleUserRound,
  Code,
  LogIn,
  NotebookPen,
  PlusCircle,
  X,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface sidebarProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBar = ({ isSideBarOpen, setIsSideBarOpen }: sidebarProps) => {
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");
  const { pathname } = useLocation();

  return (
    <div
      className={`fixed top-0 right-0 h-screen w-1/2 bg-slate-800 z-40 text-white ${
        !isSideBarOpen ? "translate-x-[100%]" : "translate-x-0"
      } transition-transform duration-500 px-4 py-2 sm:hidden shadow-lg shadow-black`}
    >
      <X
        onClick={() => setIsSideBarOpen(false)}
        className="text-red-500 w-fit size-10"
      />
      <div className="flex-center flex-col text- gap-36 h-full">
        <div
          className={`${
            pathname == "/compiler"
              ? "border-b-4 hover:cursor-default py-1 text-green-400"
              : "hover:text-green-300 transition hover:-translate-y-[5%]"
          } border-green-500`}
        >
          <Link
            to="/compiler"
            className={`${
              pathname == "/compiler" ? "hover:cursor-default" : ""
            }  flex-center gap-1.5`}
          >
            <Code />
            <p>Compiler</p>
          </Link>
        </div>
        {username && (
          <div
            className={`${
              pathname == "/add-problem"
                ? "border-b-4 hover:cursor-default py-1"
                : "hover:text-slate-400 transition hover:-translate-y-[5%]"
            } border-yellow-400`}
          >
            <Link
              to="/add-problem"
              className={`${
                pathname == "/add-problem" ? "hover:cursor-default" : ""
              }  flex-center gap-1.5`}
            >
              <PlusCircle />
              <p>Add-Problem</p>
            </Link>
          </div>
        )}
        <div
          className={`${
            pathname == "/all/problems"
              ? "border-b-4 hover:cursor-default py-1"
              : "hover:text-slate-400 hover:-translate-y-[5%] transition"
          } border-yellow-400`}
        >
          <Link
            to="/all/problems"
            className={`${
              pathname == "/all/problems" ? "hover:cursor-default" : ""
            }  flex-center gap-1.5`}
          >
            <NotebookPen />
            <p>Problem-List</p>
          </Link>
        </div>
        <div
          className={`${
            pathname.startsWith("/profile")
              ? "border-b-4 hover:cursor-default text-cyan-400 py-1"
              : !username
              ? "text-green-600 hover:text-green-300"
              : "hover:text-cyan-400 text-indigo-400 hover:-translate-y-[5%]"
          } border-cyan-400 transition`}
        >
          <Link
            to={username ? `/profile/${userId}` : "/login"}
            className={`${
              pathname.startsWith("/profile") ? "hover:cursor-default" : ""
            }`}
          >
            {username ? (
              <div className="flex-center gap-1">
                <CircleUserRound />
                {username}
              </div>
            ) : (
              <div className="flex-center gap-1">
                <p>Login</p>
                <LogIn />
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
