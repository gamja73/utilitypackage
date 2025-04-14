import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 ${className}`}
        >
            {children}
        </button>
    );
};