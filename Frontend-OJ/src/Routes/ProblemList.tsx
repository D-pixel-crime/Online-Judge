import { useContext, useEffect, useLayoutEffect, useState } from "react";
import MainContainer from "../Containers/MainContainer";
import axios from "axios";
import { ErrorContext } from "../Context/ErrorContextProvider";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/search-problems`,
        { search },
        { withCredentials: true }
      );
      console.log(data.problems);

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

  return (
    <MainContainer>
      <div className="flex flex-col gap-10 text-xl text-white">
        <div className="flex justify-between items-center border-b-2 border-slate-600 pb-4">
          <h1 className="bg-gradient-to-tl w-fit from-green-500 via-yellow-200 to-green-500 bg-clip-text text-transparent text-4xl">
            Problem-Set
          </h1>
          <div className="flex gap-2 items-center">
            <label htmlFor="search">Search:</label>
            <input
              type="text"
              id="search"
              placeholder="Enter Title"
              className="bg-transparent border-b border-slate-500 px-2 py-1 text-slate-400 outline-none text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="mx-5 table">
          <thead className="text-xl">
            <tr>
              <th className="border-2 border-slate-500 px-4 py-2 text-red-400">
                Title
              </th>
              <th className="border-2 border-slate-500 px-4 py-2 text-red-400">
                Author
              </th>
              <th className="border-2 border-slate-500 px-4 py-2 text-red-400">
                Access Link
              </th>
            </tr>
          </thead>
          <tbody className="text-base">
            {problems.map((eachProblem: any) => (
              <tr key={eachProblem._id} className="border-2 border-slate-500">
                <td className="border-2 border-slate-500 px-4 py-2">
                  {eachProblem.title}
                </td>
                <td className="border-2 border-slate-500 px-4 py-2 text-violet-300">
                  {eachProblem.author.username}
                </td>
                <td className="px-4 py-2 flex justify-end items-center">
                  <Link
                    to={`/problem/${eachProblem._id}`}
                    className="flex underline text-blue-500 hover:text-cyan-300 w-fit"
                  >
                    <p className="mr-1">Solve</p>
                    <ExternalLink />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainContainer>
  );
};

export default ProblemList;
