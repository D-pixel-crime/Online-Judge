import { useParams } from "react-router-dom";
import MainContainer from "../Containers/MainContainer";
import { useContext, useLayoutEffect, useState } from "react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import axios from "axios";

const SolveProblem = () => {
  const problemId = useParams().id;
  const [problemDetails, setProblemDetails] = useState({
    title: "",
    description: "",
    author: {
      username: "",
    },
  });
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;

  useLayoutEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_OJ_BACKEND_URI}/get/problem/${problemId}`,
          { withCredentials: true }
        );

        setProblemDetails(data.problem);
      } catch (error: any) {
        console.log(error);
        setIsError(true);
        setWhatIsTheError(
          error.message ||
            error.response?.data?.error ||
            "An Unexpected Error Occurred!"
        );
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    };

    fetchProblemDetails();
  }, []);

  return (
    <MainContainer>
      <div className="text-white">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl w-fit bg-gradient-to-tr from-red-500 via-yellow-400 to-red-500 bg-clip-text text-transparent">
            {problemDetails.title}
          </h1>
          <p className="text-slate-400">
            (Contributed by: {problemDetails.author.username})
          </p>
        </div>
        <p className="mt-5">{problemDetails.description}</p>
      </div>
    </MainContainer>
  );
};
export default SolveProblem;
