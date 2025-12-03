import React, { useState } from "react";
import MyLink from "../components/MyLink";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [show, setShow] = useState(false);
  const { updateUserProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const Regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!Regex.test(password)) {
      toast.error(
        "Password must contain at least 6 characters, including one uppercase and one lowercase letter."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res);

        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success("Registration Successful!");
            e.target.reset();
            navigate(from, { replace: true });
          })
          .catch((e) => {
            toast.error("Profile update failed: " + e.message);
          });
      })
      .catch((e) => {
        toast.error("Registration failed: " + e.message);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Register | GameHub</title>
      </Helmet>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join GameHub to start your collection
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label htmlFor="photoURL" className="sr-only">
                Photo URL
              </label>
              <input
                id="photoURL"
                name="photoURL"
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Photo URL (Optional)"
              />
            </div>
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
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition-all pr-10"
                placeholder="Password"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors shadow-md hover:shadow-lg">
              Register
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignin}
              className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span>Sign up with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <MyLink
              to="/signin"
              className="font-medium text-green-600 hover:text-green-500">
              Sign in
            </MyLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
