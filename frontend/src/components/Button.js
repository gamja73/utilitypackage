import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ children, className = '', ...props }) => {
    return (_jsx("button", { ...props, className: `px-4 py-2 rounded-md bg-teal-600 text-white hover:bg-teal-700 transition-colors duration-200 disabled:opacity-50 ${className}`, children: children }));
};
