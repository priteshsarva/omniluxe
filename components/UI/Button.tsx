import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-main text-white hover:bg-accent",
    secondary: "bg-accent text-white hover:bg-accent-hover",
    outline: "border border-main text-main hover:bg-main hover:text-white",
    ghost: "text-main hover:text-accent hover:bg-secondary"
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4"
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;