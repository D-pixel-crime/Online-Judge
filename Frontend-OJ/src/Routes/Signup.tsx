import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [userDetails, handleUserDetails] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });

  const [isError, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !(
        userDetails.fullName &&
        userDetails.email &&
        userDetails.username &&
        userDetails.password
      )
    ) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_OJ_BACKEND_URI}/post/register`,
      userDetails
    );

    console.log(data);
  };

  return (
    <section className="h-full w-full bg-slate-900 text-white">
      <div className="h-full w-full flex items-center flex-col gap-8">
        <h1 className="text-7xl mt-8 bg-gradient-to-bl from-purple-400 via-orange-500 via-20% font-bold pb-1 to-purple-400 bg-clip-text text-transparent">
          Signup
        </h1>
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex mb-10 flex-col border-2 border-slate-700 w-4/12 p-8 rounded-xl gap-4 bg-slate-800 shadow-xl shadow-black"
        >
          <div className="flex flex-col gap-4 text-base">
            <div className="flex flex-col">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter Your Full Name"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400"
                value={userDetails.fullName}
                onChange={(e) => {
                  handleUserDetails({
                    ...userDetails,
                    fullName: e.target.value,
                  });
                }}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email-ID</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Your email-id"
                className="border-2 border-slate-700 rounded-md px-2 py-1.5 bg-transparent text-slate-400"
                value={userDetails.email}
                onChange={(e) => {
                  handleUserDetails({
                    ...userDetails,
                    email: e.target.value,
                  });
                }}
              />
            </div>
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
            Signup
          </button>
          <div className="flex-center flex-col border-t-2 pt-6 gap-2">
            <p>Already have an account? Login instead!</p>
            <Link
              to={"/login"}
              className="bg-blue-500 flex-center text-white w-full border-2 text-lg rounded-md px-2 py-1.5 hover:bg-transparent border-blue-500 hover:text-blue-500"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
      <div
        className={`flex-center mt-10 absolute bottom-[20px] right-0 ${
          isError ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out`}
      >
        <div
          className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5`}
        >
          Please Fill All Details!
        </div>
      </div>
    </section>
  );
};

export default Signup;
