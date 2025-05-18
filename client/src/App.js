import LoginPage from './components/LoginPage/LoginPage';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegPage from './components/RegPage/RegPage';

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reg" element={<RegPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
