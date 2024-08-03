import MainContainer from "../Containers/MainContainer";
import { useContext, useLayoutEffect, useState } from "react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import axios from "axios";

const Submissions = () => {
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const [submissions, setSubmissions] = useState([]);

  useLayoutEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_OJ_BACKEND_URI}/get/get-submissions`,
          { withCredentials: true }
        );
        console.log("Fetched submissions:", data.submissions);
        setSubmissions(data.submissions);
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

    fetchSubmissions();
  }, []);

  return (
    <MainContainer>
      <div className="flex flex-col gap-10 max-w-full">
        <div className="border-b-2 pb-2 border-b-slate-700">
          <h1 className="bg-gradient-to-tl from-indigo-400 via-green-300 to-indigo-400 w-fit bg-clip-text text-transparent text-3xl">
            Your Submissions
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="text-xl bg-slate-700/80">
              <tr>
                <th className="border-2 border-slate-500 px-4 py-2 text-yellow-400">
                  Title
                </th>
                <th className="border-2 border-slate-500 px-4 py-2 text-yellow-400">
                  Status
                </th>
                <th className="border-2 border-slate-500 px-4 py-2 text-yellow-400">
                  Runtime
                </th>
                <th className="border-2 border-slate-500 px-4 py-2 text-yellow-400">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody className="text-base bg-slate-800">
              {submissions.map((eachSubmission: any) => (
                <tr
                  key={eachSubmission._id}
                  className="border-2 border-slate-500"
                >
                  <td className="border-2 border-slate-500 px-4 py-2 text-white break-words">
                    {eachSubmission.title}
                  </td>
                  <td
                    className={`border-2 border-slate-500 px-4 py-2 ${
                      eachSubmission.status === "All test cases passed"
                        ? "text-green-400"
                        : "text-red-400"
                    } break-words`}
                  >
                    {eachSubmission.status}
                  </td>
                  <td className="border-2 border-slate-500 px-4 py-2 text-blue-400 break-words">
                    {eachSubmission.runtime}
                  </td>
                  <td className="border-2 border-slate-500 px-4 py-2 text-slate-300 break-words">
                    {eachSubmission.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainContainer>
  );
};

export default Submissions;
