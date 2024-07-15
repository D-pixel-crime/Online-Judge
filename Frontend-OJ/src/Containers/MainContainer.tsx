import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { CircleUserRound, CircleX, LogIn, NotebookPen } from "lucide-react";
import { ErrorContext } from "../Context/ErrorContextProvider";

interface mainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: mainContainerProps) => {
  const username = Cookies.get("username");
  const userId = Cookies.get("userId");

  const errorContext = useContext(ErrorContext);

  const { isError, whatIsTheError } = errorContext!;

  const { pathname } = useLocation();

  return (
    <section className="bg-slate-900 min-h-screen min-w-screen relative">
      <div className="px-28 flex flex-col gap-20">
        <nav className="flex-center text-white w-full mt-8 text-2xl">
          <ul className="w-full flex justify-between items-center">
            <li
              className={`${
                pathname == "/"
                  ? "border-b-4 hover:cursor-default py-1 bg-gradient-to-tr from-yellow-400 from-40% via-orange-400 to-yellow-300 bg-clip-text text-transparent"
                  : "hover:text-amber-400 transition-colors"
              } border-yellow-400 w-fit`}
            >
              <Link
                to="/"
                className={`${pathname == "/" ? "hover:cursor-default" : ""}`}
              >
                Home
              </Link>
            </li>
            <div className="flex-center gap-14">
              <li
                className={`${
                  pathname == "/all/problems"
                    ? "border-b-4 hover:cursor-default py-1"
                    : "hover:text-slate-400 transition-colors"
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
                    : "hover:text-cyan-400"
                } border-cyan-400 transition-colors`}
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
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>{whatIsTheError}</div>
      </div>
    </section>
  );
};
export default MainContainer;
