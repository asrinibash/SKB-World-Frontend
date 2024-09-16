import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, ThemeContext } from "./Context/ThemeContext";
import Header from "./Components/Static/Header";
import Footer from "./Components/Static/Footer";
import About from "./Pages/Static/About";
import Home from "./Pages/Static/Home";
import Courses from "./Pages/Static/Courses";
import Skills from "./Pages/Static/Skills";
import Contact from "./Pages/Static/Contact";
import Signup from "./Pages/Static/Signup";
import Login from "./Pages/Static/Login";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import UserProtectedRoute from "./utils/UserProtectedRoute";
import UserDashboard from "./Pages/User/UserDashboard";

function App() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`flex min-h-[100dvh] flex-col ${darkMode ? "dark" : ""}`}>
        <div className="bg-background text-foreground">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />



          // * Admin Routes
          <Routes>
            <Route element={AdminProtectedRoute}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>



          // * User Routes
          <Routes element={UserProtectedRoute}>
            <Route path="/user/dashboard" element={UserDashboard}/>
          </Routes>

        </div>
      </div>
    </Router>
  );
}

export default App;
