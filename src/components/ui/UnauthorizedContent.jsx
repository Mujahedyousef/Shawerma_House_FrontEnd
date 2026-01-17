import React from 'react';
import { Lock } from 'lucide-react';

const UnauthorizedContent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Unauthorized Access</h1>
        <p className="text-gray-600 mb-4">You don't have permission to access this resource.</p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedContent;

