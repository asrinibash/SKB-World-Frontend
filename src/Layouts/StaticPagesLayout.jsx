import Header from "../Components/Static/Header";
import Footer from "../Components/Static/Footer";
import { Outlet } from "react-router-dom";

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
