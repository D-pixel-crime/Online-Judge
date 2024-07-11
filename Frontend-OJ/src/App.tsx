import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginOrSignup from "./Routes/LoginOrSignup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginOrSignup reqType="login" />} />
          <Route path="/signup" element={<LoginOrSignup reqType="signup" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
