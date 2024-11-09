import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useUserAuthentication } from "../../Recoil/User/useUserAuthentication";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUserAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      console.log(response); // Log the response (user data)
      if (response) {
        toast.success("Login Successful!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: true,
          className: "rounded-lg shadow-lg bg-green-500 text-white",
          bodyClassName: "h-12 text-center flex justify-center items-center",
          style: { width: "250px" },
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.error("Login failed. Please check your email and password", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        className: "rounded-lg shadow-lg bg-red-500 text-white",
        bodyClassName: "h-12 text-center flex justify-center items-center",
        style: { width: "250px" },
      });
      console.log("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6 md:p-12 lg:p-16">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md w-full space-y-8 bg-gray-100 shadow-lg rounded-lg p-8">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-accent">User</span> Login
          </h2>
          <p className="text-lg text-muted-foreground">
            Secure access to your User dashboard
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
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
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accent hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            >
              Login
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          No account?{" "}
          <button
            className="text-accent hover:underline focus:outline-none"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
