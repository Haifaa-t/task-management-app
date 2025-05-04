import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`bg-yellow-400 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-300 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
