import MainContainer from "../Containers/MainContainer";
import Cookies from "js-cookie";

const Profile = () => {
  const handleLogOut = () => {
    Cookies.remove("username");
    Cookies.remove("userId");
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <MainContainer>
      <div className="text-white">
        <div>Lets Leave It At This For Now! To be continued soon ..</div>
        <button
          onClick={handleLogOut}
          className="px-2 py-1.5 bg-red-500 border-2 border-red-500 hover:text-red-500 hover:bg-transparent rounded-md"
        >
          Logout
        </button>
      </div>
    </MainContainer>
  );
};
export default Profile;
