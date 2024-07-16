import MainContainer from "../Containers/MainContainer";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ErrorContext } from "../Context/ErrorContextProvider";
import ProblemList from "./ProblemList";

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
    Cookies.remove("username");
    Cookies.remove("userId");
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <MainContainer>
      <div className="text-white flex flex-col justify-between gap-40">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl mb-10 w-fit border-b-2 border-violet-400 bg-gradient-to-r from-purple-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <ul className="text-xl flex flex-col gap-4">
            <li>Full Name: {userDetails.fullName}</li>
            <li>Username: {userDetails.username}</li>
            <li>Email: {userDetails.email}</li>
            <li className="flex flex-row gap-5">
              <div>Authored Problems: </div>
              <div className="grid grid-cols-5 gap-5">
                {userDetails.problems &&
                  userDetails.problems.map((eachProblem: any) => (
                    <p key={eachProblem._id}>{eachProblem.title}</p>
                  ))}
              </div>
            </li>
          </ul>
        </div>
        <div className="flex justify-end">
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
