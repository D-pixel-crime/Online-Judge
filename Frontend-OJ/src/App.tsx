import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Signup from "./Routes/Signup";
import ProblemList from "./Routes/ProblemList";
import Profile from "./Routes/Profile";
import { ErrorContextProvider } from "./Context/ErrorContextProvider";
import AddProblem from "./Routes/AddProblem";
import { ConfirmationContextProvider } from "./Context/ConfirmationContextProvider";

function App() {
  return (
    <ConfirmationContextProvider>
      <ErrorContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/all/problems" element={<ProblemList />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/add-problem" element={<AddProblem />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </ErrorContextProvider>
    </ConfirmationContextProvider>
  );
}

export default App;
