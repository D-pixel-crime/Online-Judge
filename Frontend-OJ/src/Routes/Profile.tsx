import MainContainer from "../Containers/MainContainer";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ErrorContext } from "../Context/ErrorContextProvider";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

type CookieAttributes = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
};

const Profile = () => {
  const userId = Cookies.get("userId");

  const errorContext = useContext(ErrorContext);

  const { setIsError, setWhatIsTheError } = errorContext!;

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    username: "",
    email: "",
    problems: [],
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_OJ_BACKEND_URI}/get/profile/${userId}`,
          { withCredentials: true }
        );

        setUserDetails({
          username: data.username,
          email: data.email,
          fullName: data.fullName,
          problems: data.problems,
        });
      } catch (error: any) {
        console.log(error);
        setWhatIsTheError(
          error.message ||
            error.response?.data?.error ||
            "An Unexpected Error Occurred!"
        );
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogOut = () => {
    const cookieOptions: CookieAttributes = {
      secure: true,
      sameSite: "Strict",
      domain: ".thinkxcode.online",
    };
    Cookies.remove("username", cookieOptions);
    Cookies.remove("userId", cookieOptions);
    Cookies.remove("token", cookieOptions);
    window.location.href = "/login";
  };

  return (
    <MainContainer>
      <div
        className="text-white flex flex-col justify-between gap-20 border-2 bg-white/10 p-5 rounded-lg border-slate-700"
        style={{ boxShadow: "0px 20px 20px 0px black" }}
      >
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl w-fit border-b-2 border-violet-400 bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <ul className="text-xl flex flex-col gap-4 ml-10">
            <li className="flex gap-5">
              <span className="text-green-500">Full Name : </span>{" "}
              <span className="text-slate-400">{userDetails.fullName}</span>
            </li>
            <li className="flex gap-5">
              <span className="text-green-500">Username : </span>{" "}
              <span className="text-slate-400">{userDetails.username}</span>
            </li>
            <li className="flex gap-5">
              <span className="text-green-500">Email : </span>{" "}
              <span className="text-slate-400">{userDetails.email}</span>
            </li>
            <li className="flex flex-row gap-5">
              <div>Contributions: </div>
              <div className="grid lg:grid-cols-5 sm:grid-cols-2 gap-5 w-full">
                {userDetails.problems &&
                  userDetails.problems.map((eachProblem: any, index) => (
                    <div key={eachProblem._id} className="w-fit break-words">
                      <Link
                        to={`/problem/${eachProblem._id}`}
                        className={`col-start-${
                          index + 1
                        } flex border-x px-2 border-slate-500 underline text-blue-400 transition-colors hover:text-cyan-300`}
                      >
                        <p className="w-fit">{eachProblem.title}</p>
                        <ExternalLink />
                      </Link>
                    </div>
                  ))}
              </div>
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <Link
            to={`/submissions/${userId}`}
            className="flex-center gap-1 px-2 py-2.5 bg-blue-500 border-2 border-blue-500 hover:text-blue-400 hover:bg-transparent rounded-md"
          >
            All Submissions
            <ExternalLink />
          </Link>
          <button
            onClick={handleLogOut}
            className="px-2 py-1.5 bg-red-500 border-2 border-red-500 hover:text-red-500 hover:bg-transparent rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </MainContainer>
  );
};

export default Profile;
