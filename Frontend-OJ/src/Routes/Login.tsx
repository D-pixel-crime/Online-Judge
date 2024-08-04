import axios from "axios";
import { CircleCheckBig, CircleX } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  useLayoutEffect(() => {
    const username = Cookies.get("username");
    const token = Cookies.get("token");
    if (username && token) {
      window.location.href = "/";
    }
  }, []);

  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const [isFilled, setIsFilled] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [whatIsTheError, setWhatIsTheError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(userDetails.username && userDetails.password)) {
      setIsFilled(true);
      setTimeout(() => {
        setIsFilled(false);
      }, 3000);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/login`,
        userDetails,
        {
          withCredentials: true,
        }
      );

      if (data.token) {
        setUserDetails({ username: "", password: "" });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          window.location.href = "/";
        }, 3000);
      }
    } catch ({
      response: {
        data: { error },
      },
    }: any) {
      setWhatIsTheError(error || "An Unexpected Error Occurred!");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <section className="min-h-screen w-screen bg-slate-900 text-white overflow-x-hidden relative">
      <div className="h-full w-full flex items-center flex-col gap-10">
        <h1 className="text-7xl mt-12 bg-gradient-to-bl from-purple-400 via-orange-500 via-20% font-bold py-4 to-purple-400 bg-clip-text text-transparent">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col border-2 border-slate-700 lg:w-4/12 p-8 rounded-xl gap-4 bg-slate-800 shadow-xl shadow-black"
        >
          <div className="flex flex-col gap-4 text-base">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Your Username"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400"
                value={userDetails.username}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400"
                value={userDetails.password}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 border-2 my-4 w-full border-green-500 text-white text-lg rounded-md px-2 py-1.5 hover:bg-transparent hover:text-green-500"
          >
            Login
          </button>
          <div className="flex-center flex-col border-t-2 pt-6 gap-2">
            <p>No account? Signup instead!</p>
            <Link
              to={"/signup"}
              className="bg-blue-500 flex-center text-white w-full border-2 text-lg rounded-md px-2 py-1.5 hover:bg-transparent border-blue-500 hover:text-blue-500"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
      <div
        className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] right-0 ${
          isFilled ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>Please Fill All Details!</div>
      </div>
      <div
        className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] right-0 ${
          isError ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>{whatIsTheError}</div>
      </div>
      <div
        className={`bg-green-600 rounded-md text-white border-2 border-green-600 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] left-0 ${
          isSuccess ? "-translate-x-[1%]" : "-translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <div>Successfully Logged In!</div>
        <CircleCheckBig />
      </div>
    </section>
  );
};

export default Login;
