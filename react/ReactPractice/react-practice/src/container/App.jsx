import  "../styles/App.css"
import { Route, Routes, BrowserRouter } from "react-router-dom";
import LandingPage from '../componentes/landing/LandingPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
  
export default App;
