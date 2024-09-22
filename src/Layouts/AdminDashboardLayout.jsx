import Sidebar from "../Components/Admin/Sidebar";
import Header from "../Components/Admin/Header";
import { Outlet } from "react-router-dom";
// import Profile from "../Pages/Admin/profile/Profile";

const AdminDashboardLayout = () => (
  <div className="flex h-screen overflow-hidden bg-background">
    <Sidebar />
    <div className="flex flex-col flex-1 overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto">
          <Outlet />
          {/* <Profile /> */}
        </div>
      </main>
    </div>
  </div>
);

export default AdminDashboardLayout;
