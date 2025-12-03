import React, { useState } from "react";
import MyLink from "../components/MyLink";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);
        toast.success("SignIn Successful!");
        navigate(from, { replace: true });
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  const handleGoogleSignin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Signed in with Google!");
        navigate(from, { replace: true });
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Sign In | GameHub</title>
      </Helmet>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-200/40 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50 relative z-10">
        <div className="text-center">
          <h2 className="mt-2 text-4xl font-black text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the realm. Your library awaits.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
          <div className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 group-focus-within:text-green-600 transition-colors" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all sm:text-sm shadow-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 group-focus-within:text-green-600 transition-colors" />
              </div>
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full pl-10 pr-10 py-4 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all sm:text-sm shadow-sm"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition-colors">
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/forget-password"
                state={{ email: email }}
                className="font-medium text-green-600 hover:text-green-500 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all shadow-lg hover:shadow-green-500/30 transform hover:-translate-y-0.5">
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignin}
              className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all transform hover:-translate-y-0.5">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <MyLink
              to="/register"
              className="font-bold text-green-600 hover:text-green-500 transition-colors">
              Register now
            </MyLink>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;
