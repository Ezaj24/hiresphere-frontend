import React from 'react';

const GlassCard = ({ 
  children, 
  className = "", 
  hover = true,
  blur = "md",
  ...props 
}) => {
  const blurLevels = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl"
  };

  const hoverClasses = hover ? "card-hover hover:shadow-2xl" : "";

  return (
    <div 
      className={`
        bg-white/10 ${blurLevels[blur]} 
        border border-white/20 
        rounded-xl shadow-xl 
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
