import "../styles/App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from "../componentes/landing/LandingPage";
import LogIn from "../componentes/LogIn/LogIn";
import SignIn from "../componentes/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/LogIn" element={<LogIn />} />
          <Route exact path="/SignIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
