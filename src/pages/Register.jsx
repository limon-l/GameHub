import React, { useState } from "react";
import Container from "../components/Container";
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
    <Container className="flex flex-col justify-center items-center min-h-screen py-10 px-4 md:px-8 lg:px-16">
      <Helmet>
        <title>GameHub | Register</title>
      </Helmet>
      <h1 className="font-extrabold text-3xl text-green-700 mb-2 text-center">
        Register Here...
      </h1>
      <p className="mb-4 text-center text-gray-600">
        Register & save your credentials securely.
      </p>

      <fieldset className="border-green-700 rounded-2xl border-2 p-6 md:p-8 w-full max-w-md bg-green-50 shadow-md">
        <legend className="text-xl font-bold text-green-700 px-3">
          Register
        </legend>

        <form onSubmit={handleRegister} className="text-lg space-y-4">
          <div>
            <label className="label text-green-800 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              className="input w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="label text-green-800 font-semibold">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              className="input w-full bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Your Photo's Link"
            />
          </div>
          <div>
            <label className="label text-green-800 font-semibold">Email</label>
            <input
              type="email"
              name="email"
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
          <button className="btn border-0 mt-4 bg-green-700 hover:bg-green-800 text-lg w-full text-white transition-all">
            Register
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

        <p className="text-base text-center mt-3 text-gray-700">
          Already registered?{" "}
          <MyLink className={"underline text-green-700"} to={"/signin"}>
            Sign In Here
          </MyLink>
        </p>
      </fieldset>
    </Container>
  );
};

export default Register;
