<<<<<<< HEAD
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext";

import Home from "./Pages/Static/Home";
import About from "./Pages/Static/About";
// import Courses from "./Pages/Static/Courses";
import Contact from "./Pages/Static/Contact";
import Services from "./Pages/Static/Services";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserLogin from "./Pages/User/UserLogin";
import { useAdminAuthentication } from "./Recoil/Admin/useAdminAuthentication";
import { useUserAuthentication } from "./Recoil/User/useUserAuthentication";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoute from "./utils/UserProtectedRoute";
import StaticPagesLayout from "./Layouts/StaticPagesLayout";
import AdminDashboardLayout from "./Layouts/AdminDashboardLayout";
import ADUsers from "./Pages/Admin/ADUsers";
import ManageCategories from "./Pages/Admin/ManageCategories";
import ManageCourses from "./Pages/Admin/ManageCourse";
import ManageGroups from "./Pages/Admin/ManageGroup";
import Profile from "./Pages/Admin/profile/Profile";
import CookiePolicy from "./Pages/Static/CookiePolicy";
import TermsOfService from "./Pages/Static/terms-of-services";
import PrivacyPolicy from "./Pages/Static/privacy-policy";
import Help from "./Pages/Static/Help";
import ManageOrder from "./Pages/Admin/ManageOrder";
import UserProfile from "./Pages/User/UserProfile";
import PaymentPage from "./Pages/Static/PaymentPage"; // Add this import
import Subscriptions from "./Components/Static/Subscription";
import CoursesList from "./Pages/Static/CoursesList";
import CategoryList from "./Pages/Static/CategoryList";
import BuyCourse from "./Pages/Static/BuyCourse";

function App() {
  const { darkMode } = useContext(ThemeContext);

  const { validateTokenOfAdmin } = useAdminAuthentication();
  useEffect(() => {
    validateTokenOfAdmin();
  }, [validateTokenOfAdmin]);

  const { validateTokenOfUser } = useUserAuthentication();
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
              {/* <Route path="courses" element={<Courses />} /> */}
              <Route path="categoryList" element={<CategoryList />} />
              <Route path="coursesList" element={<CoursesList />} />
              <Route path="/buyCourse/:id" element={<BuyCourse />} />
              <Route path="/buyCourse" element={<BuyCourse />} />

              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="help" element={<Help />} />
              <Route path="subscriptions" element={<Subscriptions />} />
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
                  <Route path="profile" element={<Profile />} />
                  <Route path="Order" element={<ManageOrder />} />
                </Route>
              </Route>
            </Route>

            {/* User Routes */}
            <Route path="/user">
              <Route path="login" element={<UserLogin />} />
              <Route element={<UserProtectedRoute />}>
                <Route path="profile" element={<UserProfile />} />
                <Route
                  path="payment/:courseId"
                  element={<PaymentPage />}
                />{" "}
                {/* Add this new route */}
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
=======
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext";

import Home from "./Pages/Static/Home";
import About from "./Pages/Static/About";
// import Courses from "./Pages/Static/Courses";
import Contact from "./Pages/Static/Contact";
import Services from "./Pages/Static/Services";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserLogin from "./Pages/User/UserLogin";
import { useAdminAuthentication } from "./Recoil/Admin/useAdminAuthentication";
import { useUserAuthentication } from "./Recoil/User/useUserAuthentication";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import UserProtectedRoute from "./utils/UserProtectedRoute";
import StaticPagesLayout from "./Layouts/StaticPagesLayout";
import AdminDashboardLayout from "./Layouts/AdminDashboardLayout";
import ADUsers from "./Pages/Admin/ADUsers";
import ManageCategories from "./Pages/Admin/ManageCategories";
import ManageCourses from "./Pages/Admin/ManageCourse";
import ManageGroups from "./Pages/Admin/ManageGroup";
import Profile from "./Pages/Admin/profile/Profile";
import CookiePolicy from "./Pages/Static/CookiePolicy";
import TermsOfService from "./Pages/Static/terms-of-services";
import PrivacyPolicy from "./Pages/Static/privacy-policy";
import Help from "./Pages/Static/Help";
import ManageOrder from "./Pages/Admin/ManageOrder";
import UserProfile from "./Pages/User/UserProfile";
import PaymentPage from "./Pages/Static/PaymentPage"; // Add this import
import Subscriptions from "./Components/Static/Subscription";
import CoursesList from "./Pages/Static/CoursesList";
import CategoryList from "./Pages/Static/CategoryList";
import BuyCourse from "./Pages/Static/BuyCourse";
import Report from "./Pages/Static/Report";
import ManageReports from "./Pages/Admin/ManageReport";
import ContactPage from "./Pages/Static/ContactUs";
import ManageContact from "./Pages/Admin/ManageContact";

function App() {
  const { darkMode } = useContext(ThemeContext);

  const { validateTokenOfAdmin } = useAdminAuthentication();
  useEffect(() => {
    validateTokenOfAdmin();
  }, [validateTokenOfAdmin]);

  const { validateTokenOfUser } = useUserAuthentication();
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
              <Route path="report" element={<Report />} />
              {/* <Route path="courses" element={<Courses />} /> */}
              <Route path="Courses" element={<CategoryList />} />
              <Route path="coursesList" element={<CoursesList />} />
              <Route path="/buyCourse/:id" element={<BuyCourse />} />
              <Route path="/buyCourse" element={<BuyCourse />} />

              <Route path="services" element={<Services />} />
              <Route path="contact" element={<Contact />} />
              <Route path="contactUs" element={<ContactPage />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="terms-of-service" element={<TermsOfService />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="help" element={<Help />} />
              <Route path="subscriptions" element={<Subscriptions />} />
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
                  <Route path="profile" element={<Profile />} />
                  <Route path="Order" element={<ManageOrder />} />
                  <Route path="Report" element={<ManageReports />} />
                  <Route path="Contact" element={<ManageContact />} />
                </Route>
              </Route>
            </Route>

            {/* User Routes */}
            <Route path="/user">
              <Route path="login" element={<UserLogin />} />
              <Route element={<UserProtectedRoute />}>
                <Route path="profile" element={<UserProfile />} />
                <Route
                  path="payment/:courseId"
                  element={<PaymentPage />}
                />{" "}
                {/* Add this new route */}
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
>>>>>>> 7b8bfbca5b3c3ec462537d4bea3c9706244eafcd
