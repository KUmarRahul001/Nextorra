import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <div className="h-screen flex flex-col justify-center items-center text-center bg-gray-50">
    <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
    <p className="text-gray-600 mb-8">Oops! The page you’re looking for doesn’t exist.</p>
    <Link
      to="/"
      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-all duration-300"
    >
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
