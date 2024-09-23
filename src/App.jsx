import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext";

import Home from "./Pages/Static/Home";
import About from "./Pages/Static/About";
import Courses from "./Pages/Static/Courses";
import Contact from "./Pages/Static/Contact";
import Services from "./Pages/Static/Services";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserLogin from "./Pages/User/UserLogin";
import UserDashboard from "./Pages/User/UserDashboard";
import { useAuthentication } from "./Recoil/Admin/useAdminAuth";
import { useUserAuth } from "./Recoil/User";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoute from "./utils/UserProtectedRoute";
import StaticPagesLayout from "./Layouts/StaticPagesLayout";
import AdminDashboardLayout from "./Layouts/AdminDashboardLayout";
import ADUsers from "./Pages/Admin/ADUsers";
import ManageCategories from "./Pages/Admin/ManageCategories";
import ManageCourses from "./Pages/Admin/ManageCourse";
import ManageGroups from "./Pages/Admin/ManageGroup";

function App() {
  const { darkMode } = useContext(ThemeContext);

  const { validateTokenOfAdmin } = useAuthentication();
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
            <Route element={<StaticPagesLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="courses" element={<Courses />} />
              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/secure">
              <Route path="login" element={<AdminLogin />} />
              <Route element={<AdminProtectedRoute />}>
                <Route element={<AdminDashboardLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<ADUsers />} />
                  <Route path="Categories" element={<ManageCategories />} />
                  <Route path="Courses" element={<ManageCourses />} />
                  <Route path="Group" element={<ManageGroups />} />
                </Route>
              </Route>
            </Route>

            {/* User Routes */}
            <Route path="/user">
              <Route path="login" element={<UserLogin />} />
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
