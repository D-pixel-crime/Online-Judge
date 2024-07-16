import { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../Containers/MainContainer";
import axios from "axios";
import { ErrorContext } from "../Context/ErrorContextProvider";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;

  useLayoutEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_OJ_BACKEND_URI}/get/all/problems`,
          { withCredentials: true }
        );

        setProblems(data.problems);
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

    fetchProblems();
  }, []);

  return (
    <MainContainer>
      <div className="flex flex-col gap-5 text-xl text-white">
        {problems.map((eachProblem: any, index) => (
          <div key={eachProblem._id}>{eachProblem.title}</div>
        ))}
      </div>
    </MainContainer>
  );
};
export default ProblemList;
