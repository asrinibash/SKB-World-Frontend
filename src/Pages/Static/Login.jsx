import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../../Components/Ui/Button";
import { Input } from "../../Components/Ui/Input";
import { Label } from "../../Components/Ui/Label";

function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Log In
      </Button>
    </form>
  );
}

function SocialLinks() {
  return (
    <div className="flex space-x-4">
      <Button variant="outline" className="w-full">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"></path>
        </svg>
        Twitter
      </Button>
      <Button variant="outline" className="w-full">
        <svg
          className="w-5 h-5 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
            clipRule="evenodd"
          ></path>
        </svg>
        Facebook
      </Button>
    </div>
  );
}

export default function Login() {
  return (
    <motion.section
      className="container mx-auto py-12 px-4 md:py-16 md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Login
          </h2>
          <p className="text-muted-foreground">
            Welcome back! Please log in to your account.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <LoginForm />
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="space-y-4 p-6">
              <h3 className="text-lg font-semibold">Login with Social Media</h3>
              <SocialLinks />
              <div className="space-y-2">
                <p className="text-muted-foreground">Don't have an account?</p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
