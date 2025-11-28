import React from "react";
import { Link, useRouteError } from "react-router";
import Container from "../components/Container";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Container className="flex flex-col justify-center items-center min-h-screen text-center px-4">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <h1 className="text-9xl font-extrabold text-red-600">404</h1>
      <p className="text-3xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </p>
      <p className="text-lg text-gray-600 mt-2 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      {error && (
        <p className="text-gray-500 italic">
          {error.statusText || error.message}
        </p>
      )}
      <Link
        to="/"
        className="btn bg-green-700 hover:bg-green-800 text-white text-lg mt-8">
        Go Back Home
      </Link>
    </Container>
  );
};

export default ErrorPage;
