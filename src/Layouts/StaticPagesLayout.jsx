import Header from "../Components/Static/Header";
import Footer from "../Components/Static/Footer";
import { Outlet } from "react-router-dom";
import Courses from "../Pages/Static/Courses";
import Services from "../Pages/Static/Services";
import Contact from "../Pages/Static/Contact";
// import About from "../Pages/Static/About";
// import Services from "../Pages/Static/Services";
// import Courses from "../Pages/Static/Courses";
// import Contact from "../Pages/Static/Contact";

const StaticPagesLayout = () => (
  <>
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </>
);

export default StaticPagesLayout;
