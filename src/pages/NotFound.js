import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 
          className="text-9xl font-bold"
          style={{ color: 'var(--color-border)' }}
        >404</h1>
        <h2 
          className="text-2xl font-semibold mt-4"
          style={{ color: 'var(--color-text)' }}
        >Page Not Found</h2>
        <p 
          className="mt-2 mb-8"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-5 py-2.5 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)'
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </button>
          <Link
            to="/"
            className="flex items-center px-5 py-2.5 rounded-lg text-white transition-colors"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
