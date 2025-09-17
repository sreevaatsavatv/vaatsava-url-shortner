import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/LoginPage/LoginPage";
import "./index.css";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { HeaderMegaMenu } from "./Components/Navbar/HeaderMegaMenu";
import ProfilePage from "./Pages/ProfilePage";
import UrlShortner from "./Pages/UrlShortner";
import UrlHistory from "./Pages/UrlHistory";

function App() {
  return (
    <Router>
      <HeaderMegaMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/url/shortner" element={<UrlShortner />} />
        <Route path="/url/history" element={<UrlHistory />} />
        <Route element={<PrivateRoute />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
