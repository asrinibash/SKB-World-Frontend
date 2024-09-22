import { useState } from "react";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { adminAuthState } from "../../Recoil/Admin/AdminAuthState";
import { useNavigate } from "react-router-dom";
import { server } from "../../main";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useSetRecoilState(adminAuthState);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/admin/login`, {
        email,
        password,
      });

      // Store the token and user info in local storage and state
      localStorage.setItem("authToken", response.data.token);
      setAuth({
        isAuthenticated: true,
        token: response.data.token,
        user: response.data.user,
      });

      toast.success("Login Successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
      });

      // Wait for 2 seconds before redirecting
      setTimeout(() => {
        navigate("/admin/secure/dashboard");
      }, 2000);
    } catch (error) {
      toast.error("Login failed. Please check your email and password", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 md:p-12 lg:p-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md w-full space-y-8 bg-gray-100 shadow-lg rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 dark:text-green-900">
            Admin Login
          </h2>
          <p className="text-lg text-muted-foreground">
            Secure access to your admin dashboard
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent/80"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
