import LoginPage from './components/LoginPage/LoginPage';
import './app.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegPage from './components/RegPage/RegPage';
import MainPage from './components/MainPage/MainPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import SettingsPage from "./components/SettingsPage/SettingsPage";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reg" element={<RegPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </Router>
    );
  }

  return (
      <>
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/reg" element={<RegPage/>} />
                <Route path="*" element={<MainPage/>} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Routes>
        </Router>
      </>
  );
}

export default App;
