import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  CircleCheckBig,
  CircleUserRound,
  CircleX,
  Code,
  LogIn,
  NotebookPen,
  PlusCircle,
} from "lucide-react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import { ConfirmationContext } from "../Context/ConfirmationContextProvider";

interface mainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: mainContainerProps) => {
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");
  const errorContext = useContext(ErrorContext);
  const { isError, whatIsTheError } = errorContext!;
  const { pathname } = useLocation();
  const confirmContext = useContext(ConfirmationContext);
  const { isConfirmed } = confirmContext!;

  return (
    <section className="bg-slate-900 min-h-screen min-w-screen relative">
      <div className="lg:px-28 md:px-10 flex flex-col gap-24">
        <nav className="flex-center text-white w-full mt-8 lg:text-xl">
          <ul className="w-full flex justify-between items-center">
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
            <div className="flex-center lg:gap-10 sm:gap-5">
              <li
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
              </li>
              <li
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
              </li>
              <li
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
              </li>
              <li
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
                    pathname.startsWith("/profile")
                      ? "hover:cursor-default"
                      : ""
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
              </li>
            </div>
          </ul>
        </nav>
        <div className="content w-full h-full">{children}</div>
      </div>
      <div
        className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 fixed top-[40%] right-0 ${
          isError ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out z-50`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>{whatIsTheError}</div>
      </div>
      <div
        className={`bg-green-600 rounded-md text-white border-2 border-green-600 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] left-0 ${
          isConfirmed ? "-translate-x-[1%]" : "-translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out z-50`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <div>Successful!</div>
        <CircleCheckBig />
      </div>
    </section>
  );
};
export default MainContainer;
