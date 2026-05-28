import React from 'react';

interface CustomeTextProps {
  title: string;
  className?: string;
}

const CustomeText: React.FC<CustomeTextProps> = ({ title, className  }) => {
  const isHighlighted = className?.includes("text-[#FD853A]");

  return (
    <div
      className={`leading-tight ${isHighlighted ? "creative-highlight" : ""} ${className || ""}`}
    >
      {title}
    </div>
  );
};

export default CustomeText;
