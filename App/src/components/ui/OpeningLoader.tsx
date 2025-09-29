import React from 'react';

export const OpeningLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background hero-bg">
      <div className="flex flex-col items-center">
        <img src="/logo.svg" alt="C.H.I.P. Logo" className="w-24 h-24 logo-pulse-animation" />
        <div className="typing-loader mt-8">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  );
};
