import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext";
import Header from "./Components/Static/Header";
import Footer from "./Components/Static/Footer";
import Home from "./Pages/Static/Home";
import About from "./Pages/Static/About";
import Courses from "./Pages/Static/Courses";
import Contact from "./Pages/Static/Contact";
import Services from "./Pages/Static/Services";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserLogin from "./Pages/User/UserLogin";
import UserDashboard from "./Pages/User/UserDashboard";
import { useAdminAuth } from "./Recoil/Admin";
import { useUserAuth } from "./Recoil/User";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoute from "./utils/UserProtectedRoute";
import { Outlet } from "react-router-dom";

const StaticLayout = () => (
  <>
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </>
);

const AdminDashboardLayout=()=>{
  <>
  </>
}

function App() {
  const { darkMode } = useContext(ThemeContext);

  const { validateTokenOfAdmin } = useAdminAuth();
  useEffect(() => {
    validateTokenOfAdmin();
  }, [validateTokenOfAdmin]);

  const { validateTokenOfUser } = useUserAuth();
  useEffect(() => {
    validateTokenOfUser();
  }, [validateTokenOfUser]);

  return (
    <Router>
      <div className={`flex min-h-[100dvh] flex-col ${darkMode ? "dark" : ""}`}>
        <div className="bg-background text-foreground">
          <Routes>
            {/* Static pages */}
            <Route element={<StaticLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<Courses />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path='/admin'>
              <Route path="secure/login" element={<AdminLogin />} />
              <Route element={<AdminProtectedRoute />}>
                <Route path="dashboard" element={<AdminDashboard />} />
              </Route>
            </Route>

            {/* User Routes */}
            <Route path="/user">
            <Route path="login" element={<UserLogin/>}/>
            <Route element={<UserProtectedRoute />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
            </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;