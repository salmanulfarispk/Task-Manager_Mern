import clsx from 'clsx';
import React from 'react';

const Button = ({ icon, className, type, label, onClick = () => {}, disabled = false }) => {
  
  return (
    <button
      type={type || 'button'}
      className={clsx(
        "px-3 py-2 outline-none",
        className,
        disabled && "cursor-not-allowed opacity-50"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
