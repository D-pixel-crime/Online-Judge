import { useParams } from "react-router-dom";
import MainContainer from "../Containers/MainContainer";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import axios from "axios";
import { Editor } from "@monaco-editor/react";
import { supportedLanguages } from "../constants/boiler_plate";

const SolveProblem = () => {
  const problemId = useParams().id;
  const [problemDetails, setProblemDetails] = useState({
    title: [""],
    description: [""],
    testCases: [{ input: [""], output: [""] }],
    author: {
      username: "",
    },
  });
  const errorContext = useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;
  const editorRef = useRef(null);
  const [code, setCode] = useState<string | undefined>();
  const [language, setLanguage] = useState(supportedLanguages[0]);
  const [output, setOutput] = useState<string | undefined>();
  const [input, setInput] = useState<string | undefined>(``);

  useLayoutEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_OJ_BACKEND_URI}/get/problem/${problemId}`,
          { withCredentials: true }
        );

        setProblemDetails({
          title: data.problem.title,
          description: data.problem.description,
          testCases: data.problem.testCases,
          author: {
            username: data.problem.author.username,
          },
        });
      } catch (error: any) {
        console.log(error);
        setIsError(true);
        setWhatIsTheError(
          error.response?.data?.error ||
            error.message ||
            "An Unexpected Error Occurred!"
        );
        setTimeout(() => {
          setIsError(false);
          window.location.href = "/";
        }, 3000);
      }
    };

    fetchProblemDetails();
  }, []);

  useEffect(() => {
    setCode(language.boilerPlate);
  }, [language]);

  const handleRun = async (e: React.FormEvent) => {
    e.preventDefault();
    setOutput("Running...");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/run`,
        {
          code,
          extension: language.extension,
          language: language.name,
          input,
        },
        { withCredentials: true }
      );

      setOutput(data.output);
    } catch (error: any) {
      setOutput(
        error.response?.data?.error?.substr(80) ||
          error.message ||
          "An Unexpected Error Occurred!"
      );
      setIsError(true);
      setWhatIsTheError(
        error.response?.data?.error?.substr(0, 20) ||
          error.message ||
          "An Unexpected Error Occurred!"
      );
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOutput("Running...");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/submit/${problemId}`,
        { language: language.name, code, extension: language.extension },
        { withCredentials: true }
      );

      console.log(data);

      setOutput(data.error || data.success);

      await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/store-submission`,
        {
          title: problemDetails.title.join(" "),
          status: data.error || data.success,
          runtime: data.runtime,
        },
        { withCredentials: true }
      );
    } catch (error: any) {
      setOutput(
        error.response?.data?.error?.substr(80) ||
          error.message ||
          "An Unexpected Error Occurred!"
      );
      setIsError(true);
      setWhatIsTheError(
        error.response?.data?.error?.substr(0, 20) ||
          error.message ||
          "An Unexpected Error Occurred!"
      );
      await axios.post(
        `${import.meta.env.VITE_OJ_BACKEND_URI}/post/store-submission`,
        {
          title: problemDetails.title.join(" "),
          status: "Runtime Error",
          runtime: "Not Available",
        },
        { withCredentials: true }
      );
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <MainContainer>
      <div className="text-white">
        <div className="flex items-center border-b-2 border-b-slate-700 pb-2">
          <h1 className="text-4xl w-fit bg-gradient-to-tr from-red-500 via-orange-400 to-red-500 bg-clip-text text-transparent">
            {problemDetails.title.map((eachLine, index) => (
              <React.Fragment key={`${index + 1000}`}>
                {eachLine}
              </React.Fragment>
            ))}
          </h1>
        </div>
        <div className="lg:grid lg:mt-10 lg:mb-5 lg:grid-cols-4 w-full">
          <div className="col-start-1 col-span-2 break-words lg:mr-10 h-[80vh] overflow-y-auto px-2">
            <p className="text-slate-500 mb-5">
              Contributed by : {problemDetails.author.username}
            </p>
            <p className="break-words">
              {problemDetails.description.map((eachLine, index) => (
                <React.Fragment key={`${index + 100}`}>
                  {eachLine}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <div className="mt-12 flex flex-col gap-5">
              {problemDetails.testCases.length > 2
                ? problemDetails.testCases
                    .slice(0, 2)
                    .map((eachCase: any, index) => (
                      <div key={index}>
                        <h2 className="text-lg mb-2 text-green-500 border-b-2 border-slate-700">
                          Sample Test-Case {index + 1}
                        </h2>
                        <div>
                          <p className="text-slate-400">Input: </p>
                          <p className="bg-slate-800 py-1.5 px-2 text-slate-300">
                            {eachCase.input.map(
                              (eachInput: any, index: any) => (
                                <React.Fragment key={index + 10000}>
                                  {eachInput}
                                  <br />
                                </React.Fragment>
                              )
                            )}
                          </p>
                          <p className="text-slate-400 mt-2">Output: </p>
                          <p className="bg-slate-800 py-1.5 px-2 text-slate-300">
                            {eachCase.output.map(
                              (eachOutput: any, index: any) => (
                                <React.Fragment key={index + 1000}>
                                  {eachOutput}
                                  <br />
                                </React.Fragment>
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    ))
                : problemDetails.testCases.map((eachCase: any, index) => (
                    <div key={index}>
                      <h2 className="text-lg mb-2 text-green-500 border-b-2 border-slate-700">
                        Sample Test-Case {index + 1}
                      </h2>
                      <div className="">
                        <p className="text-slate-400">Input: </p>
                        <p className="bg-slate-800 py-1.5 px-2 text-slate-300">
                          {eachCase.input.map((eachInput: any, index: any) => (
                            <React.Fragment key={index + 10000}>
                              {eachInput}
                              <br />
                            </React.Fragment>
                          ))}
                        </p>
                        <p className="text-slate-400 mt-2">Output: </p>
                        <p className="bg-slate-800 py-1.5 px-2 text-slate-300">
                          {eachCase.output.map(
                            (eachOutput: any, index: any) => (
                              <React.Fragment key={index + 1000}>
                                {eachOutput}
                                <br />
                              </React.Fragment>
                            )
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="lg:col-start-3 lg:col-span-2 break-words">
            <div className="flex justify-end">
              <select
                name="lang"
                id="lang"
                className="bg-black rounded-md border-2 shadow-lg shadow-gray-800 border-violet-800 px-1.5 py-1 mb-4 cursor-pointer text-violet-400 outline-none"
                onChange={(e) => {
                  setLanguage(
                    supportedLanguages.find(
                      (lang) => lang.name === e.target.value
                    )!
                  );
                }}
              >
                {supportedLanguages.map((lang, idx) => (
                  <option key={`${idx}lang`} value={lang.name}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <Editor
              className="border-2 border-slate-700"
              theme="vs-dark"
              height="80vh"
              width="100%"
              language={language.name}
              value={code}
              onChange={(editorValue) => setCode(editorValue)}
              onMount={(editor: any, monaco: any) => {
                editorRef.current = editor;
                monaco.editor.defineTheme("myCustomTheme", {
                  base: "vs-dark",
                  inherit: true,
                  rules: [],
                  colors: {
                    "editor.background": "#2F2D2D",
                    "editorCursor.foreground": "#CD32FF",
                    "editor.lineHighlightBackground": "#404440",
                    "editorLineNumber.foreground": "#CD32FF",
                    "editor.selectionBackground": "#8E0DB8",
                    "editor.inactiveSelectionBackground": "#702587",
                    "editor.selectionHighlightBackground": "#655F5F",
                  },
                });
                editor.updateOptions({
                  wordWrap: "off",
                  theme: "myCustomTheme",
                  fontSize: 17.5,
                });
              }}
              options={{
                minimap: {
                  enabled: true,
                },
              }}
            />

            <div className="input-and-output w-full flex gap-2 my-5">
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="input">Input</label>
                <textarea
                  className="bg-slate-800 px-2 py-1.5 text-slate-300 w-full outline-none"
                  id="input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-1">
                <label htmlFor="output">Output</label>
                <div
                  className={`bg-slate-800 px-2 py-1.5 h-full ${
                    !output
                      ? ""
                      : output === "All test cases passed"
                      ? "text-green-400"
                      : output === "Running..."
                      ? "text-blue-400"
                      : "text-red-400"
                  }`}
                  id="output"
                >
                  {output?.split("\n").map((eachLine, index) => (
                    <React.Fragment key={index + 1000}>
                      {eachLine}
                      {index < output.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-5">
              <button
                onClick={handleRun}
                className="px-2 py-1.5 bg-violet-500 border-2 border-violet-500 hover:text-violet-400 hover:bg-transparent text-white rounded-md"
              >
                Run
              </button>
              <button
                onClick={handleSubmit}
                className="px-2 py-1.5 bg-green-600 border-2 border-green-600 hover:text-green-400 hover:bg-transparent text-white rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
export default SolveProblem;
