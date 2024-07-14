import MainContainer from "../Containers/MainContainer";
import homeImage from "../assets/landing_code.svg";

const Home = () => {
  return (
    <MainContainer>
      <div className="text-white grid grid-cols-2 gap-28">
        <img src={homeImage} alt="home" className="block col-start-1" />
        <p className="col-start-2 text-lg mt-10">
          Welcome to Online Judge. This landing page is subject to future
          changes.
        </p>
      </div>
    </MainContainer>
  );
};
export default Home;
