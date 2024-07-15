import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import ProblemList from "./Routes/ProblemList";
import Profile from "./Routes/Profile";
import { ErrorContextProvider } from "./Context/ErrorContextProvider";

function App() {
  return (
    <ErrorContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/all/problems" element={<ProblemList />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </ErrorContextProvider>
  );
}

export default App;
