import MainContainer from "../Containers/MainContainer";
import homeImage from "../assets/landing_code.svg";

const Home = () => {
  return (
    <MainContainer>
      <div className="text-white sm:grid grid-cols-2 gap-20 sm:mt-10 mt-2">
        <img
          src={homeImage}
          alt="home"
          className="col-start-1"
          width={550}
          height={550}
        />
        <div className="col-start-2 flex flex-col gap-20">
          <div>
            <h1 className="text-4xl">
              Welcome to &lt;
              <span className="bg-gradient-to-br from-red-400 to-blue-400 via-green-400 bg-clip-text text-transparent w-fit">
                ThinkXCode
              </span>
              &gt;
            </h1>
            <p className="text-lg mt-4 text-slate-400">
              Challenge yourself with a wide range of coding problems, and
              enhance your algorithmic thinking!💪
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl border-b-2 border-b-slate-700 w-fit">
              <span className="text-red-400">Why</span> choose us?
            </h2>
            <ul className="list-disc px-8 break-words text-slate-300">
              <li>
                Diverse Problem Set. Anyone can contribute a problem to our
                database.
              </li>
              <li className="text-violet-300 my-2">
                Laggy PC? Do not worry as we have a standalone compiler.
              </li>
              <li>
                Powered with the same{" "}
                <span className="border-b-2 border-slate-300 text-orange-300">
                  Monaco-Editor that powers VS-Code
                </span>
                , stay in familiar environment.
              </li>
            </ul>
          </div>
          <h2 className="w-fit text-lg bg-gradient-to-tr from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
            Happy coding!
          </h2>
        </div>
      </div>
    </MainContainer>
  );
};
export default Home;
