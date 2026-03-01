import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-gray-500 mb-6">Page not found</p>
        <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded text-sm">
          Back to Login
        </Link>
      </div>
    </div>
  );
}