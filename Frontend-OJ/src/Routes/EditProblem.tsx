import React, { useContext, useLayoutEffect, useState } from "react";
import MainContainer from "../Containers/MainContainer";
import { PlusCircle, Trash, Trash2 } from "lucide-react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import axios from "axios";
import { ConfirmationContext } from "../Context/ConfirmationContextProvider";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

const EditProblem = () => {
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
  const problemId = useParams().id;

  useLayoutEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_OJ_BACKEND_URI}/get/problem/${problemId}`,
          { withCredentials: true }
        );

        if (data.problem.author.username !== Cookies.get("username")) {
          setWhatIsTheError("You Are Not Authorized To Edit This Problem!");
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
          window.location.href = "/all/problems";
        }

        setProblemDetails({
          title: data.problem.title.join("\n"),
          description: data.problem.description.join("\n"),
          testCases: data.problem.testCases.map((eachCase: any) => ({
            input: eachCase.input.join("\n"),
            output: eachCase.output.join("\n"),
          })),
        });
        setCount(data.problem.testCases.length);
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!(problemDetails.title && problemDetails.description)) {
      setWhatIsTheError("Please Fill All The Details!");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    if (
      problemDetails.testCases.some(
        (eachCase) => !(eachCase.input && eachCase.output)
      )
    ) {
      setWhatIsTheError("Test-Cases cannot be empty!");
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
      return;
    }

    const toSendDetails = {
      ...problemDetails,
      title: problemDetails.title.split("\n"),
      description: problemDetails.description.split("\n"),
      testCases: problemDetails.testCases.map((eachCase) => ({
        input: eachCase.input.split("\n"),
        output: eachCase.output.split("\n"),
      })),
    };

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/edit-problem/${problemId}`,
        toSendDetails,
        { withCredentials: true }
      );

      console.log(data);
      if (data.success) {
        setIsConfirmed(true);
        setTimeout(() => {
          setIsConfirmed(false);
          window.location.href = "/all/problems";
        }, 3000);
      }
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

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_OJ_BACKEND_URI
        }/post/delete-problem/${problemId}`,
        { withCredentials: true }
      );

      if (data.success) {
        setIsConfirmed(true);
        setTimeout(() => {
          setIsConfirmed(false);
          window.location.href = "/all/problems";
        }, 3000);
      }
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
      <div className="text-white">
        <div className="flex-center flex-col gap-5">
          <h1 className="text-4xl bg-gradient-to-tr w-fit border-b-2 pb-1 border-b-orange-400 from-red-400 from-40% via-orange-400 to-red-400 bg-clip-text text-transparent">
            Update/Delete Problem✒️
          </h1>
          <p>You Can Update The Problem Statement And Test-Cases Here.👇</p>
        </div>
        <form
          onSubmit={handleUpdate}
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
                      setProblemDetails({
                        ...problemDetails,
                        testCases: problemDetails.testCases.map((eachCase, i) =>
                          i === index
                            ? {
                                ...eachCase,
                                input: e.target.value,
                              }
                            : eachCase
                        ),
                      })
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
                    onChange={(e) => {
                      setProblemDetails({
                        ...problemDetails,
                        testCases: problemDetails.testCases.map((eachCase, i) =>
                          i === index
                            ? {
                                ...eachCase,
                                output: e.target.value,
                              }
                            : eachCase
                        ),
                      });
                    }}
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
          <div className="flex justify-between mt-10">
            <div className="flex flex-col gap-1">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDelete();
                }}
                className="px-2 flex-center flex-row py-1.5 w-fit h-fit bg-red-600 border-2 border-red-600 hover:bg-transparent hover:text-red-500 rounded-md"
              >
                <Trash />
                Delete
              </button>
              <p className="text-slate-500 text-xs">
                This will permanently delete the question-data from the
                database.
              </p>
            </div>
            <button
              type="submit"
              className="px-2 py-1.5 w-fit h-fit bg-violet-600 border-2 border-violet-600 hover:bg-transparent hover:text-violet-500 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </MainContainer>
  );
};
export default EditProblem;
