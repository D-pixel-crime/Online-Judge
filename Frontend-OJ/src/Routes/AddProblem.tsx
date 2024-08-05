import React, { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../Containers/MainContainer";
import { PlusCircle, Trash2 } from "lucide-react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import axios from "axios";
import { ConfirmationContext } from "../Context/ConfirmationContextProvider";
import Cookies from "js-cookie";

const AddProblem = () => {
  const [problemDetails, setProblemDetails] = useState({
    title: "",
    description: "",
    testCases: [
      {
        input: "",
        output: "",
      },
    ],
  });
  const [count, setCount] = useState(0);
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const confirmContext = useContext(ConfirmationContext);
  const { setIsConfirmed } = confirmContext!;
  const username = Cookies.get("token");

  useLayoutEffect(() => {
    if (!username) {
      window.location.href = "/login";
    }
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(problemDetails.title && problemDetails.description)) {
      setWhatIsTheError("Please Fill All The Details!");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    const problemDetailsToSend = {
      ...problemDetails,
      title: problemDetails.title.split("\n"),
      description: problemDetails.description.split("\n"),
      testCases: problemDetails.testCases.map((testCase) => ({
        input: testCase.input.split("\n"),
        output: testCase.output.split("\n"),
      })),
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/add-problem`,
        problemDetailsToSend,
        { withCredentials: true }
      );

      console.log(data);
      setIsConfirmed(true);
      setTimeout(() => {
        setIsConfirmed(false);
      }, 3000);
      setProblemDetails({
        title: ``,
        description: ``,
        testCases: [
          {
            input: ``,
            output: ``,
          },
        ],
      });
      setCount(0);
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

  const handleInputChange = (index: number, field: string, value: string) => {
    const updatedTestCases = [...problemDetails.testCases];
    updatedTestCases[index] = {
      ...updatedTestCases[index],
      [field]: value,
    };
    setProblemDetails({
      ...problemDetails,
      testCases: updatedTestCases,
    });
  };

  return (
    <MainContainer>
      <div className="text-white">
        <div className="flex-center flex-col gap-5">
          <h1 className="text-4xl border-b-2 pb-1 border-b-blue-400 bg-gradient-to-tr w-fit from-green-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
            Create A Problem✒️
          </h1>
          <p>
            Thank you for contributing a new problem to our database, and
            helping the coders think towards newer dimensions.🥰
          </p>
        </div>
        <form
          onSubmit={handleCreate}
          method="post"
          className="flex flex-col gap-10 mt-16 mb-10"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-red-400 text-lg">
                Problem Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter The Problem Title"
                value={problemDetails.title}
                onChange={(e) =>
                  setProblemDetails({
                    ...problemDetails,
                    title: e.target.value,
                  })
                }
                className="px-2 py-1.5 rounded-md bg-transparent text-slate-300 border-2 border-slate-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="text-red-400 text-lg">
                Problem Description
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter The Problem Statement"
                value={problemDetails.description}
                onChange={(e) =>
                  setProblemDetails({
                    ...problemDetails,
                    description: e.target.value,
                  })
                }
                className="px-2 py-1.5 rounded-md bg-transparent text-slate-300 border-2 border-slate-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-2 flex-center py-1.5 w-fit rounded-md bg-blue-500 border-2 border-blue-500 hover:bg-transparent hover:text-blue-500"
                onClick={(e) => {
                  e.preventDefault();
                  setCount((prev) => prev + 1);
                  setProblemDetails({
                    ...problemDetails,
                    testCases: [
                      ...problemDetails.testCases,
                      { input: "", output: "" },
                    ],
                  });
                }}
              >
                <PlusCircle className="mr-1" />
                Test Case
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-9">
            {Array.from({ length: count }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2 mx-5">
                <h2 className="text-lg border-b-2 border-slate-700 text-red-400">
                  Test-Case {index + 1}
                </h2>
                <div className="flex flex-col">
                  <label htmlFor={`testCaseInput${index}`}>Input</label>
                  <textarea
                    placeholder="Enter The Input"
                    id={`textCaseInput${index}`}
                    className="px-2 py-1.5 rounded-md bg-transparent text-slate-300 border-2 border-slate-500"
                    value={problemDetails.testCases[index].input}
                    onChange={(e) =>
                      handleInputChange(index, "input", e.target.value)
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor={`testCaseOutput${index}`}>Output</label>
                  <textarea
                    placeholder="Enter The Output"
                    id={`textCaseOutput${index}`}
                    className="px-2 py-1.5 rounded-md bg-transparent text-slate-300 border-2 border-slate-500"
                    value={problemDetails.testCases[index].output}
                    onChange={(e) =>
                      handleInputChange(index, "output", e.target.value)
                    }
                  />
                </div>
                <div className="flex justify-start">
                  <button
                    className="px-1.5 py-1.5 flex-center rounded-md bg-red-500 text-white border-2 border-red-500 hover:text-red-500 hover:bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      setProblemDetails({
                        ...problemDetails,
                        testCases: problemDetails.testCases.filter(
                          (_, idx) => idx !== index
                        ),
                      });
                      setCount((prev) => prev - 1);
                    }}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="px-2 py-1.5 bg-green-600 border-2 border-green-600 hover:bg-transparent hover:text-green-500 rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};
export default AddProblem;
