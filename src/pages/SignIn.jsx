import React, { useState } from "react";
import Container from "../components/Container";
import MyLink from "../components/MyLink";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate, Link } from "react-router";
import { useAuth } from "../context/AuthContext";

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
    <Container className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <h1 className="font-extrabold text-3xl sm:text-4xl text-green-700 mb-2 text-center">
        Welcome Back...
      </h1>
      <p className="mb-4 text-center text-base sm:text-lg">
        Sign in & find out your saved credentials.
      </p>

      <fieldset className="fieldset border-green-700 rounded-box border-2 text-lg p-4 w-full max-w-md bg-white shadow-md">
        <legend className="fieldset-legend text-green-700 text-xl font-bold">
          Sign-In
        </legend>

        <form onSubmit={handleSignIn} className="text-lg space-y-3">
          <div>
            <label className="label text-green-800 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Email"
              required
            />
          </div>

          <div className="relative">
            <label className="label text-green-800 font-semibold">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              className="input w-full bg-green-100 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-green-700 text-xl z-50">
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="text-sm text-right">
            <Link
              to="/forget-password"
              state={{ email: email }}
              className="text-green-700 hover:underline cursor-pointer">
              Forgot Password?
            </Link>
          </div>

          <button
            className="btn border-0 mt-4 bg-green-700 text-lg w-full hover:bg-green-800 transition-colors"
            type="submit">
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 my-4">
          <div className="h-px w-20 bg-black/30"></div>
          <span className="text-lg text-black/70">or</span>
          <div className="h-px w-20 bg-black/30"></div>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignin}
          className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-800 text-white px-5 py-2 rounded-md w-full font-semibold transition-colors cursor-pointer">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        <p className="text-base text-center mt-3">
          Haven't you registered?{" "}
          <MyLink className="underline text-green-700" to="/register">
            Register Now
          </MyLink>
        </p>
      </fieldset>
    </Container>
  );
};

export default SignIn;
