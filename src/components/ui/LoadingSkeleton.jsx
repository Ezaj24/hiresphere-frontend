import React from 'react';

const LoadingSkeleton = ({ className = "", width = "100%", height = "20px" }) => {
  return (
    <div 
      className={`skeleton rounded ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export const JobCardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
    <div className="flex items-center gap-4">
      <LoadingSkeleton width="48px" height="48px" className="rounded-lg" />
      <div className="flex-1 space-y-2">
        <LoadingSkeleton width="75%" height="16px" />
        <LoadingSkeleton width="50%" height="14px" />
      </div>
    </div>
    <div className="space-y-2">
      <LoadingSkeleton width="100%" height="12px" />
      <LoadingSkeleton width="85%" height="12px" />
      <LoadingSkeleton width="60%" height="12px" />
    </div>
    <div className="flex justify-between items-center">
      <LoadingSkeleton width="80px" height="24px" className="rounded-full" />
      <LoadingSkeleton width="60px" height="16px" />
    </div>
  </div>
);

export default LoadingSkeleton;
