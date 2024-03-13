import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-red-500 mb-8">Page Not Found</h2>
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        <Link to="/" className="text-lg font-semibold">
          Go back to home
        </Link>
      </button>
    </div>
  );
}

export default Error;
