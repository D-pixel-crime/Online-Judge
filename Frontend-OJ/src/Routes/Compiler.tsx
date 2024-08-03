import { Editor } from "@monaco-editor/react";
import { supportedLanguages } from "../constants/boiler_plate";
import MainContainer from "../Containers/MainContainer";
import React from "react";
import axios from "axios";
import { ErrorContext } from "../Context/ErrorContextProvider";

const Compiler = () => {
  const [language, setLanguage] = React.useState(supportedLanguages[0]);
  const [output, setOutput] = React.useState<string | undefined>();
  const [input, setInput] = React.useState<string | undefined>(``);
  const editorRef = React.useRef(null);
  const [code, setCode] = React.useState<string | undefined>();
  const errorContext = React.useContext(ErrorContext);
  const { setIsError, setWhatIsTheError } = errorContext!;

  React.useEffect(() => {
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
        error.response?.data?.error.substr(80) ||
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

  return (
    <MainContainer>
      <div className="flex flex-col gap-10">
        <div className="border-b-2 pb-2 border-b-slate-700 flex-center">
          <p className="w-fit text-lg bg-gradient-to-tr from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Choose your language &lt; &gt; Run your code &lt; &gt; Free of cost
            !
          </p>
        </div>
        <div className="break-words lg:grid grid-cols-3 gap-10 mb-10">
          <div className="col-start-1 col-span-2">
            <div className="flex justify-between">
              <select
                name="lang"
                id="lang"
                className="bg-black rounded-md border-2 shadow-lg shadow-gray-800 border-violet-800 px-1.5 py-1 mb-4 cursor-pointer text-violet-400 outline-none h-fit"
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
              <div className="flex mb-5">
                <button
                  onClick={handleRun}
                  className="px-3 py-1.5 h-fit bg-violet-500 border-2 border-violet-500 hover:text-violet-400 hover:bg-transparent text-white rounded-md"
                >
                  Run
                </button>
              </div>
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
                  theme: "myCustomTheme",
                  fontSize: 17.5,
                });
              }}
              options={{
                minimap: {
                  enabled: false,
                },
              }}
            />
          </div>

          <div className="w-full lg:h-[90%] flex flex-col lg:mt-14 sm:mt-5 col-start-3 col-span-1">
            <div className="w-full h-full flex flex-col gap-1">
              <label htmlFor="input" className="text-slate-300">
                Input
              </label>
              <textarea
                className="bg-slate-800 px-2 py-1.5 text-slate-300 w-full outline-none"
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className="w-full h-full flex flex-col gap-1">
              <label htmlFor="output" className="text-slate-300">
                Output
              </label>
              <div
                className={`bg-slate-800 px-2 py-1.5 h-full ${
                  !output
                    ? ""
                    : output === "Running..."
                    ? "text-blue-400"
                    : "text-green-400"
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
        </div>
      </div>
    </MainContainer>
  );
};
export default Compiler;
