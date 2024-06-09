import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-50">
      <div className="w-12 h-12 border-4 border-primary border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
