import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { auth } from "../firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";

const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
        window.open("https://gmail.com", "_blank");
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Container className="flex flex-col justify-center items-center min-h-screen px-4">
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <fieldset className="fieldset border-green-700 rounded-box border-2 text-lg p-6 w-full max-w-md bg-white shadow-md">
        <legend className="fieldset-legend text-green-700 text-xl font-bold">
          Reset Password
        </legend>
        <p className="mb-4 text-center text-gray-600">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleResetPassword} className="text-lg space-y-3">
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
          <button
            className="btn border-0 mt-4 bg-green-700 text-lg w-full hover:bg-green-800 transition-colors"
            type="submit">
            Send Reset Link
          </button>
        </form>
      </fieldset>
    </Container>
  );
};

export default ForgetPassword;
