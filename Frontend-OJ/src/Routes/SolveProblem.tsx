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

  useEffect(() => {
    setCode(language.boilerPlate);
  }, [language]);

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
        <div className="grid mt-10 mb-5 grid-cols-4 w-full">
          <div className="col-start-1 col-span-2 break-words mr-10 h-[80vh] overflow-y-auto px-2">
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
          <div className="col-start-3 col-span-2 break-words">
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
                  wordWrap: "on",
                  theme: "myCustomTheme",
                });
              }}
              options={{
                minimap: {
                  enabled: true,
                },
              }}
            />
            <div className="flex justify-center mt-5">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  const { data } = await axios.post(
                    `${
                      import.meta.env.VITE_OJ_BACKEND_URI
                    }/post/run/${problemId}`,
                    {
                      code,
                      extension: language.extension,
                      language: language.name,
                    },
                    { withCredentials: true }
                  );

                  setOutput(data.output);
                }}
                className="px-2 py-1.5 bg-violet-500 border-2 border-violet-500 hover:text-violet-400 hover:bg-transparent text-white rounded-md"
              >
                Run (Testing Backend)
              </button>
            </div>
            {output && (
              <div className="bg-slate-800 px-2 py-1.5 text-slate-300">
                {output.split("\n").map((eachLine, index) => (
                  <React.Fragment key={index + 1000}>
                    {eachLine}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
export default SolveProblem;
