import React, { useContext } from "react";
import { CircleCheckBig, CircleX } from "lucide-react";
import { ErrorContext } from "../Context/ErrorContextProvider";
import { ConfirmationContext } from "../Context/ConfirmationContextProvider";
import linkedInProf from "../assets/linkedin-icon.svg";
import instagramProf from "../assets/instagram.svg";
import discordProf from "../assets/discord.svg";
import LargeScreenNavbar from "./LargeScreenNavbar";
import MobileScreenNavbar from "./MobileScreenNavbar";

interface mainContainerProps {
  children: React.ReactNode;
}

const MainContainer = ({ children }: mainContainerProps) => {
  const errorContext = useContext(ErrorContext);
  const { isError, whatIsTheError } = errorContext!;
  const confirmContext = useContext(ConfirmationContext);
  const { isConfirmed } = confirmContext!;

  return (
    <section className="bg-slate-900 min-h-screen min-w-screen relative">
      <div className="lg:px-28 md:px-10 flex flex-col gap-24 relative max-sm:px-5">
        <LargeScreenNavbar />
        <MobileScreenNavbar />
        <div className="content w-full h-full mb-10">{children}</div>
      </div>
      <div className="contact-us flex-center mt-20 absolute bottom-0 max-sm:left-1/2">
        <div className="flex-center flex-col gap-2 bg-slate-900/70 border-t-2 border-slate-500 rounded-t-full px-8 py-1.5">
          <h2 className="text-slate-300 text-sm">Contact-Us</h2>
          <div className="flex gap-5">
            <a
              href="https://www.linkedin.com/in/deepak-kumar-pal"
              className="w-fit hover:scale-125 transition-transform"
              target="_blank"
            >
              <img
                src={linkedInProf}
                alt="linkedIn-profile"
                height={25}
                width={25}
              />
            </a>
            <a
              href="https://www.discordapp.com/users/755291435783159929"
              className="w-fit hover:scale-125 transition-transform"
              target="_blank"
            >
              <img
                src={discordProf}
                alt="discord-profile"
                height={25}
                width={25}
              />
            </a>
            <a
              href="https://www.instagram.com/dpkcrime?igsh=MTZxd3AzYTZqOHdtbg=="
              className="w-fit hover:scale-125 transition-transform"
              target="_blank"
            >
              <img
                src={instagramProf}
                alt="instagram-profile"
                height={25}
                width={25}
              />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`bg-red-500 rounded-md text-white border-2 border-red-500 w-fit px-2 py-1.5 flex-center gap-1 mt-10 fixed top-[40%] right-0 ${
          isError ? "translate-x-[1%]" : "translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out z-50`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <CircleX />
        <div>{whatIsTheError}</div>
      </div>
      <div
        className={`bg-green-600 rounded-md text-white border-2 border-green-600 w-fit px-2 py-1.5 flex-center gap-1 mt-10 absolute top-[40%] left-0 ${
          isConfirmed ? "-translate-x-[1%]" : "-translate-x-[105%]"
        } transition-transform duration-1000 ease-in-out z-50`}
        style={{ boxShadow: "0px 0px 10px 2px black" }}
      >
        <div>Successful!</div>
        <CircleCheckBig />
      </div>
    </section>
  );
};
export default MainContainer;
