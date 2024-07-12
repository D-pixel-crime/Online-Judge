import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userDetails, handleUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="h-screen w-screen bg-slate-900 text-white">
      <div className="h-full w-full flex items-center flex-col gap-10">
        <h1 className="text-7xl mt-12 bg-gradient-to-bl from-purple-400 via-orange-500 via-20% font-bold py-4 to-purple-400 bg-clip-text text-transparent">
          Login
        </h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col border-2 border-slate-700 w-4/12 p-8 rounded-xl gap-4 bg-slate-800 shadow-xl shadow-black"
        >
          <div className="flex flex-col gap-3 text-lg">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter Your Username"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400"
                value={userDetails.username}
                onChange={(e) => {
                  handleUserDetails({
                    ...userDetails,
                    username: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400"
                value={userDetails.password}
                onChange={(e) => {
                  handleUserDetails({
                    ...userDetails,
                    password: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 border-2 my-4 w-full border-green-500 text-white text-lg rounded-md px-2 py-1.5 hover:bg-transparent hover:text-green-500"
          >
            Login
          </button>
          <div className="flex-center flex-col border-t-2 pt-6 gap-2">
            <p>No account? Signup instead!</p>
            <Link
              to={"/signup"}
              className="bg-blue-500 flex-center text-white w-full border-2 text-lg rounded-md px-2 py-1.5 hover:bg-transparent border-blue-500 hover:text-blue-500"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
