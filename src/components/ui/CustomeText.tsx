import React from 'react';

interface CustomeTextProps {
  title: string;
  className?: string;
}

const CustomeText: React.FC<CustomeTextProps> = ({ title, className  }) => {
  return (
    <div
      className={`leading-tight ${className}`}
    >
      {title}
    </div>
  );
};

export default CustomeText;
